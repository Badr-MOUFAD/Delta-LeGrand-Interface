import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { windowSlectors } from '../redux/WindowSlice';

import { deltaSelectors, changePosition } from '../redux/DeltaCommandSlice';

import { TabContext, TabPanel } from '@material-ui/lab';

import NacelleTab from './NacelleTab';
import PlateauTab from './PlateauTab';
import NacellePlateauTab from "./NacellePlateauTab";


export default function CommandPanedComponent(props) {
    const dispatch = useDispatch();
    const position = useSelector(deltaSelectors.postion);

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
        </TabContext>
    );
}