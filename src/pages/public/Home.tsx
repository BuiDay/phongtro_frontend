import React from 'react';
import { Outlet } from 'react-router-dom';
import Intro from '../../components/Intro/Intro';
import Contact from '../../components/Contact/Contact';
import Header from './Header';
import Navigation from '../../components/Navigation/Navigation';
import Footer from './Footer';

const Home = () => {
    return (
    <>
        <Header/>
        <Navigation/>
        <div className='max-w-[1100px] m-auto flex flex-col justify-start items-center px-[15px] xl:px-[0px] '>           
            <Outlet />
            <Intro />
            <Contact />
        </div>
        <Footer />
        </>
    );
};

export default Home;