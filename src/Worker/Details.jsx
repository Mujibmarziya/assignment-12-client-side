
import { useContext, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';
import toast from 'react-hot-toast';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Countdown from 'react-countdown';





const Details = () => {
    const singleItem = useLoaderData();
    
    const {user}=useContext(AuthContext);
    const axiosSecure = useAxiosCommon()
    // const {id}=useParams()
    // console.log(id);
    console.log(singleItem);
    const {
        data: item = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['detail-itemm', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get('/items')
          console.log(data);
          const filteredd = data.filter((dats)=>dats._id== singleItem._id)
          console.log(filteredd);
          return filteredd;
        },
      })
      console.log(item[0]);
    const todaysDate = new Date()
     const dateTime = todaysDate.toLocaleString();
   
    const {_id,title,image,Task_details,subcategory_Name,to,submission_info,Payable_amount,task_quantity,email,displayname,userphoto} =item[0] || {};

//   console.log(typeof task_quantity);

    const handleSubmission = event => {
        event.preventDefault();
      console.log('clickedd');
      if (task_quantity <= 0) {
        toast.error("Cannot submit task. Task quantity is zero or less.");
        return;
    }
      const form = event.target;
      const submission_Details = form.submission_Details.value;
        

        const itemForSubmission = { taskID:_id,title,image,Task_details,dateOfSubmission:dateTime,status:'Pending',submission_Details:submission_Details,creater_name:displayname,createrEmail:email,workerName:user?.displayName,workerEmail:user?.email,subcategory_Name,submission_info,Payable_amount,task_quantity,email,displayname,userphoto };

        // send data to the server
        fetch("http://localhost:5002/submissions", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(itemForSubmission)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                    fetch(`http://localhost:5002/items/${_id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ task_quantity: task_quantity - 1 })
                    })
                    .then(res => res.json())
                    .then(updateData => {
                        console.log(updateData);
                        if (updateData.modifiedCount > 0) {
                            refetch()
                            toast.success("Submission Task submitted and task quantity updated successfully!");
                        } else {
                            toast.error("Submission Task submitted, but failed to update task quantity.");
                        }
                    });
                   
                   toast.success("Submission Task submitted  succesfully!")
                }
    })
         
      
    }
    return (
        <div>
             <div className='   w-11/12 mx-auto h-auto  flex flex-col lg:flex-row mt-11 gap-6'>
            <div className='w-full lg:w-1/3  '>
                <img className='h-[404px] w-full rounded-xl ' src={image} alt="" />

            </div>
            <div className='w-2/3 flex flex-col gap-3'>
            <h1 className=' text-blue-900 text-xl font-bold'>{_id}</h1>
                <h1 className=' text-blue-900 text-xl font-bold'>{title}</h1>
                <h1 className='font-medium text-blue-900  pb-2 border-blue-800 border-b-2 border-dashed'><span className='text-pink-800 font-bold'>Category: </span> <span className='text-slate-600'>{subcategory_Name}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Task Details: <span className=' text-slate-600 font-medium'>{Task_details}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Submission Info: <span className=' text-slate-600 font-medium'>{submission_info}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'>Task Quantity: <span className=' text-slate-600 font-medium'>{task_quantity}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Worker Name: <span className=' text-slate-600 font-medium'>{user.displayName}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Worker Email: <span className=' text-slate-600 font-medium'>{user.email}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Creater Name: <span className=' text-slate-600 font-medium'>{displayname}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Creater Email: <span className=' text-slate-600 font-medium'>{email}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Payable Amount: <span className=' text-slate-600 font-medium'>{Payable_amount}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Todays Date: <span className=' text-slate-600 font-medium'>{dateTime}</span></h1>
                <h1 className='text-blue-900 font-bold text-center'> Completion  Date: <span className=' text-slate-600 font-medium'>
               
      <Countdown date={new Date(to)} />
                    </span></h1>
                <h1 className='text-blue-900 font-bold text-center'> status: <span className=' text-slate-600 font-medium'>Pending</span></h1>
                <div className='flex flex-col gap-3  justify-between'>
                
                    <div>
                    <form onSubmit={handleSubmission} noValidate>
                                <div className="col-span-full">
                                    <label htmlFor="bio" className="text-sm">Submit Your Task</label>
                                    <textarea 
                                        name='submission_Details' 
                                        id="bio" 
                                        placeholder="" 
                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
                                    </textarea>
                                </div>
                                <button type="submit" className='btn bg-blue-900 text-white rounded-xl p-2 mt-4'>Submit</button>
                            </form>
                     
                    </div>

                    
                 
                
            </div>
            
          
            

            </div>

           
        
            
        </div>
        </div>
    );
};

export default Details;