import { configureStore } from '@reduxjs/toolkit'
import addPostPopupReducer from './features/addPost/addPostSlice'
import authSliceReducer from './features/authStore/authSlice'
import postSliceReducer from './features/postStore/postSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
export const store = configureStore({
    reducer: {addPostPopupReducer,authSliceReducer, postSliceReducer}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector