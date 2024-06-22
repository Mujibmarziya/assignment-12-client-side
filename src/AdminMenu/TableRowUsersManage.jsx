import React, { useContext, useState } from 'react';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { axiosCommon } from '../Hooks/useAxiosCommon';
import { AuthContext } from '../Authprovider/Authprovider';
import toast from 'react-hot-toast';

const TableRowUsersManage = ({row,handleDelete,refetch}) => {
    const { user } = useContext(AuthContext)
    const {_id,fullName,email,userCoin,image,role} =row;
    const [rolee, setRole] = useState('');

    const handleRoleChange = async(event) => {
      setRole(event.target.value);
      const newRole = event.target.value;
      // console.log(role);
      console.log(rolee);
      const userdata ={role:rolee}
      console.log(userdata);
     try {
         const response = await axiosCommon.put(`/users/${_id}`,{role:newRole} );
         toast.success(response.data.message);
         toast.success('role updated')
       
        
         refetch()
        
     } catch (error) {
         console.error('Error approving submission:', error);
         toast.error('Failed to approve submission');
     }
     
    };
    // console.log(rolee);
    // const handlestatus = async (status) => {
    //     console.log(status,_id);
    //     const dataSub ={
    //         submissionId: _id,
    //         status:status,
    //         task_quantity,
    //         Payable_amount,
    //         userEmail: user.email
    //     }
    //      const userdata ={workerEmail,Payable_amount}
    //      console.log(userdata);
    //     try {
    //         const response = await axiosCommon.put(`/submissions/${_id}`, dataSub);
    //         toast.success(response.data.message);
    //         toast.success('status updated')
    //         if(status !=='Approved'){
    //             const response1 = await axiosCommon.post('/notifications',{message:'status updated '} );
    //             toast.success('status rejected')
    //         }
    //         if(response && status !=='Rejected'){
    //             const response = await axiosCommon.post('/users',{email:workerEmail,coins:parseInt(Payable_amount)} );
    //             toast.success('pay hoise worker er')
    //             // if(status !=='Approved'){
    //             //     const response1 = await axiosCommon.post('/notifications',{message:'status updated '} );
    //             //     toast.success('status rejected')
    //             // }
    //             if(status !=='Rejected'){
    //                 const response2 = await axiosCommon.post('/notifications',{message:'status updated and got coined'} );
    //                 toast.success('status approved')
    //             }
               
    //         }
    //         refetch();
           
    //     } catch (error) {
    //         console.error('Error approving submission:', error);
    //         toast.error('Failed to approve submission');
    //     }
    // };

   
    return (
        <TableRow
   
        key={_id} 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
         <img src={image} alt="" />
        </TableCell>
        
        <TableCell align="right">{fullName}</TableCell>
        <TableCell align="right">{email}</TableCell> 
        <TableCell align="right">{userCoin}</TableCell>
        <TableCell align="right">{role}</TableCell>  
        <Link onClick={()=>handleDelete(_id)} className="btn m-4 text-white bg-blue-900">
            Delete
          </Link>
        <TableCell align="right">
        <label htmlFor={`role-select-${_id}`} className='block mb-4 text-sm'>Select Role:</label>
          <select
            name="role"
            id={`role-select-${_id}`}
            value={rolee}
            className='border-2 p-3 rounded-xl'
            onChange={handleRoleChange}
          >
            <option>Select an option</option>
            <option value="worker">worker</option>
            <option value="task-creator">Task Creator</option>
            <option value="admin">Admin</option>
          </select>
          </TableCell> 
        {/* <TableCell align="right">
       
     
     
    {/* </TableCell> */}
      </TableRow>
    
    );
};

export default TableRowUsersManage;