import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Divider, Grid } from '@material-ui/core';
import { Gird, Paper } from '@material-ui/core';
import { TabPanel, TabContext } from "@material-ui/lab";

import { deltaSelectors, changePosition } from '../src/redux/DeltaCommandSlice';
import  AppTabs from './component/AppTabs';
import AppCommandPanel from './component/AppCommandPanel';


const useStyles = makeStyles((theme) => ({
    container: {
      height: "100%"
    },
    subContainer: {
      height: "98%"
    },
    graphContainer: {
        marginBottom: "10px",
        minHeight: "100px"
    }
}));


export default function App(props) {
    const classes = useStyles();

    return (
        <Grid className={classes.container} container spacing={2}> 
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



