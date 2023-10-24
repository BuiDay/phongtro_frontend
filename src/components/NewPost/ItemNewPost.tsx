import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { Id } from '@reduxjs/toolkit/dist/tsHelpers'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/formatVietnameseToString'

interface IProps{
    id?:string,
    title?:string,
    price?:number,
    image?:string[],
    createdAt?:Date,
}

const Sitem:React.FC<IProps> = ({ title, price, image, createdAt,id }) => {

    const formatTime = (createdAt:Date) => {
        return moment(createdAt).fromNow()
    }

    const styles = `
        .item__newPost{
            border-bottom: 1px solid #c7c3c3;
        }
        .item__newPost:last-child{
            border:none;
        }
    `

    return (
        <>
        <style>{styles}</style>
        <Link className='w-full flex items-center gap-2 py-2 item__newPost' 
        to={`/chi-tiet/${formatVietnameseToString(title||"not found")}/${id}`}
        >
            <img
                src={image && image[0]}
                alt="anh"
                className='w-[65px] h-[65px] object-cover flex-none rounded-md'
            />
            <div className='w-full flex-auto flex flex-col justify-between gap-1'>
                <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0, 45)}...`}</h4>
                <div className=' flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-300'>{createdAt && formatTime(createdAt)}</span>
                </div>
            </div>
        </Link>
        </>
    )
}

export default memo(Sitem)