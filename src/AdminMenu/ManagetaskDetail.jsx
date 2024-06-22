import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { axiosCommon } from '../Hooks/useAxiosCommon';

const ManagetaskDetail = () => {
    const singleItem = useLoaderData();
    // console.log(singleItem);
    const {_id}=useParams();
    console.log(_id);


    const {
        data: item = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['task-single-data',_id],
        queryFn: async () => {
          const { data } = await axiosCommon.get('/items')
        //   console.log(data);
          const filtered = data.filter((dats)=>dats._id== _id)
         
          return filtered
        },
      })
      console.log(item);
      const {title,Task_details,submission_info,Payable_amount} =item[0] ||{};
    return (
        <div>
            <h3 className="font-bold text-lg">Task Details</h3>
    <h3 className="font-bold text-lg "><span className='text-blue-900'>Task Title:</span> {title}</h3>
    <p className="py-4"><span className='text-blue-900'>Task Details:</span>{Task_details}</p>
    <p className="py-4"><span className='text-blue-900'>Submissions Info:</span>{submission_info}</p>
    <p className="py-4"><span className='text-blue-900'>Payable Amount:</span>{Payable_amount}</p>
    {/* Requirement e modal use korte bola hoile modal function e error thakay support session theke project er sob modal er jaygay detail page korte bala hoyeche */}
            
        </div>
    );
};

export default ManagetaskDetail;