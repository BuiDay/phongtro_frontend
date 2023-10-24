import { createSlice, createAsyncThunk, createAction, PayloadAction} from "@reduxjs/toolkit"
import userService from "./userService";
import {IUser, IUserPayload } from "../InterfaceReducer";
import { useAppDispatch } from "../../hook";
import { logout } from "../auth/authSilce";


const initState:IUser = {
    currentData: {},
    error:"",
}

export const apiGetCurrent:any = createAsyncThunk("user",async(data:any,thunkAPI)  =>{
    try{
        return await userService.apiGetCurrent()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})


export const userSlice = createSlice({
    name:"user",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(apiGetCurrent.pending,(state:IUser)=>{
            state.currentData = {}
        })
        .addCase(apiGetCurrent.fulfilled,(state:IUser,action:PayloadAction<IUserPayload>)=>{
            state.currentData = action.payload.response;
        })
        .addCase(apiGetCurrent.rejected,(state:IUser,action:PayloadAction<any>)=>{
            state.currentData = {}
            state.error = action.payload.err
        })
    },
})


export default userSlice.reducer;