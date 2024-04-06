import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{
        status: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state) => {
            state.value.status = true;
        },
        logout: (state) => {
            state.value.status = false;
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;