import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {path} from '../../utils/constant'
import Button from '../../components/Button/Button';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { logout } from '../../store/features/auth/authSilce';
import icons from '../../utils/icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin,AiOutlineLogout,VscMenu } = icons

const Header= () => {
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(state=>state.auth);
    const {currentData,error} = useAppSelector(state => state.user);
    const [isShowMenu, setIsShowMenu] = useState(false)
    const refBtn = useRef<any>(null)
    const handleLogout = ():void =>{
        dispatch(logout())
    }
    console.log(isLoggedIn)
    const handleDropdown = (e:any) =>{
        if(refBtn.current){
            setIsShowMenu(refBtn.current.contains(e.target))
            // if(refBtn.current.contains(e.target)){
            //     console.log(1) 
            // }
        }
    }

    useEffect(()=>{
        if(error?.toString()==="1"){
            dispatch(logout())
        }
    },[error])

    console.log(error)

    useEffect(()=>{
       if(isShowMenu){
        document.addEventListener("click",handleDropdown)
       }
       return ()=>  document.removeEventListener("click",handleDropdown)
    },[isShowMenu])
 
    return (
        <div className='max-w-[1100px] h-[60px] md:h-[70px] m-auto flex items-center justify-between xl:px-[0px] px-[15px]'>
            <div>
                <Link to="/"> 
                    <img src={require('../../asset/images/logo-removebg-preview.png')} alt="logo" className='md:w-[240px] md:h-[60px] h-[50px] object-contain'/>
                
                </Link>
            </div>
            <div className='md:hidden'>
                <VscMenu size={30} />
            </div>
            {
                isLoggedIn ? <>
                    <div className='hidden md:flex md:items-center md:gap-2'>
                        <img src={currentData?.avatar && JSON.parse(currentData?.avatar) || "images/anon-avatar.png"} alt="avatar" className='w-10 object-cover rounded-full h-10 border-2 shadow-md border-white' />
                        <div className='flex flex-col'>
                            <span>Xin chào, <span className='font-semibold'>{currentData?.name}</span></span>
                            <span>Mã tài khoản: <span className='font-medium'>{`${currentData?.id?.slice(0, 8)}`}</span></span>
                        </div>
                        <div className='relative' >
                            <div ref={refBtn} onClick={(e)=>{handleDropdown(e)}}>
                                <Button  text="Quản lí tài khoản" textColor="text-white" bgColor = "bg-[#3961fb]"/>
                            </div>
                            {isShowMenu  && <div className='absolute min-w-200 top-[55px] left-[-34px] bg-white shadow-md rounded-md l-0 flex flex-col'>                       
                                <Link
                                    className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 p-3'
                                    key="1"
                                    to="/he-thong/tao-moi-bai-dang"
                                >
                                    <ImPencil2 />
                                    Đăng tin cho thuê
                                </Link>
                                
                                <Link
                                    className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 p-3'
                                    key="2"
                                    to="/he-thong/quan-ly-bai-dang"
                                >
                                    <MdOutlineLibraryBooks />
                                    Đăng tin cho thuê
                                </Link>

                                <Link
                                    className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 p-3'
                                    key="3"
                                    to="/he-thong/thong-tin-tai-khoan"
                                >
                                    <BiUserPin />
                                    Thông tin tài khoản
                                </Link>
                        
                                <span
                                    className='cursor-pointer hover:text-orange-500 text-blue-500 p-3 flex items-center gap-2'
                                    onClick={() => {
                                        setIsShowMenu(false)
                                        handleLogout()
                                    }}
                                >
                                    <AiOutlineLogout />
                                    Đăng xuất
                                </span>
                            </div>}
                        </div>
                        <Button text="Đăng tin mới" textColor="text-white" bgColor = "bg-secondary2" icon={<AiOutlinePlusCircle/>}/>
                    </div>
                </>:(
                    <div className='hidden md:flex md:items-center md:gap-2'>
                        <small></small>
                        <Button text="Đăng nhập" textColor="text-white" bgColor = "bg-[#3961fb]" link={path.LOGIN}/>
                        <Button text="Đăng ký" textColor="text-white" bgColor = "bg-[#3961fb]" link={path.REGISTER}/>
                        {/* <Button text="Đăng tin mới" textColor="text-white" bgColor = "bg-secondary2" icon={<AiOutlinePlusCircle/>}/> */}
                    </div>
                )
            }
        </div>
    );
};

export default Header;