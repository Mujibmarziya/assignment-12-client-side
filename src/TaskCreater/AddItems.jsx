import React, { useContext, useState } from 'react';

import toast from 'react-hot-toast';
import { AuthContext } from '../Authprovider/Authprovider';
import { DateRange } from 'react-date-range';
import useCoin from '../Hooks/UseCoin';
import { axiosCommon } from '../Hooks/useAxiosCommon';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const {user} = useContext(AuthContext)

    const [coin] =useCoin();
    // console.log(coin);
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    
      //Date range handler
      const handleDates = item => {
        setDates(item.selection)
      }

   

    if(!user?.email){
        toast.error("You are not logged in , please login to add a blog.")
    }
    const handleAdditems = async (event) => {
        event.preventDefault();
      

        const form = event.target;

        const title = form.title.value;
        // const image = form.image.value;
        const Task_details = form.tdetails.value;
        const submission_info = form.submissioninfo.value;
        const Payable_amount = form.amount.value;
        const task_quantity= form.task_quantity.value;
        const email = user?.email;
        const displayname= user.displayName;
        const userphoto = user.photoURL;
        const to = dates.endDate
        const from = dates.startDate
        const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();
        
       
        // image upload
        const imageFile = { image:form.image.files[0] }
        const res = await axiosCommon.post(image_hosting_api, imageFile, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      });
        const newitem = { title, image:res.data.data.display_url, submission_info,task_quantity,dateTime, Task_details,Payable_amount,to,from, email,displayname,userphoto };
          // console.log(image);
        console.log(newitem);
        const coinNeeded =task_quantity*Payable_amount;
        console.log(coinNeeded);
       
        if(coinNeeded>coin){
            console.log('coin nai ');
            return toast.error("not enough coin")

        } else{
            console.log(' i want to reduce coin value by coin needed here ');
            fetch("https://assignment-12-server-beige-five.vercel.app/users", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, coinNeeded }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Failed to reduce usercoin');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Successfully reduced usercoin');
                  toast.success("Item added successfully!");
                })
                .catch(error => {
                  console.error('Error reducing usercoin:', error.message);
                  toast.error("Failed to reduce usercoin");
                });
              
        }

        // send data to the server
        fetch("https://assignment-12-server-beige-five.vercel.app/items", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newitem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                  fetch("https://assignment-12-server-beige-five.vercel.app/notifications", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({message:'items added '})
                })
                toast.success('noti created successfully');
                   console.log('add hoise');
                   toast.success("item added succesfully!")
                }
    })
         
      
    }
    return (
        <section className="p-6 bg-slate-100 rounded-xl dark:bg-gray-100 dark:text-gray-900">
	<form onSubmit={handleAdditems} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
        <div
  className="space-y-2 col-span-full lg:bg-cover lg:bg-center lg:bg-no-repeat bg-none rounded-xl lg:rounded-none   flex justify-center items-center lg:col-span-1"
  
>
  <p className=" font-semibold text-blue-900">Add a task</p>
  
</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full flex flex-col gap-2   sm:col-span-3">
					<label htmlFor="firstname" className=" text-left text-black">Enter the title:</label>
					<input  name='title' id="firstname" type="text" placeholder="Enter the Title of the task" className="w-full rounded-md  p-3 text-black  " />
				</div>
				<div className="col-span-full flex flex-col gap-2   sm:col-span-3">
					<label htmlFor="firstname" className=" text-left text-black">Enter the Image:</label>
          <input name='image' type="file" className="file-input w-full max-w-xs" />
				</div>
				<div className="col-span-full flex flex-col gap-2   sm:col-span-3">
					<label htmlFor="firstname" className=" text-left text-black">Enter Task Details:</label>
					<input  name='tdetails' id="firstname" type="text" placeholder="Enter task Details" className="w-full rounded-md  p-3 text-black  " />
				</div>
                <div className="col-span-full flex flex-col gap-2   sm:col-span-3">
					<label htmlFor="firstname" className=" text-left text-black">Enter submission Info:</label>
					<input  name='submissioninfo' id="firstname" type="text" placeholder="Enter submission Info" className="w-full rounded-md  p-3 text-black  " />
				</div>
				<div className="col-span-full flex flex-col gap-2  sm:col-span-3">
                <label htmlFor="firstname" className=" text-left text-black">Enter amount:</label>
                <input  name='amount' id="firstname" type="text" placeholder="Enter amount" className="w-full rounded-md  p-3 text-black  " />
              
				</div>
                <div className="col-span-full flex flex-col gap-2  sm:col-span-3">
                <label htmlFor="firstname" className=" text-left text-black">Enter Task Quantity:</label>
                <input  name='task_quantity' id="firstname" type="text" placeholder="Enter Task Quantity" className="w-full rounded-md  p-3 text-black  " />
              
				</div>
                <div className='space-y-1'>
              <label htmlFor='location' className='block text-gray-600'>
              completion date
              </label>
              {/* Calender */}
              <DateRange
                rangeColors={['#F43F5E']}
                editableDateInputs={true}
                onChange={item => handleDates(item)}
                moveRangeOnFirstSelection={false}
                ranges={[dates]}
              />
            </div>
				
			</div>
		</fieldset>
        <button className='btn btn-primary bg-blue-900 text-white border-none w-1/2 mx-auto'> Add Task</button>
		
	</form>
</section>
    );
};

export default AddItems;

{/* <label htmlFor="email" className="text-sm mr-2">Category</label>
                <select className="bg-slate-400 select select-primary w-full max-w-xs" onChange={handleCategoryChange} value={selectedCategory}>
                                <option disabled value="">Choose YOUR blog Category.</option>
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                                <option value="Travel">Travel</option>
                                
                            </select> */}