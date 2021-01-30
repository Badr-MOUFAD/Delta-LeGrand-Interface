import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: "0",
    activePort: "",
    availablePorts: [],
    isConnected: false,
    selectedFilePathName: "",
    buffer: [],
    bufferIndexOfActualSentCommand: 0,
    isExecutingFile: false,
    receivedData: ["test1"],
}

export const windowSlice = createSlice({
    name: "window",
    initialState: initialState,
    reducers: {
        changeActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        changePortName: (state, action) => {
            const newPortName = action.payload;

            window.SerialAPI.changePortName(newPortName);
            state.activePort = newPortName;
        },
        updateConnection: (state) => {
            if(state.availablePorts.includes(state.activePort)) {
                state.isConnected = true;
            }
            else {
                state.isConnected = false;
                state.activePort = "";
            }
        },
        updateAvailablePorts: (state, action) => {
            state.availablePorts = action.payload;
        },
        updateReceivedData: (state, action) => {
            state.receivedData.push(action.payload);
        },
        changeSelectedFilePathName: (state, action) => {
            state.selectedFilePathName = action.payload;
        },
        fillBuffer: (state, action) => {
            state.buffer = action.payload;
        },
        setBufferIndexOfActualSentCommand: (state, action) => {
            const index = action.payload;

            if(index > state.buffer.length) {
                return
            }

            state.bufferIndexOfActualSentCommand = index;
        },
        setIsExecutingFile: (state, action) => {
            state.isExecutingFile = action.payload;
        }
    }
})


export const windowSlectors = {
    activeTab: (state) => state.window.activeTab,
    activePort: (state) => state.window.activePort,
    availablePorts: (state) => state.window.availablePorts,
    isConnected: (state) => state.window.isConnected,
    receivedData: (state) => state.window.receivedData,
    selectedFilePathName: (state) => state.window.selectedFilePathName,
    buffer: (state) => state.window.buffer,
    bufferIndexOfActualSentCommand: (state) => state.window.bufferIndexOfActualSentCommand,
    isExecutingFile: (state) => state.window.isExecutingFile,
}

export const { 
    changeActiveTab, 
    changePortName, 
    updateAvailablePorts, 
    updateConnection,
    updateReceivedData, 
    changeSelectedFilePathName,
    fillBuffer,
    setBufferIndexOfActualSentCommand,
    setIsExecutingFile } = windowSlice.actions;

export default windowSlice.reducer;