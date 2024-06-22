import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCoin from '../Hooks/UseCoin';
import { collectionGroup } from 'firebase/firestore';
import { data } from 'autoprefixer';
const MyApprovedSubs = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    const [coin] =useCoin()
   
    const {
      data: items = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['my-approved-submissions', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/submissions')
        // console.log(data);
        const filteredd = data.filter((dats)=>dats.workerEmail== user?.email)
       
        return filteredd;
      },
    })
    // console.log(items);
    const filtered = items.filter((dats)=>dats.workerEmail== user?.email && dats.status =='Approved')
    const totalEarnings = filtered.reduce((total, item) => total + parseInt(item.Payable_amount, 10), 0);
  //   const { data: withdrawals = [] } = useQuery({
  //     queryKey: ['my-withdrawal-amount', user?.email],
  //     queryFn: async () => {
  //         const { data } = await axiosSecure.get('/withdrawals');
  //         const filtered = data.filter(withdrawal => withdrawal.workerEmail === user?.email);
  //         return filtered;
  //     },
  // });
  //  console.log(withdrawals);
//  console.log(items);
  // Calculate total earnings
  // const totalEarnings = items.reduce((total, item) => total + parseInt(item.Payable_amount, 10), 0);

  // Calculate total withdrawal amount
  // const totalWithdrawAmount = withdrawals.reduce((total, withdrawal) => total + parseInt(withdrawal.withdrawAmount, 10), 0);
    return (
        <div>
           
           
        <div>
            <h1 className=' text-blue-950 font-bold text-center mb-3'>All my Approved submissions</h1>
            <h2 className="text-blue-950 font-bold text-center mb-3">Total Coins: {coin} </h2>
            <h2 className="text-blue-950 font-bold text-center mb-3">Total Earning: {totalEarnings} $</h2>
            <h2 className="text-blue-950 font-bold text-center mb-3">Total submission: {items.length} </h2>
        </div>
         <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 490 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-950'>
        <TableCell><h1 className='font-bold text-blue-950 '>Title</h1></TableCell>
        
       
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Detail</h1></TableCell> 
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Payable Amount</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Submission Info</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-950'>Status</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {filtered.map((row) => (
        <TableRow
       
          key={row._id} 
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
           {row.title}
          </TableCell>
          
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
        </div>
    );
};

export default MyApprovedSubs;