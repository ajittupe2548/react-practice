import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import counterSlice from "./counterSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        counter: counterSlice,
    },
});

export default store;
