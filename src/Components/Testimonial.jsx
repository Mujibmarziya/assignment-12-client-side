import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styless.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Testimonial() {
  return (
    <>
    <div>
      <h1 className=' font-bold text-blue-950 text-4xl text-center mb-7 mt-11'>All the Feedbacks</h1>
    </div>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className="relative">
          <img src='https://i.ibb.co/NZcdwNv/jd-chow-gutlcc-GLXKI-unsplash.jpg' className="w-full" alt="User 1" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center bg-black bg-opacity-50 text-white p-4">
            <h2 className=' text-2xl text-white'>Amazing Platform!</h2>
            <p className=' text-2xl text-blue-800'>"I've earned so many coins!"</p>
            <p className='text-white text-2xl'>- John Doe</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img src='https://i.ibb.co/fHrB7dj/deepak-mahajan-8ig-Sz-Hpq-Dw-unsplash.jpg' className="w-full" alt="User 2" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center bg-black bg-opacity-50 text-white p-4">
            <h2 className=' text-2xl text-white'>Best Rewards Program!</h2>
            <p className=' text-2xl text-blue-800'>"Love the tasks!"</p>
            <p className='text-white text-2xl'>- Jane Smith</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img src='https://i.ibb.co/s2nVRBb/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg' className="w-full" alt="User 3" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center bg-black bg-opacity-50 text-white p-4">
            <h2 className=' text-2xl text-white'>Highly Recommend!</h2>
            <p className=' text-2xl text-blue-800'>"Great way to earn extra cash!"</p>
            <p className='text-white text-2xl'> Amina Begum</p>
          </div>
        </div>
      </SwiperSlide>
      </Swiper>
    </>
  );
}
