import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./MovieSlice";
import gptReducer from "./gptslice";
import langReducer from "./configSlice";
const appStore = configureStore({
    reducer:
    {
        user:userReducer,
        movies: moviesReducer,
        gpt:gptReducer,
        config:langReducer,

    },
     
});
export default appStore;