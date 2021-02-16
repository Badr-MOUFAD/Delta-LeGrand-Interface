import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Fade from 'react-reveal/Fade';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import TouchAppIconRounded from '@material-ui/icons/TouchAppRounded';

import MenuBar, { MenuBarSimple } from "./component/MenuBar";
import AppTabs from './component/AppTabs';
import AppCommandPanel from './component/AppCommandPanel';
import PositionChart from './component/PositionChart';
import TiltingChart from "./component/TiltingChart";
import { AvailablePortsComponent } from "./component/SettingsTab";

import { updateAvailablePorts, updateConnection, windowSlectors } from "./redux/WindowSlice";


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
    connection: {
        backgroundColor: "#289C6F",
        height: "95%",
        width: "100%",
    },
    connectionPaper: {
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "60px",
        paddingRight: "60px",
    },
    subtitle: {
        marginTop: "20px",
        marginBottom: "20px",
    }
}));


export default function App(props) {
    const classes = useStyles();
  
    const dispatch = useDispatch();
    const isConnected = useSelector(windowSlectors.isConnected);

    // component did mount set intervall
    // refreshing to detect new available ports
    // check the connection
    useEffect(() => {
        const idRefresh = setInterval(() => {
            window.SerialAPI.selectAvailablePorts((portList) => dispatch(updateAvailablePorts(portList)));
            dispatch(updateConnection());
        }, 1000);

        return () => {
            clearInterval(idRefresh);
        }
    }, [])
    
    
    if(isConnected) {
        return <MainPage />
    }
    else {
        return <ConnectionPage />
    }
}


export function ConnectionPage(props) {
    const classes = useStyles();

    const availablePorts = useSelector(windowSlectors.availablePorts);

    return(
        <React.Fragment>
            <MenuBarSimple />
            <Grid className={classes.connection} container justify="center" alignItems="center">
                <Fade>
                    <Grid item>
                        <Paper className={classes.connectionPaper}>
                            <Grid container spacing={10}>
                                <Grid item> 
                                    <AvailablePortsComponent availablePorts={availablePorts} />

                                    <Grid  className={classes.subtitle} container alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2">
                                                Sélectionner le port Arduino
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <TouchAppIconRounded fontSize="small" style={{ marginLeft: "10px"}} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item justify="center" alignContent="center">
                                    <img src="delta-le-grand-logo.png" alt="..." />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Fade>
            </Grid>
        </React.Fragment>
    );
}


export function MainPage(props) {
    const classes = useStyles();

    return(
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
                    <Fade>
                        <AppCommandPanel />
                    </Fade>
                </Paper>
            </Grid>

            {/* graph section */}
            <Grid className={classes.subContainer} item xs={8}>
                {/* nacelle position */}
                <Paper className={classes.graphContainer} variant="outlined">
                    <Fade>
                        <PositionChart />
                    </Fade>
                </Paper>

                {/* plateau tilting */}
                <Paper className={classes.graphContainer} variant="outlined">
                    <Fade>
                        <TiltingChart />
                    </Fade>
                </Paper>
            </Grid> 
        </Grid>
    );
}