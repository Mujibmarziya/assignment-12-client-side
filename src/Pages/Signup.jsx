import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link ,useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import { AuthContext } from '../Authprovider/Authprovider';
import axios from 'axios';
import useAxiosCommon, { axiosCommon } from '../Hooks/useAxiosCommon';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Signup = () => {

    const { createuser, updateuserprofile } = useContext(AuthContext);
    const [showpassword, setshowpassword] =useState(false)
    const [userCoin, setUserCoin] =useState(0)
    // console.log(updateuserprofile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation systems
  const navigate = useNavigate();
  const from = "/";

  const [role, setRole] = useState('Admin');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    // console.log(role);
    if (event.target.value === 'worker') {
      setUserCoin(10);
  } else if (event.target.value === 'task-creator') {
      setUserCoin(50);
  } else {
      setUserCoin(0);
  }
  };
  console.log(role);
  const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();
//   if(role== 'worker'){
//     setUserCoin(10)
//   } else{
//     setUserCoin(30)
//   }

  const onSubmit = async (data) => {
      const { email, password, fullName } = data;

      console.log(data);
    //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if(password.length < 6){
        toast.error("password should be 6 characters long");
        return;
      }
      else if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter.")
    
        // alert("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
        return ; 
    }

   else if(!/[a-z]/.test(password)){
        toast.error("Password must contain one lowercase letter.")
        return;
    }
   else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
  }
  
  // Check for numeric numbers
 else if (!/\d/.test(password)) {
      toast.error("Password must contain at least one numeric digit.");
      return;
  }


  const imageFile = { image: data.image[0] }
  const res = await axiosCommon.post(image_hosting_api, imageFile, {
      headers: {
          'content-type': 'multipart/form-data'
      }
  });

        

        const newuserinfo = { email,task_completion:parseInt(0), image:res.data.data.display_url, fullName,role, userCoin };
        console.log(newuserinfo);
        const notiData = {
          message: `you have earned ${userCoin} for creating an account`,
          ToEmail: {email},
          Time: dateTime
          }
//         console.log(newblog);

        // send data to the server
        try {
          const response = await fetch("https://assignment-12-server-beige-five.vercel.app/users", {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify({ newuserinfo })
          });

          const data = await response.json();
          console.log(data);
        
            

          if (data.insertedId) {
            console.log("inserted");
              // const notis = await axios.post('https://assignment-12-server-beige-five.vercel.app/notifications', notiData);
              // console.log(notis.data);
              fetch("https://assignment-12-server-beige-five.vercel.app/notifications", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({message:'noti got for signup'})
            })
              toast.success('noti created successfully');
          }
          
      //     const notis = await fetch('https://assignment-12-server-beige-five.vercel.app/notifications', {
      //       method: 'POST',
      //       headers: {
      //           'content-type': 'application/json'
      //       },
      //       body: JSON.stringify(notiData)
      //   });

      
          // Create user and update profile
          await createuser(email, password);
          await updateuserprofile(fullName,res.data.data.display_url, email);
          navigate(from);
          toast.success("Successfully registered.");

      } catch (error) {
          console.error('Error creating user:', error);
          toast.error('Failed to create user');
      }
  };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
            
  <div className="hero-content flex-col ">
  <div>
      <h1 className=' text-black text-xl font-bold text-center'>Create Your Account on our website.</h1>
      <h2 className='text-slate-700 font-semibold text-xl mt-1'>And Enjoy Our Services!!</h2>
    </div>
   
    <div className="card shrink-0 w-full max-w-sm shadow-2xl border-l-2 border-blue-900  bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input type="text" placeholder="name" className="input input-bordered" {...register("fullName", { required: true })} />
          {errors.fullName && (
                  <span className="text-red-500">This field is required</span>
                )}
        </div>
        <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input type="email" placeholder="Enter email" className="input input-bordered" {...register("email", { required: true })} />
          {errors?.email && (
                  <span className="text-red-500">This field is required</span>
                )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <div className='flex relative '>
          <input type={showpassword ? "text" : "password"} placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
          {
            showpassword? <FiEye className='absolute right-3 top-4'  onClick={ ()=> setshowpassword(!showpassword)}></FiEye> : <LuEyeOff className='absolute right-3 top-4'   onClick={ ()=> setshowpassword(!showpassword)}></LuEyeOff>
          }
          </div>
         
          {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
      <label htmlFor="role-select" className='block mb-4 text-sm'>Select Role:</label>
      <select name="role" id="role-select" value={role} className='border-2 p-3 rounded-xl' onChange={handleRoleChange}>
        <option value="">Select an option</option>
        <option value="worker">worker</option>
        <option value="task-creator">Task Creator</option>
      </select>
    </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary  bg-blue-900  border-2 border-blue-900 text-white">Register</button>
        </div>
        <label className="label text-black">
                Have an account?{" "}
                <Link to="/login" className="label-text-alt link link-hover">
                  Please <span className='btn bg-blue-900 text-white'>Login</span>
                </Link>
              </label>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Signup;