import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Grid } from "@material-ui/core";

import CreateIcon from '@material-ui/icons/Create';
import CropDinIcon from '@material-ui/icons/CropDin';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    tab: {
        minWidth: "50px", 
        fontSize: "12px"
    }
}));

const tabs = {
    command: {
        "Nacelle": {
            index: 0,
            icon: <CreateIcon />
        },
        "Plateau": {
            index: 1,
            icon: <CropDinIcon />
        },
        "Plataau\nNacelle": {
            index: 2,
            icon: <BorderColorIcon />
        }
    },
    other: {
        "Settings": {
            index: 3,
            icon: <SettingsIcon />
        },
        "Info": {
            index: 4,
            icon: <InfoIcon />
        }
    }
}


export default function TabsComponent(props) {

    return (
        <Tabs orientation="vertical" value={10}>
            <Tab index={0} label="Nacelle" style={{ minWidth: "50px", fontSize: "12px"}} icon={<CreateIcon />}/>
            <Tab index={1} label="Plateau" style={{ minWidth: "50px", fontSize: "12px"}} icon={<CropDinIcon />} />
            <Tab index={2} label={"Nacelle\nPlateau"} style={{ minWidth: "50px", fontSize: "12px"}} icon={<BorderColorIcon />} />
        </Tabs>
    );
}


export function TabsOther(props) {

    return(
        <Tabs orientation="vertical" value={false}>
            <Tab index={0} label="paramètre" style={{ minWidth: "50px", fontSize: "12px"}} icon={<SettingsIcon />}/>
            <Tab index={1} label="info" style={{ minWidth: "50px", fontSize: "12px"}} icon={<InfoIcon />} />
        </Tabs>
    );
}


export function AppTabs(props) {

    return
}