import React from 'react';

import { useSelector } from 'react-redux';
import { deltaSelectors } from '../redux/DeltaCommandSlice';
import { ChartComponent } from './CustomCoreComponent';


export default function PositionChart(props) {
    const previousXYPostions = useSelector(deltaSelectors.previousXYPostions);
    const { x, y, z } = useSelector(deltaSelectors.postion);

    return(
      <ChartComponent
        id="postion-chart"
        chartProps={{
            type: 'scatter',
            data: {
                datasets: [
                    {
                    label: 'Position précédente',
                    data: previousXYPostions,
                    borderColor: '#289C6F',
                    pointBackgroundColor: '#289C6F',
                    pointRadius: 2,
                    showLine: true,
                    fill: false,
                    tension: 0.15,
                    stepped: false,
                },
                    {
                    label: 'Position actuelle',
                    backgroundColor: '#289C6F',
                    borderColor: "#0F5A73",
                    data: [{ x: x, y: y }],
                    pointRadius: 3,
                    pointBackgroundColor: '#289C6F',
                    pointBorderWidth: 5,
                    pointBorderColor: "#0F5A73"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `Position de la nacelle (plan z = ${z}cm)`
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'x en mm'
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
                            labelString: 'y en mm'
                        },
                        ticks: {
                            max: 340,
                            min: -340,
                            stepSize: 70
                        }
                    }],
                }    
            }
        }}
        />  
    );
}