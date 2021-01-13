import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { 
    changeSelectedFilePathName, 
    fillBuffer, 
    setBufferIndexOfActualSentCommand, 
    updateReceivedData,
    windowSlectors } from "../redux/WindowSlice";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Tooltip, CircularProgress, } from '@material-ui/core';

import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { CustomButtonOutlined, CustomButtonFill } from "./CustomCoreComponent";
import { CustomLinearProgress as LinearProgress } from "./CustomCoreComponent";


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    space: {
        marginLeft: "10px"
    },
    section: {
        marginTop: "25px",
        marginBottom: "0px",    
    },
    subSection: {
        marginTop: "0px",
        marginBottom: "25px",
    },
    buttonUpload: {
        backgroundColor: "white", 
        color: "#289C6F",
        borderColor: "#289C6F"
    },
    subTitle: {
        marginBottom: "10px",
    },
}))

export default function SettingTab(props) {
    const classes = useStyle();

    return(
        <Grid container>
            <Typography variant="subtitle1">Fichier de point</Typography>

            <Grid container className={classes.section}>
                <Typography variant='subtitle2' className={classes.subTitle}>Sélectionner un Fichier</Typography>
                <UploadButton />
            </Grid>

            <Grid container className={classes.section}>
                <Typography variant='subtitle2' className={classes.subTitle}>Exécuter le Fichier</Typography>
                <ReadExecuteFile />
            </Grid>
        </Grid>
    );
}


export function UploadButton(props) {
    const classes = useStyle();

    const selectedFilePathName = useSelector(windowSlectors.selectedFilePathName);
    const dispatach = useDispatch();

    const uploadIcon = (<GetAppRoundedIcon fontSize="small" style={{ color: "#289C6F" }}/>);
    const checkIcon = (<CheckCircleOutlineRoundedIcon fontSize="small" style={{ color: "#289C6F" }}/>);

    return(
        <Tooltip title={selectedFilePathName || "Aucun fichier sélectionné"}>
            <CustomButtonOutlined 
                variant="outlined"
                onClick={() => {
                    window.Upload.openDialog((fileName) => dispatach(changeSelectedFilePathName(fileName)));
                    
                    // file the buffer with an empty array
                    // initallize buffer pointer to 0
                    dispatach(fillBuffer([]));
                    dispatach(setBufferIndexOfActualSentCommand(0));
                }}
                >
                <Grid container justify="space-between" alignItems="center">
                    {(selectedFilePathName) ? checkIcon : uploadIcon}
                    <Typography className={classes.space}>Uploader</Typography>
                </Grid>
            </CustomButtonOutlined>
        </Tooltip>
    );
}

export function ReadExecuteFile(props) {
    const classes = useStyle();

    const dispatch = useDispatch();
    const selectedFilePathName = useSelector(windowSlectors.selectedFilePathName);

    const buffer = useSelector(windowSlectors.buffer);
    const bufferIndexOfActualSentCommand = useSelector(windowSlectors.bufferIndexOfActualSentCommand);

    const [status, setStatus] = useState((buffer.length) ? "reading": "");
    const [trigger, setTrigger] = useState(false);

    // update status when 
    // buffer is updated
    useEffect(() => {
        if(!buffer.length) {
            setStatus("");
        }   
    }, [buffer])

    // notify whenever somthing comes from 
    // Serial Port
    useEffect(() => {
        window.SerialAPI.read((data) => {setTrigger(data); dispatch(updateReceivedData(data));})
    }, [])

    // send command whenever the 
    // previous one was completed
    useEffect(() => {
        // execute when the buffer 
        // is not empty
        if(!buffer.length) {
            return
        }

        const indexActualCommand = bufferIndexOfActualSentCommand;
        const command = buffer[indexActualCommand]

        console.log(command);
        if(command) {
            // send command to serial port
            window.SerialAPI.send(`b ${command.x} ${command.y} ${command.z}`);
            dispatch(setBufferIndexOfActualSentCommand(indexActualCommand + 1))
        }

    }, [trigger, buffer])


    const disabled = !(selectedFilePathName || buffer.length);

    return(
        <React.Fragment>
            <Grid className={classes.subSection} container alignContent="center">
                <CustomButtonOutlined 
                    variant="outlined"
                    disabled={disabled}
                    onClick={() => {
                        if(selectedFilePathName && buffer.length) {
                            return 
                        }
                        
                        console.log("execute button clicked");
                        setStatus("loading");
                        window.Upload.readFile(selectedFilePathName, (data) => {
                            dispatch(fillBuffer(data));
                            setStatus("reading");
                        });
                    }}
                    >
                    <Grid container justify="space-between" alignItems="center">
                        <SendRoundedIcon fontSize="small"/>
                        <Typography className={classes.space}>Lire et exécuter</Typography>
                    </Grid>
                </CustomButtonOutlined>
            </Grid>
            <Progress status={status} value={Math.floor(bufferIndexOfActualSentCommand / buffer.length * 100)}/>
        </React.Fragment>
    );
}


export function Progress(props) {
    const value = props.value;
    const status = props.status;

    if(status === "loading") {
        return(
            <div style={{ width: "100%"}}>
                <LinearProgress variant="indeterminate"/>
                <Typography variant="caption">Lecture du fichier</Typography>
            </div>
        );
    }

    if(status === "reading") {
        return(
            <div style={{ width: "100%"}}>
                <LinearProgress variant="determinate" value={value}/>
                <Typography variant="caption">{(value === 100) ? "Accompli avec succès" : "Merci de patienter"}</Typography>
            </div>
        );
    }

    return <div></div>
}
    