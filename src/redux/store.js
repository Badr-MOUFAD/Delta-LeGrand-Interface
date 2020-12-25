import { configureStore } from '@reduxjs/toolkit';
import deltaCommandReducer from './DeltaCommandSlice';


export default configureStore({
    reducer: {
        deltaCommand: deltaCommandReducer
    }
})