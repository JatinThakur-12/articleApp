import { createSlice } from "@reduxjs/toolkit";
import authSlice from "../authStore/authSlice";

const initialState = {
    value:[{}]
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPosts: (state,action)=>{
            state.value = action.payload;
        }
    }
})

export const {addPosts} = postSlice.actions;
export default postSlice.reducer;
