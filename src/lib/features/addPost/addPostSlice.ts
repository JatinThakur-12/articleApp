import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    value:{
        isOpen: false,
    }
}
export const addPostPopupSlice = createSlice({
    name:"addPostPopup",
    initialState,
    reducers:{
        openPopUp: (state)=>{
            state.value.isOpen = true;
        },
        closePopUp: (state)=>{
            state.value.isOpen = false;
        }
        
    }
})

export const {openPopUp,closePopUp} = addPostPopupSlice.actions;

export default addPostPopupSlice.reducer;

