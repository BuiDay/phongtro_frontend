import React from 'react';
import { text } from '../../utils/constant'
import { Search,Province,List} from '../../components/index'
import { useAppSelector} from '../../store/hook'
import Pagination from '../../components/Pagination/Pagination';
import ItemSidebar from '../../components/ItemSidebar/ItemSidebar';
import NewPost from '../../components/NewPost/NewPost';

const HomePage = () => {
    const {categories,areas,prices} = useAppSelector(state => state.app)
    return (
        <div className='w-full flex flex-col gap-3'>
            <Search />
            <div>
                <h1 className='text-[22px] md:text-[28px] font-bold leading-7' >{text.HOME_TITLE}</h1>
                <p className='text-sm text-justify md:text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-full rounded-xl overflow-hidden xl:w-[70%] '>
                    <List/>
                    <Pagination />
                </div>
                <div className='hidden xl:w-[30%] xl:flex xl:flex-col xl:gap-4 xl:justify-start xl:items-center'>
                    <ItemSidebar content={categories} title='Danh sách cho thuê' />
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                    <NewPost />
                </div>
            </div>
        </div>
    );
};

export default HomePage;