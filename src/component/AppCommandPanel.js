import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateReceivedData, windowSlectors } from '../redux/WindowSlice';

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

            <TabPanel value="5">
                <InfoTab />
            </TabPanel>
        </TabContext>
    );
}


export function InfoTab(props) {
    const dispatch = useDispatch();
    const receivedData = useSelector(windowSlectors.receivedData);

    useEffect(() => {
        window.SerialAPI.read((data) => dispatch(updateReceivedData(data)));
    }, [])

    return(
        <div>
            <h4>info</h4>
            <ol>
                {receivedData.map((message, i) => 
                    <li key={`info-data-${i}`}>{message}</li>
                )}
            </ol>
        </div>
    );
}