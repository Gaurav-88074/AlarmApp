import { configureStore } from "@reduxjs/toolkit";
import buttonSlice from "./ButtonSlice";
import dataSlice from "./DataSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        buttonReducer: buttonSlice.reducer,
        dataReducer : dataSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});
export default store;
