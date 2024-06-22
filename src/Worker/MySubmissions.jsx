import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosCommon from '../Hooks/useAxiosCommon';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';
import { Pagination } from '@mui/material';

const MySubmissions = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); 
    //   Fetch Rooms Data
    const {
      data: items = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['my-submissions', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/submissions')
        const filtered = data.filter((dats)=>dats.workerEmail== user?.email)
       
        return filtered
      },
    })
    console.log(items);
  
    // Function to handle page change
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    //   delete
    // const { mutateAsync } = useMutation({
    //   mutationFn: async id => {
    //     const { data } = await axiosSecure.delete(`/room/${id}`)
    //     return data
    //   },
    //   onSuccess: data => {
    //     console.log(data)
    //     refetch()
    //     toast.success('Successfully deleted.')
    //   },
    // })
  
    // //  Handle Delete
    // const handleDelete = async id => {
    //   console.log(id)
    //   try {
    //     await mutateAsync(id)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // if (isLoading) return <LoadingSpinner />
    return (
        <div>
        <div>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>All my submissions</h1>
        </div>
         <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-950'>
        <TableCell><h1 className='font-bold text-blue-950 '>Title</h1></TableCell>
        
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Detail</h1></TableCell>
         <TableCell align="center"><h1 className=' text-right text-blue-950 font-bold lg:text-center'>Date of submission</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Quantity</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Detail</h1></TableCell> 
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Info</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Status</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {items.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row) => (
        <TableRow
       
          key={row._id} 
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
           {row.title}
          </TableCell>
          <TableCell align="right">{row.Task_details}</TableCell>
          <TableCell align="right">{row.dateOfSubmission}</TableCell> 
          <TableCell align="right"><h1 className='text-right lg:text-center'>{row.task_quantity}</h1></TableCell>
          <TableCell align="right">{row.submission_Details}</TableCell>
          <TableCell align="right">{row.Payable_amount}</TableCell> 
          <TableCell align="right">{row.submission_info}</TableCell> 
          <TableCell align="right">{row.status}</TableCell> 
          {/* <TableCell align="right">
         
       
       
      {/* </TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
 {/* Pagination Component */}
 <Pagination
        count={Math.ceil(items.length / pageSize)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
        siblingCount={1} // Adjust as needed
        className='mt-4 mx-auto '
       
      />

    </div>
    );
};

export default MySubmissions;