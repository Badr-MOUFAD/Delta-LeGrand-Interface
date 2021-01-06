import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { changePortName, windowSlectors } from '../redux/WindowSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, Button, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';
import SettingsInputHdmiRoundedIcon from '@material-ui/icons/SettingsInputHdmiRounded';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';
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

    const activePort = useSelector(windowSlectors.activePort);
    const [availablePorts, setAvailablePorts] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            window.SerialAPI.selectAvailablePorts(setAvailablePorts);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return(
        <Grid container>
            <Typography variant="subtitle1">Outil</Typography>
            
            <AvailablePortsComponent 
                availablePorts={availablePorts} 
                activePort={activePort}
                />

            <Grid container className={classes.container}>
                <Typography className={classes.subTitle} variant="subtitle2">Autre </Typography>

                <List className={classes.list}>
                    <ListItem button className={classes.noPadding}>
                        <ListItemAvatar>
                            <EditRoundedIcon fontSize="small"/>
                        </ListItemAvatar>
                        <ListItemText 
                            classes={{ primary: classes.textNoStyle }}
                            primaryTypographyProps={{ variant: "subtitle2" }}
                            primary="Initialiser la nacelle"
                            />
                    </ListItem>
                    <Divider />

                    <ListItem button className={classes.noPadding}>
                        <ListItemAvatar>
                            <ChangeHistoryRoundedIcon fontSize="small"/>
                        </ListItemAvatar>
                        <ListItemText 
                            classes={{ primary: classes.textNoStyle }}
                            primaryTypographyProps={{ variant: "subtitle2" }}
                            primary="Initialiser le plateau"
                            />
                    </ListItem>
                    <Divider />

                    <ListItem button className={classes.noPadding}>
                        <ListItemAvatar>
                            <TimelineRoundedIcon fontSize="small"/>
                        </ListItemAvatar>
                        <ListItemText 
                            classes={{ primary: classes.textNoStyle }}
                            primaryTypographyProps={{ variant: "subtitle2" }}
                            primary="Effacer la trajéctoire"
                            />
                    </ListItem>
                    <Divider />
                </List>
            </Grid>
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