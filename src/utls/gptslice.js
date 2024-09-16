import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showgptsearch :false,
    },
    reducers:{
        togglegptsearchview:(state) =>{
            state.showgptsearch = !state.showgptsearch;
        },
    },

});
export const {togglegptsearchview} = gptSlice.actions;
export default gptSlice.reducer;