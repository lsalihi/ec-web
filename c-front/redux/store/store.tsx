import { configureStore } from '@reduxjs/toolkit';
import { homeSlice } from './../features/home/homeSlice';

const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
