import React, { useEffect } from 'react'
import Sitem  from './ItemNewPost'
import { useAppSelector,useAppDispatch } from '../../store/hook'
import { getNewPost } from '../../store/features/post/postSilce'

const NewPost = () => {
    const { newPosts } = useAppSelector(state => state.post)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getNewPost())
    }, [])

    return (
        <div className='w-full bg-white rounded-md p-4' >
            <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map(item => {
                    return (
                        <Sitem
                            key={item.id}
                            id = {item.id}
                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={JSON.parse(item.images.image)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default NewPost