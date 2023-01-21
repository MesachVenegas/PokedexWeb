import { configureStore } from "@reduxjs/toolkit";
import { userName } from "./slices/user.slice";

export default configureStore({
    reducer: {
        userName
    }
})