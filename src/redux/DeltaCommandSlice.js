import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    position: {
        x: 0,
        y: 0,
        z: 900,
    },
    tilting: {
        phi: 0,
        theta: 0
    },
    previousXYPostions: [{ x: 0, y: 0 }]
}

export const deltaCommandSlice = createSlice({
    name: "deltaCommand",
    initialState: initialState,
    reducers: {
        changePosition: (state, action) => {
            const { x, y, z } = action.payload;

            state.previousXYPostions.push({ x, y });
            state.position = {...state.position, x, y, z };
        },
        changeTilting: (state, action) => {
            state.tilting = {...state.tilting, ...action.payload};
        },
        clearPreviousXYPositions: (state, action) => {
            state.previousXYPostions = [{ x: state.position.x, y: state.position.y }];
        }
    }
});


export const deltaSelectors = {
    postion: (state) => state.deltaCommand.position,
    tilting: (state) => state.deltaCommand.tilting,
    previousXYPostions: (state) => state.deltaCommand.previousXYPostions,
}

export const { changePosition, changeTilting, addPreviousXYPosition, clearPreviousXYPositions } = deltaCommandSlice.actions;

export default deltaCommandSlice.reducer;