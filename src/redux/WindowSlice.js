import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: "0"
}

export const windowSlice = createSlice({
    name: "window",
    initialState: initialState,
    reducers: {
        changeActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
    }
})


export const windowSlectors = {
    activeTab: (state) => state.window.activeTab
}

export const { changeActiveTab } = windowSlice.actions;

export default windowSlice.reducer;