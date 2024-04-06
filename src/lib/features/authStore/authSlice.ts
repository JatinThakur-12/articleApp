import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{
        status: false,
        id: ""
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.value.status = true;
            state.value.id = action.payload._id
        },
        logout: (state) => {
            state.value.status = false;
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;