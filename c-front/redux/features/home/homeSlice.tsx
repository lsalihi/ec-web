import { createSelector, createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    DataInfo: {
        "title": "EC API",
        "description": "EC API is a simple API for e-commerce",
        "version": "1.0.0",
        "newPoint": "Found A Charging Point",
        "addPoint": "List Your Charging Point",
        "MapPage": "location",
        "SigninPoint": "Hello, identify yourself",
        "TitleText": "Discover,reserve, charge and Share Power",
        "ContentText": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea quod neque dolores ad quo nam eius eum est natus nisi porro nobis aliquid tempore illo corporis, totam officia dolor!",
        "MapDescription": "find a Charging Point Power Charge Spot makes it easy to keep you electric vehicle charged and ready to go.with our platform, you can.Discover Nearby Chargers: Locate charging points conveniently close to your location.Reserve in Advance: Secure your charging slot to avoid waiting times.Get Real- Time Availability: See which charging points are available right now.Start you journey with a fully charged battery.Find your nearest charging point today!",
        "ChargePoint": "found a charge point",
        "PlayStoreBtn": "Play Store",
        "AppStoreBtn": "App Store",}  // Ensure DataInfo is an array or the expected structure
};

export const homeSlice = createSlice({
    name: 'dataEnglish',
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
