import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../Authprovider/Authprovider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import TableRowManageTasks from './TableRowManageTasks';
import useUser from '../Hooks/useUser';
const ManageTasks = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()

  //  const[users]=useUser()
  //  console.log(users.length);

    //   Fetch  Data
    const {
      data: items = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['manage-tasks', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/items')
         console.log(data);
        const filtered = data.filter((dats)=>dats.role== 'worker')
       
        return data
      },
    })
    // console.log(users);
   
    const handleDelete =async (_id) => {
       
              const { data } = await axiosSecure.delete(`/items/${_id}`)
            //   const filtered = data.filter((dats)=>dats._id==_id)
             
           refetch()
           toast.success('deleted')
    

    }
    return (
        <div>
          <div>
      
       
      <div>
          <h1 className=' text-blue-950 font-bold text-center mb-3'>All the Tasks</h1>
      </div>
       <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow className='text-blue-950'>
    <TableCell><h1 className='font-bold text-blue-950 '>Title</h1></TableCell>
      <TableCell><h1 className='font-bold text-blue-950 '>Coin Needed</h1></TableCell>
      
     
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Quantity</h1></TableCell> 
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Creater Name</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Availability</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
      
    </TableRow>
  </TableHead>
  <TableBody>
    {items.map((row) => (
     <TableRowManageTasks key={row._id} row={row} refetch={refetch} handleDelete={handleDelete} ></TableRowManageTasks>
    ))}
  </TableBody>
  </Table>
  </TableContainer>
  </div>
            
        </div>
    );
};

export default ManageTasks;