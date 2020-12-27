import React from 'react';

import { useSelector } from 'react-redux';
import { deltaSelectors } from '../redux/DeltaCommandSlice';
import { ChartComponent } from './CustomCoreComponent';


export default function PositionChart(props) {
    const { phi, theta } = useSelector(deltaSelectors.tilting);

    const ellipseRadiusA = 50;
    const ellipseRadiusB = 270;
    const nbPoints = 100;

    const actualTilting = { 
        x: ellipseRadiusA * Math.cos(phi / 180 * Math.PI), 
        y: ellipseRadiusB * Math.sin(phi / 180 * Math.PI)
    }

    return(
      <ChartComponent
        id="tilting-chart"
        height={79}
        chartProps={{
            type: 'scatter',
            data: {
                datasets: [
                    {
                    data: drawCircle(ellipseRadiusA, ellipseRadiusB, nbPoints),
                    pointBackgroundColor: '#289C6F',
                    pointRadius: 1,
                    showLine: true,
                    fill: false,
                    tension: 0.15,
                    stepped: false,
                },
                    {
                    data: [{x: 0, y: 0}, actualTilting],
                    borderColor: '#289C6F',
                    showLine: true,
                    pointBackgroundColor: '#289C6F',
                },
                {
                    data: [actualTilting],
                    borderColor: '#289C6F',
                    pointRadius: 5,
                    pointBackgroundColor: '#289C6F',
                    pointBorderWidth: 1,
                    pointBorderColor: "#0F5A73"
                },
            ]
            },
            options: {
                title: {
                    display: true,
                    text: `Inclinaison theta = ${theta} DEG`
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false
               },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ' '
                        },
                        ticks: {
                            max: 340,
                            min: -340,
                            stepSize: 50
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ' '
                        },
                        ticks: {
                            max: 340,
                            min: -340,
                            stepSize: 90
                        }
                    }],
                }   
            }
        }}
        />  
    );
}


function drawCircle(a, b, nbPoints) {
    const theta = lineSpace(-Math.PI, Math.PI, nbPoints);

    let result = [];
    for(let i=0; i <= theta.length; i++) {
        result.push({ x: a * Math.cos(theta[i]), y: b * Math.sin(theta[i])})
    }

    return result;
}

function lineSpace(xMin, xMax, nbPoints) {
    let result = [];
    let step = (xMax - xMin) / nbPoints;

    for(let i = xMin; i < xMax; i+=step) {
        result.push(i);
    }

    return result;
}


