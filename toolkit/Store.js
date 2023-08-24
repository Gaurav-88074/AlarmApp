import { configureStore } from "@reduxjs/toolkit";
import buttonSlice from "./ButtonSlice";
import dataSlice from "./DataSlice";
import intervalSlice from "./IntervalSlice";
import loadingSlice from "./LoadingSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        buttonReducer: buttonSlice.reducer,
        dataReducer : dataSlice.reducer,
        intervalReducer: intervalSlice.reducer,
        loadingReducer : loadingSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});
export default store;
