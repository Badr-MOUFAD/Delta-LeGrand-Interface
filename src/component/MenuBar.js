import React from 'react';

import { AppBar, Toolbar, Typography, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import CropSquareIcon from '@material-ui/icons/CropSquare';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
    brand: {
        marginLeft: '85px',
        paddingLeft: "20px",
        width: "260px",
        backgroundColor: "#0F5A73",
        color: "white",
    },
    appBar: {
        backgroundColor: '#289C6F',
        marginBottom: "10px"
    },
    iconAppBar: {
        color: "white",
    }
}));


export default function MenuBar(props) {
    const classes = useStyles();

    return(
        <AppBar position="static" classes={{ root: classes.appBar}}>
            <Grid container justify="space-between">
                <Toolbar variant="dense">
                    <Paper className={classes.brand} variant="outlined">
                        <Typography>
                            Delta Le <b>Grand</b>
                        </Typography>
                    </Paper>
                </Toolbar>
                <Grid>
                    <IconButton onClick={() => window.windowAPI.minimize()}>
                        <RemoveIcon fontSize="small" classes={{ root: classes.iconAppBar }}/>
                    </IconButton>
                    <IconButton onClick={() => {}}>
                        < CropSquareIcon fontSize="small" classes={{ root: classes.iconAppBar }}/>
                    </IconButton>
                    <IconButton onClick={() => window.windowAPI.close()}>
                        <CloseIcon fontSize="small" classes={{ root: classes.iconAppBar }}/>
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );
}