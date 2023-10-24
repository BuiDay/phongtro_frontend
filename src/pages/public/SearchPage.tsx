import React from 'react';
import Search from '../../components/Search/Search';
import { text } from '../../utils/constant';
import Province from '../../components/Province/Province';
import { RootState } from '../../store/redux';
import { useAppSelector } from '../../store/hook';
import { List } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import ItemSidebar from '../../components/ItemSidebar/ItemSidebar';
import NewPost from '../../components/NewPost/NewPost';
import { useLocation } from 'react-router-dom';


const SearchPage = () => {
    const {categories,areas,prices} = useAppSelector((state:RootState) => state.app)
    const location = useLocation()
    return (
        <div className='w-full flex gap-4'>
        <div className='w-full flex flex-col gap-3'>
            <Search/>
            <div>
                <h1 className='text-[28px] font-bold' >{location.state?.titleSearch || 'Kết quả tìm kiếm'}</h1>
                <p className='text-base text-gray-700'>{`${location.state?.titleSearch || ''} phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[70%] rounded-xl overflow-hidden'>
                    <List/>
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSidebar content={categories} title='Danh sách cho thuê' />
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                    <NewPost />
                </div>
            </div>
        </div>
    </div>
    );
};

export default SearchPage;
