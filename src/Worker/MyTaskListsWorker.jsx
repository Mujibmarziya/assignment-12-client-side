import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const MyTaskListsWorker = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    //   Fetch Rooms Data
    const {
      data: items = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['all-items', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/items')
        // const filtered = data.filter((dats)=>dats.email== user?.email)
        // const sortedData = filtered.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        return data;
      },
    })
    console.log(items);
    return (
        <div>
             <div>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>My Tasklists</h1>
        </div>
        <div>
       
         <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-950'>
        <TableCell><h1 className='font-bold text-blue-950 '>Task Title</h1></TableCell>
        
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Creater Name</h1></TableCell>
        {/* {/* <TableCell align="center"><h1 className=' text-right text-pink-800 font-bold lg:text-center'>Rating</h1></TableCell> */}
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Completion Date/Last Date</h1></TableCell> 
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
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
          <TableCell align="right">{row.displayname}</TableCell>
          
          <TableCell align="right"><h1 className='text-right lg:text-center'>{row.to}</h1></TableCell>
          <TableCell align="right">{row.Payable_amount}</TableCell>
          <TableCell align="right">{row.task_quantity}</TableCell>
          {/* <TableCell align="right"> */}
         
       
        <Link className="btn m-4 text-white bg-blue-900" to={`detail/${row._id}`}>
          Details
        </Link>
      {/* </TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </div>
        </div>
    );
};

export default MyTaskListsWorker;