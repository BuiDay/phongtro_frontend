import React from 'react';
import {formatVietnameseToString} from '../../utils/formatVietnameseToString'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
const { GrNext } = icons

interface IProps{
    title?:string,
    content?:any[],
    isDouble?:boolean,
    type?:string,
}

const ItemSidebar:React.FC<IProps> = ({ title, content, isDouble, type }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const formatContent = (content:any[]) => {
        const oddEl = content?.filter((item, index) => index % 2 !== 0)
        const evenEl = content?.filter((item, index) => index % 2 === 0)
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl?.find((item2, index2) => index2 === index)
            }
        })
    
        return formatContent
    }
    const handleFilterPosts = (code:string) => {
        if(type){
            navigate({
                pathname: location?.pathname,
                search: createSearchParams({
                    [type]: code,
                }).toString()
            });
        }
    }
    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold mb-4'>{title}</h3>
            {!isDouble && <div className='flex flex-col gap-2' >
                {content && content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`/${formatVietnameseToString(item.value)}`}
                            key={item.code}
                            className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                        >
                            <GrNext size={10} color='#ccc' />
                            <p>{item.value}</p>
                        </Link>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-col gap-2' >
                {content && content?.length > 0 && formatContent(content).map((item, index) => {
                    return (
                        <div key={index} className=''>
                            <div className=' flex items-center justify-around'>
                                <div
                                    onClick={() => handleFilterPosts(item.left.code)}
                                    className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                                >
                                    <GrNext size={10} color='#ccc' />
                                    <p>{type === 'areaCode' ? item.left.value+"\xb2":item.left.value}</p>
                                </div>
                                <div
                                    className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                                    onClick={() => handleFilterPosts(item.right.code)}
                                >
                                    <GrNext size={10} color='#ccc' />
                                    <p>{type === 'areaCode' ? item.right.value+"\xb2":item.right.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
};

export default ItemSidebar;