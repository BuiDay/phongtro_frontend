import React, { Dispatch, SetStateAction, useEffect, useState,memo } from 'react';
import { apiGetPublicDistrict, apiGetPublicProvinces } from '../../store/features/app/appService';
import Select from '../Select/Select';
import InputReadOnly from './InputReadOnly';
import { IPayloadPost } from '../../pages/system/CreatePost';
import InputFormV2 from '../InputFormV2/InputFormV2';
import { IEditPost } from '../../pages/system/ManagePost';

interface IProps{
    payload?:any,
    postEdit?:IEditPost,
    setPayload:Dispatch<SetStateAction<IPayloadPost>>
}


interface IProvince{
    province_id:string,
    province_name:string
}

interface IDistrict{
    district_id:string,
    district_name:string
}


const Address:React.FC<IProps> = ({payload,setPayload,postEdit}) => {

    const [province, setProvince] = useState<string>('')
    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [districts, setDistricts] = useState<IDistrict[]>([])
    const [district, setDistrict] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [reset, setReset] = useState(false)

    useEffect(()=>{
        let address = postEdit?.address;
        if(address){
            let street = address.split(",")[0].replace('Địa chỉ: ','')
            let province = address.split(',')[2] && address.split(',')[2].trim()
            let findProvineId = provinces.find(item=>item.province_name === province)?.province_id
            setStreet(street)
            setProvince(findProvineId ? findProvineId : " ")
        }
    },[provinces])


    useEffect(()=>{
        let address = postEdit?.address;
        if(address){
            let district = address.split(',')[1].trim()
            const findDistrictId = districts.find(item=>item.district_name === district)?.district_id
            setDistrict(findDistrictId ? findDistrictId : " ")
        }
    },[districts])

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response:any = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict("")
        const fetchPublicDistrict = async () => {
            try {
                const response:any = await apiGetPublicDistrict(province)
                if (response.status === 200) {
                    setDistricts(response.data?.results)
                }
            } catch (error) {
                console.log(error)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setPayload((prev:any) => ({
            ...prev,
            address: `${street}, ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))

    }, [province, district, street])
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <InputFormV2 label="Số nhà, tên đường" setValue={setStreet} value={street}/>
                <div className='flex items-center gap-4'>
                    <Select type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
                    <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${street && street + ","} ${district ? `${ districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
                />
            </div>
        </div>
    );
};

export default memo(Address);