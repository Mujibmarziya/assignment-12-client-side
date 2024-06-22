import React from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../Hooks/useUser';

const Howitworks = () => {
  const[users]=useUser()
  console.log(users.length);
    return (
        <div>
             <div className="flex justify-center items-center border-y-2 border-dotted mt-14 p-14">
        <div >
            <h1 className="text-center font-extrabold">How it works</h1>
            <p className="text-center">A perfect destination for enthusiastic, fostering excellence, sportsmanship, and teamwork in the thrilling realm of professional money earning.</p>
          </div>
       </div>

       <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://i.ibb.co/K2L1V6v/micheile-henderson-h-QSDJh-Tf2-Po-unsplash.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">How You Can Boost up Your Earning.</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
     <div className='flex gap-3'>
     <NavLink to='/signup'><button className="btn btn-primary">Sign up</button></NavLink>
      <NavLink to='/signup'><button className="btn btn-primary">Complete Tasks</button></NavLink>
      <NavLink to='/signup'><button className="btn btn-primary">Earn Rewards</button></NavLink>
     </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Howitworks;