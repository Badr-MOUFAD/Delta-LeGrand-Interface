import React, { useReducer } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, Grid, Typography } from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { CustomButton, CustomTextField } from './CustomCoreComponent';


const maxTheta = 15;
const maxPhi = 180;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: "20px"
    },
    textField: {
        marginTop: "20px",
        marginBottom: "20px",    
    },
    submitButton: {
        marginTop: "40px"
    }

}));



export default function PlateauTab(props) {
    const classes = useStyles();

    const textFieldsReducer = (state, action) => {
        return {
            phi: state.phi, 
            theta: state.theta, 
            [action.type]: Number(action.payload)
        }
    }

    const errorReducer = (state, action) => {
        let angle = Number(action.payload);

        switch(action.type) {
            case "phi":
                return {...state, phi: (Math.abs(angle) > maxPhi) ? true : false}
            case "theta":
                return {...state, theta: (angle > maxTheta || angle < 0) ? true : false}
        }
    }

    const [textFields, dispatchTextFields] = useReducer(textFieldsReducer, { phi: "", theta: "" });
    const [errorTextFields, dispatchError] = useReducer(errorReducer, { phi: false, theta: false });

    return(
        <Grid container>
            <Typography variant="h5">Plateau</Typography>
            <Grid container className={classes.container}>
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

            <Grid className={classes.submitButton} container alignContent="center">
                <CustomButton>
                    <Grid container justify="space-between">
                        <SendRoundedIcon />
                        <Typography>Execute</Typography>
                    </Grid>
                </CustomButton> 
            </Grid>
        </Grid>
    );
}
