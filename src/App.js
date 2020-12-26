import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Divider, Grid } from '@material-ui/core';
import { Gird, Paper, AppBar, Toolbar, IconButton, ButtonGroup } from '@material-ui/core';
import { TabPanel, TabContext } from "@material-ui/lab";

import MenuIcon from '@material-ui/icons/Menu';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';

import { deltaSelectors, changePosition } from '../src/redux/DeltaCommandSlice';
import  AppTabs from './component/AppTabs';
import AppCommandPanel from './component/AppCommandPanel';


const useStyles = makeStyles((theme) => ({
    container: {
      height: "95%"
    },
    subContainer: {
      height: "98%"
    },
    graphContainer: {
        marginBottom: "10px",
        minHeight: "100px"
    },
    appBar: {
        backgroundColor: '#289C6F',
    },
    iconAppBar: {
        color: "white"
    }
}));


export default function App(props) {
    const classes = useStyles();

    return (
        <Grid className={classes.container} container spacing={2}> 
            <AppBar position="static" classes={{ root: classes.appBar}}>
                <Grid container justify="space-between">
                    <Toolbar variant="dense">
                      <Typography variant="h6" style={{ marginLeft: '85px'}}>
                        Delta LeGrand
                      </Typography>
                    </Toolbar>
                    <Grid>
                        <IconButton><RemoveIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                        <IconButton>< CropSquareIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                        <IconButton><CloseIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                    </Grid>
                </Grid>
            </AppBar>
            <Grid className={classes.subContainer} item xs={1} >
                <Paper className={classes.subContainer} variant="outlined">
                    <AppTabs />
                </Paper>
            </Grid>

            <Grid className={classes.subContainer} item xs={3}>
                <Paper className={classes.subContainer} variant="outlined">
                    <AppCommandPanel />
                </Paper>
            </Grid>

            <Grid className={classes.subContainer} item xs={8}>
                <Paper className={classes.graphContainer} variant="outlined">
                    
                </Paper>

                <Paper className={classes.graphContainer} variant="outlined">
                   
                </Paper>
            </Grid> 
        </Grid>
    );
}



