import React, { useReducer } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, Grid, Typography } from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { CustomButton, CustomTextField } from './CustomCoreComponent';


const workspaceRadius = 340;
const workspaceHeight = 1200;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: "0px"
    },
    textField: {
        marginTop: "20px",
        marginBottom: "20px",    
    },
    submitButton: {
        marginTop: "40px"
    }

}));



export default function NacelleTab(props) {
    const classes = useStyles();

    const textFieldsReducer = (state, action) => {
        return {
            x: state.x, 
            y: state.y, 
            z: state.z, 
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
        }
    }

    const [textFields, dispatchTextFields] = useReducer(textFieldsReducer, { x: "", y: "", z: ""});
    const [errorTextFields, dispatchError] = useReducer(errorReducer, { x: false, y: false, z: false});

    return(
        <Grid container>
            <Typography variant="subtitle1">Nacelle</Typography>
            <Grid container className={classes.container}>
               {["x", "y", "z"].map((coordinate, i) => 
                    <CustomTextField
                        key={`nacelle-${coordinate}-${i}`}
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

            <Grid className={classes.submitButton} container alignContent="center">
                <CustomButton>
                    <Grid container justify="space-between" alignItems="center">
                        <SendRoundedIcon fontSize="small"/>
                        <Typography>Exécuter</Typography>
                    </Grid>
                </CustomButton>
            </Grid> 
        </Grid>
    );
}