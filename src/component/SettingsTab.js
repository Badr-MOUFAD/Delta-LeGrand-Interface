import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { changePortName, windowSlectors } from '../redux/WindowSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';
import SettingsInputHdmiRoundedIcon from '@material-ui/icons/SettingsInputHdmiRounded';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';


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
    }
  }));


export default function SettingsTab(props) {
    const classes = useStyles();

    const activePort = useSelector(windowSlectors.activePort);
    const [availablePorts, setAvailablePorts] = useState(["COM5", "COM6", "COM7"]);

    useEffect(() => {
        console.log(activePort);
    }, []);

    return(
        <Grid container>
            <Typography variant="subtitle1">Outil</Typography>
            
            <Grid container className={classes.container}>
                <Typography variant="subtitle2" >Port disponible</Typography>
                <List className={classes.list}>
                    {availablePorts.map((portName, i) => {
                        return(
                            <Grid key={`available-ports-${portName}-${i}`} >
                                <ListItem className={classes.noPadding}>
                                    <ListItemAvatar>
                                        <SettingsInputHdmiRoundedIcon fontSize="small" />
                                    </ListItemAvatar>
                                    <ListItemText 
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
                                            >
                                            <SettingsEthernetRoundedIcon fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </Grid>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
}