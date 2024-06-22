import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { axiosCommon } from '../Hooks/useAxiosCommon';

const SubDetail = () => {
    const singleItem = useLoaderData();
    // console.log(singleItem);
    const {_id}=useParams();
    console.log(_id);


    const {
        data: submissions = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['submission-single-data',_id],
        queryFn: async () => {
          const { data } = await axiosCommon.get('/submissions')
          console.log(data);
          const filtered = data.filter((dats)=>dats._id== _id)
         
          return filtered
        },
      })
      console.log(submissions);
      const {title,Task_details,submission_info,Payable_amount} =submissions[0] ||{};
    return (
        <div>
            <h3 className="font-bold text-lg">Submission Details</h3>
    <h3 className="font-bold text-lg "><span className='text-blue-900'>Task Title:</span> {title}</h3>
    <p className="py-4"><span className='text-blue-900'>Task Details:</span>{Task_details}</p>
    <p className="py-4"><span className='text-blue-900'>Submissions Info:</span>{submission_info}</p>
    <p className="py-4"><span className='text-blue-900'>Payable Amount:</span>{Payable_amount}</p>
            
        </div>
    );
};

export default SubDetail;