import React from 'react';

import { useSelector } from 'react-redux';
import { windowSlectors } from '../redux/WindowSlice';

import { TabContext, TabPanel } from '@material-ui/lab';

import NacelleTab from './NacelleTab';
import PlateauTab from './PlateauTab';
import NacellePlateauTab from "./NacellePlateauTab";
import FilePointsTab from './FilePointsTab';
import SettingTab from "./SettingsTab";


export default function CommandPanedComponent(props) {
    const activeTab = useSelector(windowSlectors.activeTab);

    return(
        <TabContext value={activeTab}>
            <TabPanel value="0">
                <NacelleTab />
            </TabPanel>

            <TabPanel value="1">
                <PlateauTab />
            </TabPanel>
            
            <TabPanel value="2">
                <NacellePlateauTab />
            </TabPanel>

            <TabPanel value="3">
                <FilePointsTab />
            </TabPanel>

            <TabPanel value="4">
                <SettingTab />
            </TabPanel>
        </TabContext>
    );
}