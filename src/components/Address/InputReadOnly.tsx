import React from 'react'
import { getCombinedNodeFlags } from 'typescript'

interface IProps{
    label?:string,
    value?:string,
    direction?:string,
}

const InputReadOnly:React.FC<IProps> = ({ label, value,direction}) => {
    return (
        <div className={`flex ${direction ? direction :"flex-col gap-2"}`}>
            <label className='font-medium w-48' htmlFor="exactly-address">{label}</label>
            <div className='flex-auto flex items-center'>
                <input
                    type='text'
                    id='exactly-address'
                    readOnly
                    className='border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full'
                    value={value || ''}
                />
            </div>
          
        </div>
    )
}

export default InputReadOnly