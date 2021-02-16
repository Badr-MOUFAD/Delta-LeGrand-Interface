import React, { useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, LinearProgress } from "@material-ui/core";

import Chart from "chart.js";


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

  
export const CustomButtonFill = withStyles((theme) => ({
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


export const CustomButtonOutlined = withStyles((theme) => ({
  root: {
    color: '#289C6F',
    borderColor: '#289C6F',
    backgroundColor: 'white',
    textTransform: 'none',
    paddingRight: "15px",
    paddingLeft: "15px",
    minWidth: "120px",
  },
}))(Button);


export const CustomLinearProgress = withStyles((theme) => ({
  bar: {
    backgroundColor: '#289C6F',
  },
}))(LinearProgress);


export function ChartComponent(props) {
  const height = props.height;
  const width = props.width;
  const chartProps = props.chartProps;

  const chartId = props.id;
  const containerId = "static-container-chart-component-" + chartId;

  const mountingFunction = () => {
    const containerElement = document.getElementById(containerId);
    containerElement.innerHTML = `<canvas id=${chartId} width="${width}px" height="${height}px"></canvas>`;

    window[chartId] = new Chart(chartId, chartProps);
  }

  useEffect(() => {
    mountingFunction();

    return () => {
      const chartElement = document.getElementById(chartId);

      if(chartElement) {
        chartElement.remove();
      }
    }
  }, [chartProps])

  return <div id={containerId}></div>
}