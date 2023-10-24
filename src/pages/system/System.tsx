import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const System = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <div className='flex w-full flex-auto'>
                <Sidebar />
                <div className='flex-auto bg-white p-4 ml-[256px]'>
                    <Outlet />
                </div>
            </div>          
        </div>
    );
};

export default System;