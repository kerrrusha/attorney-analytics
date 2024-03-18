import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice";
import {analyticsSlice} from "./slices/analyticsSlice";

const store = configureStore({
   reducer: {
       auth: authSlice.reducer,
       analytics: analyticsSlice.reducer,
   }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
