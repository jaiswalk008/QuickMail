import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import {emailSlice} from "./email";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer,
    }
})
export const authActions = authSlice.actions;
export const emailActions = emailSlice.actions;