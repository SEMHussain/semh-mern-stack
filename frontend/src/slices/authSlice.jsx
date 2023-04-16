import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

    const user = JSON.parse(localStorage.getItem('user'))

const initialState = {

     user : user ? user : null,
     isError: false,
     isSuccess: false,
     isLoading: false,
     message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user , thunkAPI)=>{
        try {
            return await authService.register(user);
            // console.log(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user , thunkAPI)=>{
        try {
            return await authService.login(user);
            // console.log(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers : {
        reset : (state)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        },
        logOut : (state)=>{
            localStorage.removeItem('user')
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
        },
        semha : (state)=>{
            console.log(state.user);
        }
    },

    extraReducers : (builder)=>{
        builder
            .addCase( register.pending , (state)=>{
                state.isLoading = true;
            })
            .addCase( register.fulfilled , (state , action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase( register.rejected , (state , action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = null
                state.message = action.payload
            })

            .addCase( login.pending , (state)=>{
                state.isLoading = true;
            })
            .addCase( login.fulfilled , (state , action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase( login.rejected , (state , action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = null
                state.message = action.payload
            })
    }
})

export const {reset , logOut , semha } = authSlice.actions
export default authSlice.reducer