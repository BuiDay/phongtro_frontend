import React, { useEffect } from 'react';
import {Routes, Route ,BrowserRouter} from 'react-router-dom'
import './App.css';
import { Header, Home, HomePage, Login,Register,Rental } from './pages/public';
import { path } from './utils/constant';
import { useAppSelector, useAppDispatch } from './store/hook'
import { getCategories,apiGetAreas,apiGetPrices,apiGetProvinces } from './store/features/app/appSilce';
import { apiGetCurrent } from './store/features/user/userSilce';
import SearchPage from './pages/public/SearchPage';
import System from './pages/system/System';
import CreatePost from './pages/system/CreatePost';
import ManagePost from './pages/system/ManagePost';
import Profile from './pages/system/Profile';
import DetailPage from './pages/public/DetailPage';

function App() {
  const dispatch = useAppDispatch();
  const {isLoggedIn} = useAppSelector(state=>state.auth);
  useEffect(() => {
      dispatch(getCategories())
      dispatch(apiGetAreas())
      dispatch(apiGetPrices())
      dispatch(apiGetProvinces())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(apiGetCurrent())
    }, 1000)
  }, [isLoggedIn])

  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home/>}>
          <Route path={path.HOME} element = {<HomePage/>}/>
          <Route path={path.SEARCH} element = {<SearchPage/>}/>
          <Route path={path.LOGIN} element = {<Login/>}/>
          <Route path={path.REGISTER} element = {<Register/>} />
          <Route path={path.CHO_THUE_CAN_HO} element = {<Rental id={1}/>} />
          <Route path={path.CHO_THUE_MAT_BANG} element = {<Rental id={2}/>} />
          <Route path={path.CHO_THUE_PHONG_TRO} element = {<Rental id={3}/>} />
          <Route path={path.NHA_CHO_THUE} element = {<Rental id={4}/>} />
          <Route path={path.DETAIL} element = {<DetailPage/>} />
        </Route>
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
  </div>
  );
}

export default App;
