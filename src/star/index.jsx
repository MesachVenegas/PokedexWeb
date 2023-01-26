import { configureStore } from "@reduxjs/toolkit";
import userNameSlice from "./slices/user.slice";

export default configureStore({
    reducer: {
        userName: userNameSlice
    }
})