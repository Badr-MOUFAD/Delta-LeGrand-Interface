import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import MenuBar from "./component/MenuBar";
import  AppTabs from './component/AppTabs';
import AppCommandPanel from './component/AppCommandPanel';
import PositionChart from './component/PositionChart';
import TiltingChart from "./component/TiltingChart";

import { updateAvailablePorts } from "./redux/WindowSlice";


const useStyles = makeStyles((theme) => ({
    container: {
      height: "95%"
    },
    subContainer: {
      height: "95%"
    },
    graphContainer: {
        marginBottom: "10px",
        minHeight: "100px",
    },
}));


export default function App(props) {
    const classes = useStyles();

    // component did mount set intervall
    // refreshing to detect new available ports
    const dispatch = useDispatch();
    useEffect(() => {
        const idRefresh = setInterval(() => {
            window.SerialAPI.selectAvailablePorts((portList) => dispatch(updateAvailablePorts(portList)));
        }, 1000);

        return () => {
            clearInterval(idRefresh);
        }
    }, [])
    

    return (
        <Grid className={classes.container} container spacing={2}> 
            <MenuBar />

            {/* side bar */}
            <Grid className={classes.subContainer} item xs={1} >
                <Paper className={classes.subContainer} variant="outlined">
                    <AppTabs />
                </Paper>
            </Grid>

            {/* content of the select tab is shown here */}
            <Grid className={classes.subContainer} item xs={3}>
                <Paper className={classes.subContainer} variant="outlined">
                    <AppCommandPanel />
                </Paper>
            </Grid>

            {/* graph section */}
            <Grid className={classes.subContainer} item xs={8}>
                {/* nacelle position */}
                <Paper className={classes.graphContainer} variant="outlined">
                    <PositionChart />
                </Paper>

                {/* plateau tilting */}
                <Paper className={classes.graphContainer} variant="outlined">
                    <TiltingChart />
                </Paper>
            </Grid> 
        </Grid>
    );
}