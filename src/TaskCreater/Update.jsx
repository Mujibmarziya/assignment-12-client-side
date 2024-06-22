import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import toast from 'react-hot-toast';
import { useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';

const Update = () => {
    const singleitem = useLoaderData();
    const {user} = useContext(AuthContext)
    console.log(singleitem);
    const {_id} =useParams()
    console.log(_id);
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    
      //Date range handler
      const handleDates = item => {
        setDates(item.selection)
      }
    const handleupdateblog = event => {
        event.preventDefault();
      

        const form = event.target;

        const title = form.title.value;
       
        const Task_details = form.tdetails.value;
        const submission_info = form.submissioninfo.value;
     
        

        const newUpdateditem = { title, submission_info, Task_details };

        console.log(newUpdateditem);

         // send data to the server
         fetch(`http://localhost:5002/items/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUpdateditem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                   console.log('up done');
                   toast.success("Updated successfully")
                }
            })
         
      
    }
    return (
        <section className="p-6 bg-slate-100 rounded-xl dark:bg-gray-100 dark:text-gray-900">
        <form onSubmit={handleupdateblog} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div
      className="space-y-2 col-span-full lg:bg-cover lg:bg-center lg:bg-no-repeat bg-none rounded-xl lg:rounded-none   flex justify-center items-center lg:col-span-1"
      style={{
        backgroundImage: 'url("https://i.ibb.co/3h49PdW/neven-krcmarek-HWbx-SLvm-Sww-unsplash.jpg")'
        // backgroundSize: 'cover',
        // backgroundPosition: 'center', 
        // backgroundRepeat: 'no-repeat' 
      }}
    >
      <p className=" font-semibold text-black lg:text-green-600">Update the task</p>
      
    </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full flex flex-col gap-2   sm:col-span-3">
                        <label htmlFor="firstname" className=" text-left text-black">Enter the title:</label>
                        <input defaultValue={singleitem.title}  name='title' id="firstname" type="text" placeholder="Enter the Title of the blog" className="w-full rounded-md  p-3 text-black  " />
                    </div>
                    {/* <div className="col-span-full flex flex-col gap-2   sm:col-span-3">
                        <label htmlFor="firstname" className=" text-left text-black">Enter the Image:</label>
                        <input  name='image' id="firstname" type="text" placeholder="Enter the image of the blog" className="w-full rounded-md  p-3 text-black  " />
                    </div> */}
                    <div className="col-span-full flex flex-col gap-2   sm:col-span-3">
                        <label htmlFor="firstname" className=" text-left text-black">Enter Task Details:</label>
                        <input defaultValue={singleitem.Task_details}  name='tdetails' id="firstname" type="text" placeholder="Enter task Description" className="w-full rounded-md  p-3 text-black  " />
                    </div>
                    <div className="col-span-full flex flex-col gap-2   sm:col-span-3">
                        <label htmlFor="firstname" className=" text-left text-black">Enter submission Info:</label>
                        <input defaultValue={singleitem.submission_info}  name='submissioninfo' id="firstname" type="text" placeholder="Enter Long Description" className="w-full rounded-md  p-3 text-black  " />
                    </div>
               
                  
                
                    
                </div>
            </fieldset>
            <button className='btn btn-primary bg-blue-900 text-white border-none w-1/2 mx-auto'> Update Item</button>
            
        </form>
    </section>
    );
};

export default Update;