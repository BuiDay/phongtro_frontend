import React, { useEffect, useState,useRef } from 'react';
import { apiGetPostsById } from '../../store/features/post/postService';
import { Link, useLocation } from 'react-router-dom';
import NewPost from '../../components/NewPost/NewPost';
import { Button } from '../../components';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiMessageRoundedDots} from 'react-icons/bi'
import {FaFacebookF} from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import {MdLocationPin} from 'react-icons/md'
import {CiRuler,CiClock2,CiShare2,CiMoneyBill} from 'react-icons/ci'
import ItemSidebar from '../../components/ItemSidebar/ItemSidebar';
import { useAppSelector } from '../../store/hook';


interface IGetPost{
    address?:string, 
    attributes?:{price?:string, acreage?:string, published?:string, hashtag?: string}
    description?: string,
    id: string,
    images: {image: string}
    overviews: {area: string, type: string, target: string, bonus: string, created: string,expired:string}
    star: number,
    title: string
    user: {name: string, zalo: string, phone:string,fbUrl:string,avatar:string}
}


const DetailPage = () => {

    const location = useLocation()
    const [getPost, setGetPost] = useState<IGetPost>()
    const {categories,areas,prices} = useAppSelector(state => state.app)

    const handleGetPost = async () =>{
        const url = location.pathname.split('/')
        const index = url.length;
        const res:any = await apiGetPostsById({id:url[index-1]})
        if(res.err === 0){
            setGetPost(res.response)
        }else(
            setGetPost(undefined)
        )
    }
    
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        handleGetPost ()
    },[]) 

    console.log(getPost?.description && JSON.parse(getPost?.description))
    return (
        <div className='w-full md:flex md:flex-row flex flex-col-reverse gap-4 mt-10'>
                <div className='md:w-[70%] bg-white border'>
                    <div className='h-[400px] bg-black rounded-xl overflow-hidden'>
                        <Swiper
                            pagination={{
                            type: "fraction",
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                getPost?.images.image && JSON.parse(getPost?.images.image).map((item:any)=>{
                                    return(
                                        <SwiperSlide><img className='h-[400px] object-contain m-auto' src={item} alt="" /></SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div className='p-5'>
                        <h1 className='text-2xl font-semibold text-red-600'>
                            {getPost?.title}
                        </h1>
                        <p className='mt-2 text-base'>
                            Chuyên mục: <span className='text-sm text-blue-600'>{getPost?.overviews.area}</span>
                        </p>
                        <div className='mt-2 flex items-center gap-1 text-md'>
                            <MdLocationPin color='#1266dd'/> 
                            <p >{getPost?.address}</p>
                        </div>
                        <div className='mt-2 md:flex items-center gap-5'>
                            <div className='flex items-center text-xl gap-1'>
                                <CiMoneyBill color='gray' size={26}/>  
                                <span className='text-green-500 font-bold'>{getPost?.attributes?.price}</span>
                            </div>
                            <div className='flex items-center text-xl gap-1'>
                                <CiRuler color='gray' size={26}/>
                                <span className='text-green-500 font-bold'>{getPost?.attributes?.acreage}</span>
                            </div>
                            <div className='flex items-center text-xl gap-1'>
                                <CiClock2 color='gray' size={26}/>
                                <span className='text-green-500 font-bold'>{getPost?.attributes?.published}</span>
                            </div>
                            <div className='flex items-center text-xl gap-1'>
                                <CiShare2 color='gray' size={26}/>
                                <span className='text-green-500 font-bold'>#{getPost?.id.slice(0,8)}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                             <p className='text-xl font-semibold'>Thông tin mô tả:</p>
                             <p className='mt-3 text-justify'>
                                {getPost?.description && typeof(JSON.parse(getPost?.description))==='object' ? JSON.parse(getPost?.description).map((item:any,index:number)=>{
                                    return(
                                        <>
                                            <span key={index}>{item}</span>
                                            <br/>
                                        </>
                                    )
                                }):<div className='whitespace-pre-wrap' dangerouslySetInnerHTML={{__html: getPost?.description && JSON.parse(getPost?.description)}}></div>}
                             </p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-xl font-semibold'>Đặc điểm tin đăng:</p>
                            <table className='w-full mt-3'>
                                <tbody>
                                <tr>
                                    <td className='p-2 w-48'>Mã tin:</td>
                                    <td className='p-2 w-50'>#{getPost?.id.slice(0,8)}</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-2 w-50'>Khu vực:</td>
                                    <td className='p-2'>{getPost?.overviews.area}</td>
                                </tr>
                                <tr>
                                    <td className='p-2 w-50'>Loại khao tin:</td>
                                    <td className='p-2'>{getPost?.overviews.type}</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-2 w-50'>Đối tượng thuê:</td>
                                    <td className='p-2'>{getPost?.overviews.target}</td>
                                </tr>
                                <tr>
                                    <td className='p-2 w-50'>Gói tin:</td>
                                    <td className='p-2'>{getPost?.overviews.bonus}</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-2 w-50'>Ngày đăng:</td>
                                    <td className='p-2'>{getPost?.overviews.created}</td>
                                </tr>
                                <tr>
                                    <td className='p-2 w-50'>Ngày hết hạn:</td>
                                    <td className='p-2'>{getPost?.overviews.expired}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2'>
                            <p className='text-xl font-semibold'>Thông tin liên hệ:</p>
                            <table className='w-full mt-3'>
                                <tbody>
                                <tr>
                                    <td className='p-2 w-48'>Liên hệ:</td>
                                    <td className='p-2 w-50'>{getPost?.user.name}</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-2 w-50'>Điện thoại:</td>
                                    <td className='p-2 text-blue-600'><Link target='_blank' to={`tel:${getPost?.user.phone}`}></Link>{getPost?.user.phone}</td>
                                </tr>
                                {
                                    getPost?.user.zalo && 
                                    <tr>
                                        <td className='p-2 w-50'>Zalo:</td>
                                        <td className='p-2 text-blue-600'><Link target='_blank' to={`https://zalo.me/${getPost?.user.zalo}`}>{getPost?.user.zalo}</Link></td>
                                    </tr>
                                }
                                {
                                    getPost?.user.fbUrl &&
                                    <tr className='bg-gray-100'>
                                        <td className='p-2 w-50'>Facebook:</td>
                                        <td className='p-2 text-blue-600' ><Link target='_blank' to={getPost?.user.fbUrl} >{getPost?.user.fbUrl}</Link></td>
                                    </tr> 
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className='w-full mt-10'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15674.411234265222!2d106.73525875!3d10.841677449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1679560963963!5m2!1svi!2s" width="100%" height="450"  loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
                <div className='md:w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <div className='bg-yellow-300 w-full rounded-md flex flex-col justify-center items-center py-5 gap-4'>
                        <div className='h-[80px] w-[80px] object-contain'>
                            <img className='rounded-full' src={`${getPost?.user.avatar ? JSON.parse(getPost?.user.avatar) : require('../../asset/images/anon-avatar.png')}`} alt="" />
                        </div>
                        <span className='text-2xl font-medium'>{getPost?.user.name && getPost?.user.name}</span>
                            <Link target="_blank" className='w-full px-10'to={`tel:${getPost?.user.phone && getPost?.user.phone}`} >
                                <Button target="_blank" fullWidth={true} link={`tel:${getPost?.user.phone && getPost?.user.phone}`} icon={<BsFillTelephoneFill/>} text={getPost?.user.phone && getPost?.user.phone} bgColor='bg-[#16c784]' px="px-10" py='py-1' fontSize='text-xl' textColor='text-white'></Button>
                            </Link>
                            {
                                getPost?.user.zalo && 
                                <Link target="_blank" className='w-full px-10'to={`https://zalo.me/${getPost?.user.zalo}`} >
                                    <Button target="_blank" fullWidth={true} link={`https://zalo.me/${getPost?.user.zalo}`} icon={<BiMessageRoundedDots/>} text="Nhắn Zalo" bgColor='bg-[white]' textColor='text-black' fontSize='text-md' py='py-1'></Button>
                                </Link>
                            }

                            {
                                getPost?.user.fbUrl && 
                                <Link target="_blank" className='w-full px-10'to={getPost?.user.fbUrl}  >
                                    <Button target="_blank" fullWidth={true} link={getPost?.user.fbUrl} icon={<FaFacebookF/>} text="Facebook" bgColor='bg-[white]' textColor='text-black' fontSize='text-md' py='py-1'></Button>
                                </Link>
                            } 
                    </div>
                    <div className='hidden md:block'>
                        <NewPost />
                        <ItemSidebar content={categories} title='Danh sách cho thuê' />
                        <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                        <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                    </div>
                </div>
            </div>
    );
};

export default DetailPage;

