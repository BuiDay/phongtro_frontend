import React, { useState,useEffect } from 'react';
import {InputForm,Button} from "../../components"
import {useDispatch, useSelector} from 'react-redux'
import { validatePhone } from '../../utils/validateForm';
import { Link,useNavigate  } from 'react-router-dom';
import { login } from '../../store/features/auth/authSilce';
import { useAppSelector, useAppDispatch } from '../../store/hook'

export interface IParamsLogin{
    phone?:string,
    password?:string
}

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate ();
    const authState = useAppSelector(state=>state.auth);
    const [validate, setValidate] = useState<IParamsLogin>({
        phone:"",
        password:""
    })
    const [params, setParams] = useState<IParamsLogin>({
        phone:"",
        password:""
    })
  
    const handlError = (text:string) =>{
        if(text === "Password is wrong!") return "Mật khẩu không đúng!"
        if(text === "Phone number is not found!") return "Không tìm thấy số điện thoại!"
        if(text === "Register is successfull") return ""
        if(text === "Login is successfull") return ""
        return text
    }
    const handleSubmit = ():void =>{
        setValidate({
            phone:"",
            password:""
        })
       if(!params.password || !params.phone){
            setValidate({
                phone:params.phone ? "" : "Vui lòng không để trống trường này!",
                password:params.password ? "" : "Vui lòng không để trống trường này!"
            })
       }else{
            if(!validatePhone(params.phone)){
                setValidate({
                    phone:validatePhone(params.phone)?"":"Số điện thoại không hợp lệ!"
            })
            }else{
                dispatch(login(params));
            }
        }
    }

    const handleOnKeyDown = (e:any) =>{
        if(e.keyCode===13){
            handleSubmit()
        }
    }

    useEffect(()=>{
        if(authState.isLoggedIn){
            navigate("/")
        }
    },[authState.isLoggedIn])
    return (
        <div className='bg-white w-[600px] mt-10 p-[30px] pb-[100px] rounded-md shadow-sm'>
            <h3 className='font-semibold text-2xl mb-3'>Đăng nhập</h3>
            <div className='flex flex-col gap-3 w-full'>
                <div>
                    <InputForm label={"Số điện thoại"} type={"text"} value={params.phone} setVaule={setParams} typeParams='phone' onKeyDown={(e:any)=>handleOnKeyDown(e)}/>
                    <div className='text-[red] text-sm'>{validate.phone}</div>
                </div>
                <div>
                    <InputForm label={"Mật khẩu"} type={"password"} value={params.password} setVaule={setParams} typeParams='password' onKeyDown={(e:any)=>handleOnKeyDown(e)}/>
                    <div className='text-[red] text-sm'>{validate.password}</div>
                </div>
                <Button 
                    text={"Đăng nhập"}
                    bgColor='bg-secondary'
                    textColor='text-white'
                    fullWidth
                    onClick={()=>{handleSubmit()}}
                />
            <div className='text-[red] text-sm'>{handlError(authState.msg)}</div>
            </div>
            <div className='flex justify-between items-center mt-7'>
                <span className='text-sm hover:text-[red] cursor-pointer text-[blue]'>Bạn đã quên mật khẩu?</span>
                <Link to="/register" className='text-sm hover:text-[red] cursor-pointer text-[blue]'>Tạo tài khoản mới</Link>
            </div>
        </div>
    );
};

export default Login;