import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: "0",
    activePort: "",
    receivedData: ["test1"]
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
        updateReceivedData: (state, action) => {
            state.receivedData.push(action.payload);
        }
    }
})


export const windowSlectors = {
    activeTab: (state) => state.window.activeTab,
    activePort: (state) => state.window.activePort,
    receivedData: (state) => state.window.receivedData,
}

export const { changeActiveTab, changePortName, updateReceivedData } = windowSlice.actions;

export default windowSlice.reducer;