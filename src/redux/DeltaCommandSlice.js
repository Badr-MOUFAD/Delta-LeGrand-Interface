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
    }
}

export const deltaCommandSlice = createSlice({
    name: "deltaCommand",
    initialState: initialState,
    reducers: {
        changePosition: (state, action) => {
            state.position = {...state.position, ...action.payload};
        },
        changeTilting: (state, action) => {
            state.tilting = {...state.tilting, ...action.payload};
        }
    }
});


export const deltaSelectors = {
    postion: (state) => state.deltaCommand.position,
    tilting: (state) => state.deltaCommand.tilting,
}

export const { changePosition, changeTilting } = deltaCommandSlice.actions;

export default deltaCommandSlice.reducer;