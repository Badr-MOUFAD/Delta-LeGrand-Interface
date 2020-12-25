import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Tabs } from "@material-ui/core";


export const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
          color: '#289C6F',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#289C6F',
        },
    },
  })(TextField);

  
export const CustomButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#289C6F'),
      backgroundColor: '#289C6F',
      textTransform: 'none',
      paddingRight: "15px",
      paddingLeft: "15px",
      minWidth: "120px",
      '&:hover': {
        backgroundColor: "#0F5A73",
      },
    },
  }))(Button);


export const CustomTabs = withStyles((them) => ({
  indicator: {
    '& .MuiTabs-indicator': {
      color: '#289C6F',
    }
  }
}))(Tabs);