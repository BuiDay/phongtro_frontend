import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit"
import { IAppPayload, Iapp } from "../InterfaceReducer";
import appService from './appService'


const initState:Iapp = {
    msg: '',
    isLoading:true,
    categories: [],
    prices: [],
    areas: [],
    provinces:[],
}



export const getCategories:any = createAsyncThunk("app/get-categories",async(data,thunkAPI)=>{
    try{
        return await appService.apiGetCategories()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const apiGetPrices:any = createAsyncThunk("app/get-price",async(data,thunkAPI)=>{
    try{
        return await appService.apiGetPrices()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const apiGetAreas:any = createAsyncThunk("app/get-area",async(data,thunkAPI)=>{
    try{
        return await appService.apiGetAreas()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const apiGetProvinces:any = createAsyncThunk("app/get-provinces",async(data,thunkAPI)=>{
    try{
        return await appService.apiGetProvinces()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})



export const appSlice = createSlice({
    name:"app",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getCategories.pending,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.isLoading = true;
        })
        .addCase(getCategories.fulfilled,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.msg = action.payload.msg;
            state.categories = action.payload.response;
            state.isLoading = false;
        })

        .addCase(apiGetPrices.fulfilled,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.msg = action.payload.msg;
            state.prices = action.payload.response;
            state.isLoading = false;
        })
        .addCase(apiGetPrices.pending,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.isLoading = true;
        })

        .addCase(apiGetAreas.fulfilled,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.msg = action.payload.msg;
            state.areas = action.payload.response;
            state.isLoading = false;
        })
        .addCase(apiGetAreas.pending,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.isLoading = true;
        })

        .addCase(apiGetProvinces.fulfilled,(state:Iapp,action:PayloadAction<IAppPayload>)=>{
            state.msg = action.payload.msg;
            state.provinces = action.payload.response;
            state.isLoading = false;
        })
        .addCase(apiGetProvinces.pending,(state:Iapp)=>{
            state.isLoading = true;
        })
    },
})

export default appSlice.reducer;