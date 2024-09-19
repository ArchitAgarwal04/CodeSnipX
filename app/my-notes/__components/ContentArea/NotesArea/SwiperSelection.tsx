'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoAddOutline } from "react-icons/io5";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useGlobalContext } from '@/ContextApi';
import { Button } from '@/components/ui/button';

export default function SwiperSelection() {

    const { darkModeObject: {darkMode, setDarkMode} } = useGlobalContext();
    
  return (
    <div className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : " bg-white"} p-3 rounded-lg flex gap-5`}>
        <div className='overflow-x-auto w-full'>
            <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
        >
            <SwiperSlide className='bg-purple-600 p-1 rounded-md text-white w-20'>
             All
            </SwiperSlide>
            <SwiperSlide className='text-slate-400'>
                javascript exercises
            </SwiperSlide>
            <SwiperSlide className='text-slate-400'>react exercises</SwiperSlide>
            <SwiperSlide className='text-slate-400'>react exercises</SwiperSlide>
            <SwiperSlide className='text-slate-400'>react exercises</SwiperSlide>
            <SwiperSlide className='text-slate-400'>react exercises</SwiperSlide>           
            <SwiperSlide className='text-slate-400'>react exercises</SwiperSlide>                             
        </Swiper>
        </div>
        <Button className='bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white'>
            <IoAddOutline className='text-[18px]'/>
            <span>Tag</span>
        </Button>
    </div>
  );
}
