import React, { useEffect, useState } from 'react';
import InputForm from "../../components/InputForm/InputForm"
import Button from '../../components/Button/Button'
import { path } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import {register} from '../../store/features/auth/authSilce'
import { validatePassword, validatePhone } from '../../utils/validateForm';
import { useAppSelector, useAppDispatch } from '../../store/hook'


export interface IParamsRegister{
    name?:string,
    phone?:string,
    password?:string
}

const Register = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(state=>state.auth);
    const navigate = useNavigate ();

    const [params, setParams] = useState<IParamsRegister>({
        name:"",
        phone:"",
        password:""
    })

    const [validate, setValidate] = useState<IParamsRegister>({
        name:"",
        phone:"",
        password:""
    })

    const handlError = (text:string) : string =>{
        if(text === "Phone number has been already used!") return "Số điện thoại này đã tồn tại"
        if(text === "Register is successfull") return ""
        if(text === "Login is successfull") return ""
        return text
    }

    const handleSubmit = () :void =>{
        setValidate({
            name:"",
            phone:"",
            password:""
        })
       if(!params.password || !params.phone || !params.name ){
            setValidate({
                name:params.name ? "" : "Vui lòng không để trống trường này!",
                phone:params.phone ? "" : "Vui lòng không để trống trường này!",
                password:params.password ? "" : "Vui lòng không để trống trường này!"
            })
       }else{
            if(!validatePassword(params.password) || !validatePhone(params.phone)){
                setValidate({
                    password:validatePhone(params.password)?"":"Mật khẩu cần có chữ hoa, kí tự đặc và chữ số!",
                    phone:validatePhone(params.phone) ? "" : "Số điện thoại không hợp lệ!"})
            }else{
             dispatch(register(params))
            }
        }
    }
    useEffect(()=>{
        if(authState.msg === "Register is successfull"){
            navigate("/login")
        }
    },[authState.msg])
 
    return (
        <div className='bg-white w-[600px] mt-10 p-[30px] pb-[100px] rounded-md shadow-sm'>
        <h3 className='font-semibold text-2xl mb-3'>Tạo tài khoản</h3>
        <div className='flex flex-col gap-3 w-full'>
            <div>
                <InputForm label={"Họ tên"} type={"text"} value={params.name} setVaule={setParams} typeParams='name'/>
                <div className='text-[red] text-sm'>{validate.name}</div>
            </div>
            <div>
                <InputForm label={"Số điện thoại"} type={"text"} value={params.phone} setVaule={setParams} typeParams='phone'/>
                <div className='text-[red] text-sm'>{validate.phone}</div>
            </div>
            <div>
                <InputForm label={"Mật khẩu"} type={"password"} value={params.password} setVaule={setParams} typeParams='password'/>
                <div className='text-[red] text-sm'>{validate.password}</div>
            </div>
            
            <Button 
                text={"Tạo tài khoản"}
                bgColor='bg-secondary'
                textColor='text-white'
                fullWidth
                onClick={handleSubmit}
            />
            <div className='text-[red] text-sm'>{handlError(authState.msg)}</div>
        </div>
       <div className='mt-5'>
        <p className='text-sm'>
            Bấm vào nút đăng kí tức là bạn đã đồng ý với 
            <span className='text-[blue] cursor-pointer hover:text-[red]'> quy định sử dụng </span>của chúng tôi
        </p>
        <p className='text-sm'>Bạn đã có tài khoản? <span className='text-[blue] cursor-pointer hover:text-[red]'><Link to={`/`+path.LOGIN}>Đăng nhập ngay</Link></span></p>
       </div>
    </div>
    );
};

export default Register;