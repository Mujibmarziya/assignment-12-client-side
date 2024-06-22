import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import img1 from '../assets/tim-peterson-Az8P8lOcgPA-unsplash.jpg'
// import img2 from '../assets/zion-c-sGblr5yVXiM-unsplash.jpg'
// import img3 from '../assets/irewolede-PvwdlXqo85k-unsplash.jpg'
// import img4 from '../assets/gus-ruballo-h5QNclJUiA8-unsplash (1).jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Banner() {
    // console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide>
        <div className="relative">
          <img src='https://i.ibb.co/NK87rQM/andrew-neel-cckf4-Ts-HAuw-unsplash.jpg' className="w-full" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center  bg-black bg-opacity-50 text-white p-4">
            <h2 className=' font-bold text-white text-4xl'>Welcome To </h2>
            <p className=' font-bold text-6xl text-blue-800'> Coin Workers</p>
            <p className=' text-white text-2xl'>Earn money by completing exciting and easy tasks.</p>
            <button className='btn-ghost bg-blue-900 text-white p-4 rounded-xl border-none'>See More</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img src="https://i.ibb.co/mb5TtKM/scott-graham-5f-Nm-Wej4t-AA-unsplash.jpg" className="w-full" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center  bg-black bg-opacity-50 text-white p-4">
            <h2 className=' font-bold text-white text-4xl'>Welcome To </h2>
            <p className=' font-bold text-6xl text-blue-800'> Coin Workers</p>
            <p className=' text-white text-2xl'>Earn money by completing exciting and easy tasks.</p>
            <button className='btn-ghost bg-blue-900 text-white p-4 rounded-xl border-none'>See More</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img src='https://i.ibb.co/swmyf9t/annie-spratt-Jex-Au-NCfefs-unsplash.jpg' className="w-full" />
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center  bg-black bg-opacity-50 text-white p-4">
            <h2 className=' font-bold text-white text-4xl'>Welcome To </h2>
            <p className=' font-bold text-6xl text-blue-800'> Coin Workers</p>
            <p className=' text-white text-2xl'>Earn money by completing exciting and easy tasks.</p>
            <button className='btn-ghost bg-blue-900 text-white p-4 rounded-xl border-none'>See More</button>
          </div>
        </div>
      </SwiperSlide>
     
      
       
       
        
      </Swiper>
    </>
  );
}
