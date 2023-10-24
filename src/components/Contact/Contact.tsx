import React from 'react'
import { text } from '../../utils/dataContact'
import { Button } from '../../components'

const Contact = () => {
    return (
        <div className='bg-white rounded-md shadow-md p-5 md:p-10 max-w-[1100xp] w-full flex flex-col justify-center items-center gap-3 md:gap-6 mt-10'>
            <img
                src={text.image}
                alt="thumbnal"
                className='w-full h-48 object-contain'
            />
            <p>{text.content}</p>
            <div className='flex flex-wrap items-center justify-around w-full'>
                {text.contacts.map((item, index) => {
                    return (
                        <div key={index} className='flex mt-5 md:mt-0 flex-col items-center justify-center'>
                            <span className='text-orange-500 font-semibold'>{item.text}</span>
                            <span className='text-blue-900 text-[18px] font-semibold'>{item.phone}</span>
                            <span className='text-blue-900 text-[18px] font-semibold'>{item.zalo}</span>
                        </div>
                    )
                })}
            </div>
            <Button
                text='Gửi liên hệ'
                bgColor='bg-blue-600'
                textColor='text-white'
                px='px-6'
            />
        </div>
    )
}

export default Contact