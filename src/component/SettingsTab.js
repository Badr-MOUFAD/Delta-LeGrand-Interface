import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { clearPreviousXYPositions } from '../redux/DeltaCommandSlice';
import { changePortName, windowSlectors } from '../redux/WindowSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';

import SettingsInputHdmiRoundedIcon from '@material-ui/icons/SettingsInputHdmiRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';


const useStyles = makeStyles((theme) => ({
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    noPadding: {
        paddingRight: "0px",
        paddingLeft: '0px',
    },
    container: {
        marginTop: "25px",
        maxHeight: "300px",
        overflow: "auto",
    },
    root: {
        color: theme.palette.getContrastText('#289C6F'),
        backgroundColor: '#289C6F',
        '&:hover': {
            backgroundColor: "#0F5A73",
        },
    },
    subTitle: {
        marginBottom: "10px",
    },
    textNoStyle: {
        fontWeight: "normal"
    }
  }));


export default function SettingsTab(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const activePort = useSelector(windowSlectors.activePort);
    const availablePorts = useSelector(windowSlectors.availablePorts);

    return(
        <Grid container>
            <Typography variant="subtitle1">Outil</Typography>
            
            <AvailablePortsComponent availablePorts={availablePorts} activePort={activePort}/>

            <OtherToolsComponent />
        </Grid>
    );
}


export function AvailablePortsComponent(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const availablePorts = props.availablePorts;
    const activePort = props.activePort;

    if(!availablePorts.length)
        return(
            <Grid container className={classes.container}>
                <Typography className={classes.subTitle} variant="subtitle2">Port disponible</Typography>

                <List className={classes.list}>
                    <ListItem className={classes.noPadding}>
                        <ListItemText secondary="Aucun port détecté" />
                    </ListItem>
                </List>
            </Grid>
        );

    return(
        <Grid container className={classes.container}>
            <Typography className={classes.subTitle} variant="subtitle2">Port disponible</Typography>
            <List className={classes.list}>
                {availablePorts.map((portName, i) => {
                    return(
                        <Grid key={`available-ports-${portName}-${i}`} >
                            <ListItem className={classes.noPadding}>
                                <ListItemAvatar>
                                    <SettingsInputHdmiRoundedIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText 
                                    classes={{ primary: classes.textNoStyle }}
                                    primaryTypographyProps={{ variant: "subtitle2"}}
                                    primary={portName} 
                                    secondary={(portName === activePort) ? "connecté" : "..."} 
                                    />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        disabled={activePort === portName} 
                                        edge="end" 
                                        classes={{ root: classes.root}}
                                        size="small"
                                        onClick={() => dispatch(changePortName(portName))}
                                        >
                                        <CompareArrowsRoundedIcon fontSize="small"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </Grid>
                    );
                })}
            </List>
        </Grid>
    );
}


export function OtherToolsComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const tools = [
        {
            primary: "Initialiser la nacelle",
            icon: <EditRoundedIcon fontSize="small"/>,
            onClick: () => window.SerialAPI.send("i"),
        },
        {
            primary: "Inialiser le plateau",
            icon: <ChangeHistoryRoundedIcon fontSize="small"/>,
            onClick: () => window.SerialAPI.send("r"),
        },
        {
            primary: "Effacer la trajectoire",
            icon: <TimelineRoundedIcon fontSize="small"/>,
            onClick: () => dispatch(clearPreviousXYPositions()),
        }
    ];

    return(
        <Grid container className={classes.container}>
            <Typography className={classes.subTitle} variant="subtitle2">Autre </Typography>

            <List className={classes.list}>
                {tools.map((item, i) => {
                    return(
                        <Grid container key={`tools-others-${i}`}>
                            <ListItem 
                                button 
                                className={classes.noPadding}
                                onClick={item.onClick}
                                >
                                <ListItemAvatar>
                                    {item.icon}
                                </ListItemAvatar>
                                <ListItemText 
                                    classes={{ primary: classes.textNoStyle }}
                                    primaryTypographyProps={{ variant: "subtitle2" }}
                                    primary={item.primary}
                                    />
                                </ListItem>
                               
                            <Divider />
                        </Grid>
                    );
                })}
            </List>
        </Grid>
    );
}
