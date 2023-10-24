import React, { useEffect } from 'react';
import Button from '../Button/Button';
import { useSearchParams } from 'react-router-dom';
import { getPostLimit } from '../../store/features/post/postSilce';
import { useAppSelector, useAppDispatch } from '../../store/hook'
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

interface IProps{
    categoryCode?:any
}

export interface IPost{
    address?:string,
    attributes?:any
    description?:string,
    id?:string,
    images?:string[]
    star?:number
    title?:string,
    user?:any
}

interface IPosts{
   posts?:IPost[];
}

const List:React.FC<IProps> = ({ categoryCode }) => {
    const dispatch = useAppDispatch()
    const [searchParams]:any= useSearchParams()
    const posts:IPosts = useAppSelector(state => state.post.posts) as IPosts
    const {isLoading} = useAppSelector(state => state.post)
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject:any = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        dispatch(getPostLimit(searchParamsObject))
    }, [searchParams, categoryCode])

  
    
    return (
        <div className='w-full bg-white shadow-md rounded-md'>
            <div className='flex flex-wrap items-center justify-between p-3'>
                <h4 className='text-lg md:text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: 12:05 25/08/2022</span>
            </div>
            <div className='flex items-center gap-2 my-2 px-3 '>
                <span>Sắp xếp:</span>
                <Button bgColor='bg-gray-200' text='Mặc định' py="py-1"/>
                <Button bgColor='bg-gray-200' text='Mới nhất' py="py-1"/>
            </div>
            <div className={`items ${ isLoading && isLoading ? "" : "p-3 md:py-5 md:px-3"}`}>
                {
                   isLoading && !isLoading ? <div className='flex justify-center'> <Loading /> </div> : 
                    <>
                        {
                            posts instanceof Array && posts?.length > 0 ? posts?.map(item => {
                                return (
                                    <Item
                                        key={item?.id}
                                        address={item?.address}
                                        attributes={item?.attributes}
                                        description={JSON.parse(item?.description)}
                                        images={JSON.parse(item?.images?.image)}
                                        star={+item?.star}
                                        title={item?.title}
                                        user={item?.user}
                                        id={item?.id}
                                    />
                                )
                            }):
                            (
                                <h1 className='text-center py-4 text-xl'>Không tìm ra kết quả</h1>
                            )
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default List;