import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import useAxiosCommon, { axiosCommon } from '../Hooks/useAxiosCommon';
import { AuthContext } from '../Authprovider/Authprovider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, Outlet } from 'react-router-dom';

const MyTask = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    //   Fetch Rooms Data
    const {
      data: items = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['my-items', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/items')
        const filtered = data.filter((dats)=>dats.email== user?.email)
        const sortedData = filtered.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        return sortedData
      },
    })
    console.log(items);
  

  
    //   delete

    const handleDelete =async (_id) => {
      const itemResponse = await axiosSecure.get(`/items/${_id}`);
      const itemData = itemResponse.data;

      if (!itemData || !itemData.Payable_amount || !itemData.task_quantity) {
          throw new Error('Missing Payable_amount or task_quantity in item data');
      }

      // Parse the payable amount and task quantity
      const payableAmount = parseInt(itemData.Payable_amount);
      const task_quantity = parseInt(itemData.task_quantity);
       
      const { data } = await axiosSecure.delete(`/items/${_id}`)
      console.log(data);
      
    const response = await axiosSecure.post('/users',{email:user?.email,coinNeeded:parseInt(payableAmount*task_quantity)} ); 
   refetch()
   toast.success('deleted and reduced coin')


}
    // const { mutateAsync } = useMutation({
    //   mutationFn: async id => {
    //     const { data } = await axiosSecure.delete(`/room/${id}`)
    //     return data
    //   },
    //   onSuccess: data => {
 
    
    return (
        <div>
        <div>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>All my tasks</h1>
        </div>
         <TableContainer className='w-1/2 lg:w-3/4 mx-auto overflow-x-hidden'  component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-950'>
        <TableCell><h1 className='font-bold text-blue-950 '>Title</h1></TableCell>
        
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
        {/* {/* <TableCell align="center"><h1 className=' text-right text-pink-800 font-bold lg:text-center'>Rating</h1></TableCell> */}
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Quantity</h1></TableCell> 
       
        
        
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((row) => (
        <TableRow
       
          key={row._id} 
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
           {row.title}
          </TableCell>
          <TableCell align="right">{row.Payable_amount}</TableCell>
          
          <TableCell align="right"><h1 className='text-right lg:text-center'>{row.task_quantity}</h1></TableCell>
          {/* <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.displayname}</TableCell> */}
          {/* <TableCell align="right"> */}
         
        <Link onClick={()=>{handleDelete(row._id)}}  className="btn m-4 text-white bg-blue-900" >
          Delete
        </Link>
        <Link className="btn m-4 text-white bg-blue-900" to={`update/${row._id}`}>
          Update
        </Link>
      {/* </TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<div>
    <Outlet></Outlet>
</div>
    </div>
    );
};

export default MyTask;