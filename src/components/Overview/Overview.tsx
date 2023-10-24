import React, { Dispatch, SetStateAction } from 'react';
import Select from '../Select/Select';
import { useAppSelector } from '../../store/hook'
import InputFormV2 from '../InputFormV2/InputFormV2';
import { IPayloadPost } from '../../pages/system/CreatePost';
import InputReadOnly from '../Address/InputReadOnly';

interface IProps{
    payload?:any,
    setPayload:Dispatch<SetStateAction<IPayloadPost>>
}
const Overview:React.FC<IProps> = ({payload,setPayload}) => {
    const { categories } = useAppSelector(state => state.app)
    const { currentData } = useAppSelector(state => state.user)
    const targets = [
        { code: 'Tất cả', value: 'Tất cả'},
        { code: 'Nam', value: 'Nam' },
        { code: 'Nữ', value: 'Nữ' },
    ]
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-1/2'>
                    <Select value={payload.categoryCode} setValue={setPayload} name='categoryCode' options={categories} label='Loại chuyên mục' />
                </div>
                    <InputFormV2 value={payload.title} setValue={setPayload} name='title' label='Tiêu đề' />
                <div className='flex flex-col gap-2'>
                    <label htmlFor="desc">Nội dung mô tả</label>
                    <textarea
                        id="desc"
                        cols={30} 
                        rows={10}
                        className='w-full rounded-md outline-none border border-gray-300 p-2'
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value}))}
                    ></textarea>
                </div>
                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly label='Thông tin liên hệ' value={currentData?.name || " "} />
                    <InputReadOnly label='Điện thoại' value={currentData?.phone} />
                    <InputFormV2 value={payload.priceNumber} setValue={setPayload} small='Nhập số chia 1 triệu, ví dụ 1,1 triệu thì nhập là 1,1' label='Giá cho thuê' unit='đồng' name='priceNumber' />
                    <InputFormV2 value={payload.areaNumber} setValue={setPayload} name='areaNumber' label='Diện tích' unit='m2' />
                    <Select value={payload.target} setValue={setPayload} name='target' options={targets} label='Đối tượng cho thuê' />
                </div>
            </div>
        </div>
    );
};

export default Overview;