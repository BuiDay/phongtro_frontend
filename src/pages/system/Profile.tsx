import React, { useEffect, useState,memo } from 'react';
import InputReadOnly from '../../components/Address/InputReadOnly';
import InputFormV2 from '../../components/InputFormV2/InputFormV2';
import { Button } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { apiUploadImages } from '../../store/features/post/postService';
import Loading from '../../components/Loading/Loading';
import { apiUpdateUser } from '../../store/features/user/userService';
import Swal from 'sweetalert2';
import { apiGetCurrent } from '../../store/features/user/userSilce';

interface IPayload{
    userId: string,
    id: string;
    name: string  
    phone: string;
    zalo: string ;
    fbUrl: string ;
    avatar: string;
}

const Profile = () => {
    const dispatch = useAppDispatch();
    const { currentData } = useAppSelector(state => state.user)

    const [payload, setPayload] = useState<IPayload>({
        userId: "",
        id:"",
        name:"",
        phone:"",
        zalo: "",
        fbUrl:"" ,
        avatar:"",
    })
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        if(currentData)
        setPayload({
            userId:currentData.id ? currentData.id : "",
            id:currentData.id ? currentData.id?.slice(0,8) : "",
            name: currentData.name ? currentData.name : "",
            phone: currentData.phone ? currentData.phone : "",
            zalo: currentData.zalo ? currentData.zalo : "",
            fbUrl: currentData.fbUrl ? currentData.fbUrl : "",
            avatar: currentData.avatar ? currentData.avatar : "",
        })
    },[currentData])

    const handleFiles = async (e:React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        setIsLoading(true)
        let images:string = ""
        let files:any = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', "iluh9gnx")
            let response:any = await apiUploadImages(formData)
            if (response.status === 200) images = response.data?.secure_url
        }
        setIsLoading(false)
        console.log(images)
        setPayload(prev => ({ ...prev, avatar: JSON.stringify(images)}))
    }

    const handleSubmit = async() => {
        const res:any = await apiUpdateUser(payload)
        if(res.err === 0){
            Swal.fire({
                title: "Thành công",
                text: "Bạn đã cập nhật thông tin thành công",
                icon: "success",
                confirmButtonText: "OK",
            }).then(function () {
                dispatch(apiGetCurrent())
            });
        }else{
            Swal.fire({
                title: "Lỗi",
                text: "Bạn đã cập nhật thông tin không thành công",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    }


    return (
        <div className='px-6'>
            <div className='border-b border-gray-200 flex items-center justify-between mb-10'>
                <h1 className='text-3xl font-medium py-4'>Thông tin cá nhân</h1>
            </div>
            <div className='w-3/5 py-6 flex flex-col gap-4 m-auto'>
                <InputReadOnly direction='flex-row items-center' label="Mã thành viên" value={payload.id}/>
                <InputReadOnly direction='flex-row items-center' label="Số điện thoại" value= {payload.phone}/>
                <InputFormV2 direction='flex-row items-center' label='Tên hiển thị' value= {payload.name} setValue = {setPayload} name='name'/>
                {/* <InputFormV2 direction='flex-row items-center' label='Email' value= {payload.}/> */}
                <InputFormV2 direction='flex-row items-center' label='Zalo'  value= {payload.zalo} setValue = {setPayload} name='zalo'/>
                <InputFormV2 direction='flex-row items-center' label='Facebook'  value= {payload.fbUrl} setValue = {setPayload} name='fbUrl'/>
                <div className='flex'>
                    <label htmlFor="password" className='w-48 font-medium'>Mật khẩu</label>
                    <small className='flex-auto text-blue-500 cursor-pointer'>Đổi mật khẩu</small>
                </div>
                <div className='flex items-center'>  
                    <label className='w-48 font-medium'>Ảnh đại diện</label>
                    <img src={payload.avatar ? JSON.parse(payload.avatar) : require("../../asset/images/anon-avatar.png")} className='w-[70px] h-[70px] rounded-full mr-6' alt="" />
                    <input onChange={(e)=>handleFiles(e)} type="file" id='file'/>
                    {
                        isLoading && 
                        <div className='ml-4'>
                            <Loading height='40px' width='40px'/>
                        </div>  
                    }

                </div>
                <Button text="Cập nhật" bgColor='bg-blue-500' textColor='text-white' onClick={()=>handleSubmit()} />
            </div>
           
        </div>
    );
}; 

export default memo(Profile);