import React from 'react';

import { AppBar, Toolbar, Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import CropSquareIcon from '@material-ui/icons/CropSquare';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
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
                  <Typography style={{ marginLeft: '85px'}}>
                    Delta Le <b>Grand</b>
                  </Typography>
                </Toolbar>
                <Grid>
                    <IconButton><RemoveIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                    <IconButton>< CropSquareIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                    <IconButton><CloseIcon fontSize="small" classes={{ root: classes.iconAppBar}}/></IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );
}