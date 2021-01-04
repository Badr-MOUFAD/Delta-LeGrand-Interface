import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: "0",
    activePort: "COM5",
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
    }
})


export const windowSlectors = {
    activeTab: (state) => state.window.activeTab,
    activePort: (state) => state.window.activePort,
}

export const { changeActiveTab, changePortName } = windowSlice.actions;

export default windowSlice.reducer;