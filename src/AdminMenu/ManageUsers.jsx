import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import TableRowUsersManage from './TableRowUsersManage';


const ManageUsers = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()



    //   Fetch  Data
    const {
      data: users = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['all-worker-users', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/users')
        //  console.log(data);
        const filtered = data.filter((dats)=>dats.role== 'worker')
       
        return filtered
      },
    })
    // console.log(users);

    const handleDelete =async (_id) => {
       
              const { data } = await axiosSecure.delete(`/users/${_id}`)
            //   const filtered = data.filter((dats)=>dats._id==_id)
             
           refetch()
           toast.success('deleted')
    

    }
    return (
        <div>
      
       
    <div>
        <h1 className=' text-blue-950 font-bold text-center mb-3'>All the Workers</h1>
    </div>
     <TableContainer  component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
<TableHead>
  <TableRow className='text-blue-950'>
  <TableCell><h1 className='font-bold text-blue-950 '>Photo</h1></TableCell>
    <TableCell><h1 className='font-bold text-blue-950 '>Full Name</h1></TableCell>
    
   
    <TableCell align="right"><h1 className='font-bold text-blue-950'>Email</h1></TableCell> 
    <TableCell align="right"><h1 className='font-bold text-blue-950'>Total Coins</h1></TableCell>
    <TableCell align="right"><h1 className='font-bold text-blue-950'>Role</h1></TableCell>
    <TableCell align="right"><h1 className='font-bold text-blue-950'></h1></TableCell>
    <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
    
  </TableRow>
</TableHead>
<TableBody>
  {users.map((row) => (
   <TableRowUsersManage key={row._id} row={row} refetch={refetch} handleDelete={handleDelete} ></TableRowUsersManage>
  ))}
</TableBody>
</Table>
</TableContainer>
</div>
    );
};

export default ManageUsers;