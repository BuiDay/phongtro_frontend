import axiosConfig from '../../../utils/axiosConfig' 
import axiosDefault from 'axios'

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/price/all'
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/area/all'
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/province/all'
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicDistrict = (provinceId:string) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

const appService = {
    apiGetCategories,apiGetPrices,apiGetAreas,apiGetProvinces,apiGetPublicProvinces,apiGetPublicDistrict
}

export default appService