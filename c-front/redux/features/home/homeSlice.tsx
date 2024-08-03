import { createSelector, createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    DataInfo: { "title": "EC API",
        "description": "EC API is a simple API for e-commerce",
        "version": "1.0.0",
        "newPoint": "Found A Charging Point",
        "addPoint": "List Your Charging Point"}  // Ensure DataInfo is an array or the expected structure
};

export const homeSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataInfo: (state, action) => {
            state.DataInfo = action.payload;
        }
    }
});

// Selector to get DataInfo from the state
export const selectData = createSelector(
    (state) => state.data,
    (substate) => substate.DataInfo  
);

export const { setDataInfo } = homeSlice.actions;

export default homeSlice.reducer;
