import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    DatafrenchInfo: {
        "title": "ECdfafaa API",
        "description": "EC API is a simple API for e-commerce",
        "version": "1.0.0",
        "newPoint": "Trouver un point de charge",
        "AjouterPoint": "Listez votre point de charge",
        "addPoint": "Bonjour",
        "MapPage": "Hello",
        "SigninPoint": "Se connecter",
        "TitleText": "Decouvrez, reservez et partager l energie",
        "ContentText": "Description de l aplicattion",
        "MapDescription": "Trouvez un point de charge power charge spot facilite la charge de votre vehicule electronique et le maintient pret a partir. avec notre plateforme, votre pouvez decouvrir le chargeur le plus proche: localisez les points de charge a proximite de votre emplacement. Reservez a L avance : securisez votreemplacements de charge pour eviter les temps d attente. Obtenez la disponibilite en temps reel: voir quels points de charge sont disponibles.",
        "ChargePoint": "Trouver un point de charge",
        "PlayStoreBtn": "Play Store",
        "AppStoreBtn": "App Store",}  // Ensure DataInfo is an array or the expected structure
};

export const homeSliceFrench = createSlice({
    name: 'dataFrench',
    initialState,
    reducers: {
        setDataFrenchInfo: (state, action) => {
            state.DatafrenchInfo = action.payload;
        }
    }
});

export const selectData = createSelector(
    (state) => state.data,
    (substate) => substate.DatafrenchInfo
);


export const { setDataFrenchInfo } = homeSliceFrench.actions;

export default homeSliceFrench.reducer;
