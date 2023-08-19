import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        name: "John",
        skills: ["js", "java"],
    },
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload;
        },
        addSkill: (state, action) => {
            state.skills.push(action.payload);
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter((item) => item !== action.payload);
        },
    },
});

export const { updateName, addSkill, removeSkill } = userSlice.actions;

export default userSlice.reducer;
