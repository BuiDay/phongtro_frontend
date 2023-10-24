import React from 'react';
import CreatePost from '../../pages/system/CreatePost';
import { IEditPost } from '../../pages/system/ManagePost';

interface IProps{
    setIsShowModal?:any
    postEdit?:IEditPost
}

const ModalUpdatePost:React.FC<IProps> = ({setIsShowModal,postEdit}) => {
    return (
        <div onClick={() => { setIsShowModal(false) }} className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center p-10 overflow-scroll'>
            <div  onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(true)
            }}
            className='w-3/5 bg-white rounded-md relative m-auto '>
                <CreatePost postEdit={postEdit} setIsShowModal={setIsShowModal}/>
            </div>
        </div>
    );
};

export default ModalUpdatePost;