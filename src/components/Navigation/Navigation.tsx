import React, { useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/formatVietnameseToString'
import { RootState } from "../../store/redux";
import { useAppSelector } from '../../store/hook'
interface Icate{
    code?:string,
    header?:string,
    id?:string,
    subheader?:string,
    value?:string,
}

interface IProps{
    isAdmin?:boolean
}

const Navigation:React.FC<IProps> = ({ isAdmin }) => {
    const categories  = useAppSelector((state:RootState) => state.app.categories)
    return (
        <div className={`hidden md:w-full ${isAdmin ? 'md:justify-start fixed' : 'md:justify-center'} md:h-[40px] md:px-[15px] bg-secondary md:flex md:items-center text-white `}>
            <div className='w-1100 h-full items-center flex text-sm font-medium'>
                    <div className='h-full'>
                        <NavLink
                            style={{display:"block", height:"100%",padding:"0 12px",lineHeight:"40px"}}
                            to="/"
                            className={({isActive})=>isActive ? "bg-secondary2" : "hover:bg-secondary2"}
                        >
                            Trang chủ
                        </NavLink>
                     </div>
                    {
                    categories && categories?.length > 0 && categories.map((item:Icate, index:number)=>{
                       return(
                            <div key={index} className='h-full'>
                                <NavLink
                                    style={{display:"block", height:"100%",padding:"0 12px",lineHeight:"40px"}}
                                    to={`/${formatVietnameseToString(item.value || " ")}`}
                                    className={({isActive})=>isActive ? "bg-secondary2" : "hover:bg-secondary2"}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                       )
                    })
                }
            </div>
        </div>
    );
};

export default Navigation;