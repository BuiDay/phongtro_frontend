import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPostAdmin } from '../../store/features/post/postSilce';
import moment from 'moment';
import { Button } from '../../components';
import ModalUpdatePost from '../../components/ModalUpdatePost/ModalUpdatePost';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import { apiDeletePostAdmin } from '../../store/features/post/postService';
import Swal from 'sweetalert2';

export interface IEditPost{
    id?:string,
    title: string,
    priceNumber: number,
    areaNumber: number,
    images: {image:any},
    address: string,
    priceCode: string,
    areaCode: string,
    categoryCode:string,
    description: string,
    target: string,
    province: string,
    label?:string,
    overviews:{
        type:string,
        target:string
    },
    attributesId?:string,
    overviewId?:string,
    imagesId?:string
}

const ManagePost = () => {
    const dispatch = useAppDispatch()
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
    const [postEdit, setPostEdit] = useState<IEditPost>()
    const {postsAdmin} = useAppSelector(state=>state.post)
    useEffect(()=>{
        dispatch(getPostAdmin())
    },[])

    useEffect(()=>{
        dispatch(getPostAdmin())
    },[isShowModal,isShowModalConfirm])

    const checkStatus  = (datetime:any) => {
      return  moment(datetime.toString(),'DD/MM/YYYY').isAfter(new Date().toDateString())
    };

    const handleShow = (e:IEditPost) => {
        setPostEdit(e)
        setIsShowModal(true)
    }

    const handleShowConfirm= (e:IEditPost) => {
        setPostEdit(e)
        setIsShowModalConfirm(true)
    }

    const handleDelete = async () =>{
        if(postEdit){
            const {id,attributesId,overviewId,imagesId} = postEdit
            const params = {
                postId:id,
                attributesId,
                overviewId,
                imagesId
            }
            const res:any = await apiDeletePostAdmin(params)
            if(res.err === 0){
                Swal.fire({
                    title: "Thành công",
                    text: "Bạn đã xoá tin thành công",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(function () {
                    setIsShowModalConfirm(false)
                });
            }else{
                Swal.fire({
                    title: "Lỗi",
                    text: "Bạn đã xoá tin không thành công",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }
        }
    }


    return (
        <div className='px-6'>
            <div className='border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium py-4'>Quản lý tin đăng</h1>
                <select name="" id="" className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="">Lọc theo trạng thái</option>
                </select>
            </div>
            <table className='w-full mt-5 border'>
                <thead>
                    <tr>
                        <th className='py-3 border'>Mã tin</th>
                        <th className='py-3 border'>Ảnh đại diện</th>
                        <th className='py-3 border'>Tiêu đề</th>
                        <th className='py-3 border'>Giá</th>
                        <th className='py-3 border'>Ngày bắt đầu</th>
                        <th className='py-3 border'>Ngày hết hạn</th>
                        <th className='py-3 border'>Trạng thái</th>
                        <th className='py-3 border'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       postsAdmin && postsAdmin.length > 0 ? postsAdmin.map((item:any,index)=>{
                            return (
                                <>
                                    <tr key={index} className='text-sm text-center'>
                                        <td className='py-1 border'>#{item.id.split("-")[0]}</td>
                                        <td className='py-1 border'>
                                            <img className='h-[70px] m-auto' src={JSON.parse(item.images.image)[0]} alt="" />
                                        </td>
                                        <td className='text-left py-1 px-3 border'>{item.title}</td>
                                        <td className='py-1 border'>{item.attributes.price}</td>
                                        <td className='py-1 border'>{item.overviews.created}</td>
                                        <td className='py-1 border'>{item.overviews.expired}</td>
                                        <td className='py-1 border'>{item.overviews.expired && checkStatus(item.overviews.expired.split(" ")[3]) ? "Đang hoạt động" : "Đã hết hạn"}</td>
                                        <td className='py-1 border flex justify-around items-center h-[78px]'>
                                            <Button text="Sửa" textColor="text-white" bgColor = "bg-green-500" onClick={()=>{handleShow(item)}} />
                                            <Button text="Xóa" textColor="text-white" bgColor = "bg-secondary2" onClick={()=>{handleShowConfirm(item)}}/>
                                        </td>
                                    </tr>  
                                </>
                            )
                        }) : <tr className='mt-5'><td>Chưa có tin đăng nào</td></tr>
                    }
                </tbody>
            </table>
            {isShowModal && <ModalUpdatePost
                setIsShowModal={setIsShowModal} 
                postEdit = {postEdit}           
            />}
             {isShowModalConfirm && <ModalConfirm
                setIsShowModalConfirm={setIsShowModalConfirm} 
                postEdit = {postEdit} 
                handle = {handleDelete}
                title = 'Bạn có muốn xóa bài ?'    
            />}
        </div>    
    );
};

export default ManagePost;