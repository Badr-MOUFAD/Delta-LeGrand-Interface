import { configureStore } from '@reduxjs/toolkit';
import deltaCommandReducer from './DeltaCommandSlice';
import windowReducer from './WindowSlice';


export default configureStore({
    reducer: {
        deltaCommand: deltaCommandReducer,
        window: windowReducer
    }
})