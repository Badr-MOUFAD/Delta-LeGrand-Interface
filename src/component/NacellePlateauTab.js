import React, { useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changePosition, changeTilting, deltaSelectors } from '../redux/DeltaCommandSlice';

import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, Grid, Typography } from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { CustomButtonFill, CustomTextField } from './CustomCoreComponent';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: "0px",
    },
    textField: {
        marginTop: "0px",
        marginBottom: "20px",    
    },
    submitButton: {
        marginTop: "40px"
    }

}));

const maxTheta = 15;
const maxPhi = 180;

const workspaceRadius = 340;
const workspaceHeight = 1200;


export default function NacellePlateauTab(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const textFieldsReducer = (state, action) => {
        return {
            x: state.x, 
            y: state.y, 
            z: state.z,
            phi: state.phi,
            theta: state.theta,
            [action.type]: Number(action.payload)
        }
    }

    const errorReducer = (state, action) => {
        let coordinate = Number(action.payload);

        switch(action.type) {
            case "x":
                return {...state, x: (Math.abs(coordinate) > workspaceRadius) ? true : false}
            case "y":
                return {...state, y: (Math.abs(coordinate) > workspaceRadius) ? true : false}
            case "z":
                return {...state, z: (coordinate > workspaceHeight || coordinate < 0) ? true : false}
            case "phi":
                return {...state, phi: (Math.abs(coordinate) > maxPhi) ? true : false}
            case "theta":
                return {...state, theta: (coordinate > maxTheta || coordinate < 0) ? true : false}
        }
    }

    const [textFields, dispatchTextFields] = useReducer(textFieldsReducer, { x: "", y: "", z: "", phi: "", theta: ""});
    const [errorTextFields, dispatchError] = useReducer(errorReducer, { x: false, y: false, z: false, phi: false, theta: false});

    const executeHandler = () => {
        const { x, y, z } = textFields; 
        const { phi, theta } = textFields;

        if(!(x && y && z)) {
            return ;
        }

        if(!(phi && theta)) {
            return ;
        }

        if(errorTextFields.x || errorTextFields.y || errorTextFields.z) {
            return ;
        }

        if(errorTextFields.phi || errorTextFields.theta) {
            return ;
        }

        dispatch(changePosition({ x, y, z }));
        dispatch(changeTilting({ phi, theta }));

        // send command position then tilting
        window.SerialAPI.send(`d ${textFields.x} ${textFields.y} ${textFields.z} ${textFields.phi} ${textFields.theta}`);
    } 

    return(
        <Grid container>
            <Typography variant="subtitle1">Nacelle et Plateau</Typography>
            <Grid container className={classes.container} style={{ marginTop: "25px"}}>
                <Typography variant='subtitle2'>Position</Typography>
                <Grid container>
                    {["x", "y", "z"].map((coordinate, i) => 
                    <CustomTextField
                        key={`nacelle-plateau-${coordinate}-${i}`}
                        type="number"
                        className={classes.textField}
                        label={`coordonnée ${coordinate}`}
                        value={textFields[coordinate]}
                        onChange={({ target }) => {
                            const action = { type: coordinate, payload: target.value };

                            dispatchTextFields(action);
                            dispatchError(action);
                        }}
                        InputProps={{ endAdornment: <InputAdornment position="start">mm</InputAdornment> }}
                        error={errorTextFields[coordinate]}
                        helperText={errorTextFields[coordinate] && "point hors espace de travail"}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid container className={classes.container} style={{ marginTop: "25px"}}>
                <Typography variant='subtitle2'>Inclinaison</Typography>
                <Grid container>
                    {["phi", "theta"].map((coordinate, i) => 
                    <CustomTextField
                        key={`plateau-${coordinate}-${i}`}
                        type="number"
                        className={classes.textField}
                        label={`angle ${coordinate}`}
                        value={textFields[coordinate]}
                        onChange={({ target }) => {
                            const action = { type: coordinate, payload: target.value };

                            dispatchTextFields(action);
                            dispatchError(action);
                        }}
                        InputProps={{ endAdornment: <InputAdornment position="start">DEG</InputAdornment> }}
                        error={errorTextFields[coordinate]}
                        helperText={errorTextFields[coordinate] && "inclinaison impossible"}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid className={classes.submitButton} container alignContent="center">
                <CustomButtonFill onClick={executeHandler}>
                    <Grid container justify="space-between" alignItems="center">
                        <SendRoundedIcon fontSize="small"/>
                        <Typography>Exécuter</Typography>
                    </Grid>
                </CustomButtonFill>
            </Grid>
        </Grid>
    );
}