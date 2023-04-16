import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import goalReducer from '../slices/goals/goalSlice'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        goals : goalReducer
    }
})