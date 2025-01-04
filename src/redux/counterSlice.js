import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },
        reset: (state) => {
            state.value = 0;
        },
    },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
