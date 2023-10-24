import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import icons from '../../utils/icons';
import { logout } from '../../store/features/auth/authSilce';

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin,AiOutlineLogout } = icons

const activeStyle = 'hover:bg-white flex items-center gap-2 py-2 font-bold bg-white px-4'
const notActiceStyle = 'hover:bg-white flex items-center gap-2 py-2 cursor-pointer px-4'

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentData } = useAppSelector(state => state.user)
    const userId = currentData.id?.toString()
    console.log(currentData)
    const handleLogout = () =>{
        dispatch(logout())
        setTimeout(function(){
            navigate("/")
        },1000)
    }
    return (
    <div className='w-[256px] h-screen fixed flex-none flex flex-col gap-1 bg-[#f3f3f3]'>
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex items-center gap-4'>
                <img src={currentData.avatar ? JSON.parse(currentData.avatar) : require("../../asset/images/anon-avatar.png")} alt="avatar" className='w-12 h-12 object-cover rounded-full border-2 border-white' />
                <div className='flex flex-col justify-center'>
                    <span className='font-semibold'>{currentData?.name}</span>
                    <small>{currentData?.phone}</small>
                </div>
            </div>
            {/* <span >Mã thành viên: <small className='font-medium'>{userId?.match(/\d/g).join('')?.slice(0, 6)}</small></span> */}
            <span >Mã thành viên: <small className='font-medium'>{userId?.slice(0, 8)}</small></span>
        </div>
        <div>
            <NavLink
                className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                key="1"
                to="/he-thong/tao-moi-bai-dang"
            >
                <ImPencil2 />
                Đăng tin cho thuê
            </NavLink>

            <NavLink
                className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                key="2"
                to="/he-thong/quan-ly-bai-dang"
            >
                <MdOutlineLibraryBooks />
                Quản lý tin đăng
            </NavLink>

            <NavLink
                className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                key="3"
                to="/he-thong/sua-thong-tin-ca-nhan"
            >
                <BiUserPin />
                Sửa thông tin cá nhân
            </NavLink>

            <NavLink
                className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                key="4"
                to="/he-thong/lien-he"
            >
                <BiUserPin />
                Liên hệ
            </NavLink>

            <span onClick={() => handleLogout() } className={notActiceStyle}><AiOutlineLogout />Thoát</span>
        </div>
    </div>
    );
};

export default Sidebar;