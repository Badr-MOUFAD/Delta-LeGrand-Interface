import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeActiveTab, windowSlectors } from '../redux/WindowSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Grid } from "@material-ui/core";

import CreateIcon from '@material-ui/icons/Create';
import CropDinIcon from '@material-ui/icons/CropDin';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import { CustomTabs } from "./CustomCoreComponent"; 


const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%"
    },
    mainTab: {
        minWidth: "50px", 
        fontSize: "11px"
    },
    tab: {
        backgroundColor: "#289C6F"
    }
}));

const tabs = {
    command: {
        "Nacelle": {
            index: "0",
            icon: <CreateIcon />
        },
        "Plateau": {
            index: "1",
            icon: <CropDinIcon />
        },
        "Plateau\nNacelle": {
            index: "2",
            icon: <BorderColorIcon />
        },
        "Fichier\nde point":{
            index: "3",
            icon: <DescriptionOutlinedIcon />
        }
    },
    other: {
        "Settings": {
            index: "4",
            icon: <SettingsIcon />
        },
        "Info": {
            index: "5",
            icon: <InfoIcon />
        }
    }
}


export default function AppTabs(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const activeTab = useSelector(windowSlectors.activeTab)

    
    return(
        <Grid className={classes.container} container direction="column" justify="space-between">
            <Tabs 
                orientation='vertical' 
                value={(Number(activeTab) > 3) ? false : activeTab} 
                onChange={(e, newValue) => dispatch(changeActiveTab(newValue))}
                classes={{ indicator: classes.tab }}
                >
                {Object.keys(tabs.command).map((tab, i) => 
                    <Tab 
                        key={`command-${tab}${i}`}
                        className={classes.mainTab}
                        label={tab}
                        value={tabs.command[tab].index}
                        icon={tabs.command[tab].icon}
                        />
                )}
            </Tabs>
            <Tabs 
                orientation='vertical' 
                value={(Number(activeTab) <= 3) ? false : activeTab}
                onChange={(e, newValue) => dispatch(changeActiveTab(newValue))}
                classes={{ indicator: classes.tab }}
                >
                {Object.keys(tabs.other).map((tab, i) => 
                    <Tab 
                        key={`other-${tab}${i}`}   
                        className={classes.mainTab}
                        label={tab}
                        value={tabs.other[tab].index}
                        icon={tabs.other[tab].icon}
                        />
                )}
            </Tabs>
        </Grid>
    );
}