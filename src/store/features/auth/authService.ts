import axiosConfig from '../../../utils/axiosConfig' 
import { IAuthRegister,IAuthLogin } from '../InterfaceReducer'
const apiRegister =  (data:IAuthRegister) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/auth/register',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

const apiLogin =  (data:IAuthLogin) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/auth/login',
            data:data
        })
        console.log(res.data.err)
        if(res.data.err === -1)
        {
            reject(res.data)
        }
        resolve(res.data)
        
    } catch (error) {
        reject(error)
    }
})

const authService = {
    apiRegister,apiLogin
}

export default authService