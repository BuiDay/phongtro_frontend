import React,{memo,useState } from 'react';
import icons from '../../utils/icons'
import {Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/formatVietnameseToString'
import { IPost } from '../List/List';
const indexs = [0, 1, 2, 3]

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons

const Item:React.FC<IPost> = ({ images, user, title, star, description, attributes, address, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    // const handleStar = (star:number) => {
    //     let stars:JSX.Element[] = []
    //     for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='#f39406' />)
    //     return stars

    // }
    return (
        <div className='w-full flex flex-wrap border-t border-orange-600 py-4'>
            <Link
                to={`/chi-tiet/${formatVietnameseToString(title||"not found")}/${id}`}
                className='w-full md:w-2/5 flex flex-wrap justify-center h-[242px] gap-[2px] items-center relative cursor-pointer'
            >
                { images && images.length > 0 && images.filter((i:any, index:number) => indexs.some(i => i === index))?.map((i:any, index:number) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[47%] h-[120px] object-cover' />
                    )
                })}
                <span className='bg-[gray] text-white rounded-md absolute left-3 bottom-1'>{`${images && images.length} ảnh`}</span>
                <span
                    className='text-white absolute right-5 bottom-1'
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
                </span>
            </Link>
            <div className='w-full md:w-3/5 md:pl-1 mt-3 md:mt-0'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium'>
                        <div className='flex'> 
                            {/* { star && handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                                return (
                                    <span key={number}>{star}</span>
                                )
                            })} */}
                        </div>
                        {title}
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex flex-col justify-between gap-2'>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                        <span >Diện tích: {attributes?.acreage}</span>
                    </div>
                    
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {` ${address && address.split(',')[address.split(',').length - 2]}, ${address && address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden' style={{display:"-webkit-box", WebkitLineClamp: "2",WebkitBoxOrient:"vertical",whiteSpace:"pre-wrap"}}>
                    {description}
                </p>
                <div className='flex items-center mt-3 md:my-5 justify-between'>
                    <div className='flex w-60 items-center'>
                        <img src={user?.avatar && JSON.parse(user?.avatar) || `https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png`} alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p className='ml-2'>{user?.name}</p>
                    </div>
                    <div className='flex md:flex-nowrap flex-wrap justify-end items-center gap-1 whitespace-nowrap'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white px-2 rounded-md'
                        >
                            {`Gọi ${user?.phone}`}
                        </button>
                        <button
                            type='button'
                            className='text-blue-700 px-2 rounded-md border border-blue-700'
                        >
                            Nhắn zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)