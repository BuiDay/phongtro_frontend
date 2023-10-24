import React from 'react'
import Navigation from '../../components/Navigation/Navigation'

const Header = () => {
    return (
        <div className='w-full flex flex-none h-[40px]'>
            <div className='flex justify-center items-center font-bold bg-secondary text-white w-[256px] h-[40px] flex-none fixed'>
                Phongtro
            </div>
            <div className='flex-auto ml-[256px]'>
                <Navigation isAdmin={true} />
            </div>
        </div>
    )
}

export default Header