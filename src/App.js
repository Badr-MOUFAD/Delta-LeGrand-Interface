import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Divider, Grid } from '@material-ui/core';
import { Gird, Paper } from '@material-ui/core';

import { deltaSelectors, changePosition } from '../src/redux/DeltaCommandSlice';
import TabsComponent, { TabsOther } from './component/TabsComponent';


/* export default function App(props) {
    const dispatch = useDispatch();

    const position = useSelector(deltaSelectors.postion);
    const tilting = useSelector(deltaSelectors.tilting);

    const reducerPositionTextField = (state, action) => {
        return {
            x: state.x, 
            y: state.y, 
            z: state.z, 
            [action.type]: action.payload }
    }
    
    const [statePostionTextField, dispatchPositionText] = useReducer(reducerPositionTextField, {x: "", y: "", z: ""})

    return (
        <div>
            <h1>Delta LeGrand</h1>
            <Button color="primary">Hello Delta LeGrand</Button>

            <div>
                {Object.keys(position).map((coordinate) =>
                    <Typography key={`${coordinate}123`}>{`${coordinate}: ${position[coordinate]}`}</Typography>
                )}
            </div>
            <div>
                {Object.keys(tilting).map((angle) =>
                    <Typography key={`${angle}123`}>{`${angle}: ${tilting[angle]}`}</Typography>
                )}
            </div>

            <Divider />

            {Object.keys(statePostionTextField).map((coordinate) => (
                <input
                    key={`${coordinate}001`} 
                    type='text' 
                    value={statePostionTextField[coordinate]} 
                    onChange={({ target }) => dispatchPositionText({ type: coordinate, payload: target.value })}/>
            ))}

            <Button onClick={() => dispatch(changePosition(statePostionTextField))}>update position</Button>
        </div>
    );
} */

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
                    <Grid className={classes.container} container direction="column" justify="space-between">
                        <TabsComponent />
                        <TabsOther />
                    </Grid>
                </Paper>
            </Grid>

            <Grid className={classes.subContainer} item xs={4}>
                <Paper className={classes.subContainer} variant="outlined">
                    
                </Paper>
            </Grid>

            <Grid className={classes.subContainer} item xs={7}>
                <Paper className={classes.graphContainer} variant="outlined">
                    
                </Paper>

                <Paper className={classes.graphContainer} variant="outlined">
                   
                </Paper>
            </Grid> 
        </Grid>
    );
}



