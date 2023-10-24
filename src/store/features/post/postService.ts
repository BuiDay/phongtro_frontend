import axios from 'axios'
import axiosConfig from '../../../utils/axiosConfig'
import { IPayloadPost } from '../../../pages/system/CreatePost'


const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

const apiGetPostsLimit = (query:any) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsById = (query:any) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/get-post`,
            params:query
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/new-post`,
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

export const apiUploadImages = (images:any) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/dlqieazbj/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiCreatePost =  (data:IPayloadPost) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/post/create-post',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostAdmin =  (query:any) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/post/get-post-admin',
            params:query
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdatePostAdmin =  (data:any) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"put",
            url:'/api/v1/post/update-post-admin',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

export const apiDeletePostAdmin =  (data:any) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"delete",
            url:'/api/v1/post/delete-post-admin',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

const postService = {
    apiGetPosts,apiGetPostsLimit,apiGetNewPosts,apiUploadImages,apiCreatePost,apiGetPostAdmin,apiUpdatePostAdmin,apiDeletePostAdmin
}


export default postService