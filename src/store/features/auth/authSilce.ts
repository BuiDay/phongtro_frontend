import { createSlice, createAsyncThunk, createAction, PayloadAction, Reducer, AsyncThunkAction } from "@reduxjs/toolkit"
import { IAuth} from "../InterfaceReducer";
import authService from "./authService";
import { IAuthRegister,IAuthLogin } from '../InterfaceReducer'

const initState:IAuth = {
    isLoggedIn : false,
    token:"",
    msg:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
}

export const register:any = createAsyncThunk("auth/register",async(data:IAuthRegister,thunkAPI)  =>{
    try{
        return await authService.apiRegister(data)
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const login:any = createAsyncThunk("auth/login",async(data:IAuthLogin,thunkAPI)  =>{
    try{
        return await authService.apiLogin(data)
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const logout:any = createAsyncThunk("auth/logout",async(data,thunkAPI)  =>{
    try{
        return 1
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(register.pending,(state:IAuth)=>{
            state.isLoading = true;
            
        })
        .addCase(register.fulfilled,(state:IAuth,action:PayloadAction<IAuth>)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = false;
            state.msg = action.payload.msg ;
        })
        .addCase(register.rejected,(state:IAuth,action:PayloadAction<IAuth>)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isLoggedIn = false;
            state.isError = true;
            state.msg = action.payload.msg;
        })

        .addCase(login.pending,(state:IAuth)=>{
            state.isLoading = true;
        })
        .addCase(login.rejected,(state:IAuth,action:PayloadAction<IAuth>)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.isLoggedIn = false;
            state.msg = action.payload.msg ;
            state.token = undefined;
        })
        .addCase(login.fulfilled,(state:IAuth,action:PayloadAction<IAuth>)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.msg = action.payload.msg ;
            state.token = action.payload.token;
        })
      
        .addCase(logout.fulfilled,(state:IAuth)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = false;
            state.token = undefined;
        })
    },
})


export default authSlice.reducer;