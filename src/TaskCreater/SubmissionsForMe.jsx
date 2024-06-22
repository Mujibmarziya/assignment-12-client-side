import React, { useContext } from 'react';
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
import TableRowMySubs from './TableRowMySubs';
import useItems from '../Hooks/useItems';
import useCoin from '../Hooks/UseCoin';
const SubmissionsForMe = () => {
  const [items] =useItems()
    const { user } = useContext(AuthContext)
    const coin =useCoin();
    const axiosSecure = useAxiosCommon()
    //   Fetch Rooms Data
    const {
      data: submissions = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['submissions-for-me', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/submissions')
        const filtered = data.filter((dats)=>dats.createrEmail== user?.email)
       
        return filtered
      },
    })
    console.log(submissions);

    const filtered = items.filter((dats)=>dats.email== user?.email)
    console.log(filtered);
     const totalpendingtask = filtered.reduce((sum, fil) => sum + parseInt(fil.task_quantity), 0);
    // pending ..Task sum of all task_quantity of his added Tasks...requirement
    const filtereddforpaid= submissions.filter((dats)=>dats.createrEmail== user?.email && dats.status=='Approved')
    console.log(filtereddforpaid);
    const totalPaymentPaidByUser = filtereddforpaid.reduce((sum, fil) => sum + parseInt(fil.Payable_amount), 0);
    return (
        <div>
        <div>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>All the pending submissions</h1>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>Total Coins:  {coin}</h1>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>Total pending Task Quantity:  {totalpendingtask}</h1>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>Total payments pais by users:  {totalPaymentPaidByUser} $</h1>
        </div>
         <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-950'>
        <TableCell><h1 className='font-bold text-blue-950 '>Title</h1></TableCell>
        
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Detail</h1></TableCell>
         <TableCell align="center"><h1 className=' text-right text-pink-800 font-bold lg:text-center'>Date of submission</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Task Quantity</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Detail</h1></TableCell> 
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Info</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Status</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
        <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {submissions.map((row) => (
        <TableRowMySubs key={row._id} row={row} refetch={refetch}></TableRowMySubs>
    //     <TableRow
       
    //       key={row._id} 
    //       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //     >
    //       <TableCell component="th" scope="row">
    //        {row.title}
    //       </TableCell>
    //       <TableCell align="right">{row.Task_details}</TableCell>
    //       <TableCell align="right">{row.dateOfSubmission}</TableCell> 
    //       <TableCell align="right"><h1 className='text-right lg:text-center'>{row.task_quantity}</h1></TableCell>
    //       <TableCell align="right">{row.submission_Details}</TableCell>
    //       <TableCell align="right">{row.Payable_amount}</TableCell> 
    //       <TableCell align="right">{row.submission_info}</TableCell> 
    //       <TableCell align="right">{row.status}</TableCell> 
    //       <Link className="btn m-4 text-white bg-blue-900" >
    //       Approve
    //     </Link>
    //     <Link className="btn m-4 text-white bg-blue-900" >
    //       Reject
    //     </Link>
    //       {/* <TableCell align="right">
         
       
       
    //   {/* </TableCell> */}
    //     </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </div>
    );
};

export default SubmissionsForMe;