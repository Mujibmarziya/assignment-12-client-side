import React from 'react';
import Banner from '../Components/Banner';
import Howitworks from '../Components/Howitworks';
import Features from '../Components/Features';
import Testimonial from '../Components/Testimonial';
import TopEarners from '../Components/TopEarners';

const Home = () => {
    // console.log("home");
    return (
        <div>
          
          <Banner></Banner>
          <Features></Features>
          <Howitworks></Howitworks>
          <TopEarners></TopEarners>
          <Testimonial></Testimonial>
       
        </div>
    );
};

export default Home;