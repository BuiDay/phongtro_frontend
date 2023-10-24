import axios from '../../../utils/axiosConfig'
export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response:any = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        if(response.data.err === 1)
        {
            reject(response.data)
        }
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUser = (data:any) => new Promise(async (resolve, reject) => {
    try {
        const response:any = await axios({
            method: 'put',
            url: '/api/v1/user/update-user',
            data:data
        })

        if(response.data.err === 1)
        {
            reject(response.data)
        }
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})


const userService = {
    apiGetCurrent,apiUpdateUser
}


export default userService