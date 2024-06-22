import React from 'react';

const SingleUserCard = ({singleuser}) => {
    const {email,fullName,userCoin,image,task_completion} =singleuser;
    return (
        <div >
        
              
        <div className='    h-[550px]'>
    
     <div  className="card w-full h-full lg:w-[350px] bg-base-100 border-black border-2">
       
       <figure className="px-10 pt-10 ">
       <img data-aos="flip-down" src={image} alt="Shoes" className="rounded-xl w-[300px] h-[250px]  " />
       
       </figure>
       <div className="card-body ">
       
       <h1 className='font-bold text-black border-b-2 pb-2 border-black'>User Coins: <span className='text-black font-semibold'>{userCoin}</span></h1>
       <h1 className='font-bold text-black border-b-2 border-black pb-2'>Total Task Completions: <span className='text-black font-semibold'>{task_completion}</span></h1>
       
       
       {/* <div className='mt-3'>
           <Link className='btn bg-black text-white rounded-xl p-2' to={`/detail/${_id}`}>View details</Link>
         
       </div> */}
       
       </div>
        </div>
 
        
    </div>
    </div>
    );
};

export default SingleUserCard;