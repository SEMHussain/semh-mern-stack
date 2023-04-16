import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from './goalServices'

const initialState = {

    goals : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk(
    'goal/createGoal',
    async (goalData , thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalServices.createGoal(goalData , token);
            // console.log(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const goalSlice = createSlice({
    name: 'Goals',
    initialState,
    reducers : {
        reset : (state)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
            state.goal = [];
        },
    },

    extraReducers : (builder)=>{
        builder
        .addCase( createGoal.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase( createGoal.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase( createGoal.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = null
            state.message = action.payload
        })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer