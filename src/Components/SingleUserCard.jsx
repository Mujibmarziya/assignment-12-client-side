import React from 'react';
import { axiosCommon } from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const SingleUserCard = ({singleuser}) => {
    const {email,fullName,userCoin,image,task_completion} =singleuser;
    // console.log(task_completion);

    const {
        data: submission_status = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['top-status', email],
        queryFn: async () => {
          const { data } = await axiosCommon.get('/submissions')
        //   console.log(data);
          const filteredd = data.filter((dats)=>dats.workerEmail==email && dats.status=='Approved')
          

          return filteredd;
        },
      })
    //   console.log(submission_status);
    return (
        <div >
        
              
        <div className='    h-[550px]'>
    
     <div  className="card w-full h-full lg:w-[350px] bg-base-100 border-black border-2">
       
       <figure className="px-10 pt-10 ">
       <img data-aos="flip-down" src={image} alt="Shoes" className="rounded-xl w-[300px] h-[250px]  " />
       
       </figure>
       <div className="card-body ">
       
       <h1 className='font-bold text-black border-b-2 pb-2 border-black'>User Coins: <span className='text-black font-semibold'>{userCoin}</span></h1>
       <h1 className='font-bold text-black border-b-2 border-black pb-2'>Total Task Completions: <span className='text-black font-semibold'>{submission_status.length}</span></h1>
       {/* Total Approved Task The specified user has submitted --Total Task Completion-- */}
       
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