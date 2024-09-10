import { configureStore, createSlice } from '@reduxjs/toolkit';
import { homeSlice } from './../features/home/homeSlice';
import {homeSliceFrench} from './../features/home/homeSliceFrench';
import userSlice from './../features/userSlice';


const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        fr: homeSliceFrench.reducer,
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
