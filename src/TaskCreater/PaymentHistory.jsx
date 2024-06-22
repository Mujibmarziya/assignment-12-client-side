import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    //   Fetch Rooms Data
    const {
      data: payments = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['payments', user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get('/payments')
         console.log(data);
        const filtered = data.filter((dats)=>dats.email== user?.email)
        // const sortedData = filtered.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        return filtered
      },
    })
    console.log(payments);
    return (
        <div>
           <div>
            <h1 className=' font-bold text-center mb-4'>My All Payment History</h1>
           </div>
           <div>
        
         <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow className='text-blue-800'>
        <TableCell><h1 className='font-bold text-blue-800 '>Transaction Id</h1></TableCell>
        
        <TableCell align="right"><h1 className='font-bold text-blue-800'>Amount</h1></TableCell>
        <TableCell align="center"><h1 className=' text-right text-blue-800 font-bold lg:text-center'>Date</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold text-blue-800'>Coin Given</h1></TableCell> 
         <TableCell align="right"><h1 className='font-bold text-blue-800'>Receiver</h1></TableCell>
        <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {payments.map((row) => (
        <TableRow
       
          key={row._id} 
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
           {row.transactionId}
          </TableCell>
          <TableCell align="right">{row.price} <span className=' font-semibold'>$</span></TableCell>
          
          <TableCell align="right"><h1 className='text-right lg:text-center'>{row.date}</h1></TableCell>
          <TableCell align="right">{row.coinGiven}</TableCell>
          <TableCell align="right">{row.displayName}</TableCell>
          {/* <TableCell align="right"> */}
         
       
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

export default PaymentHistory;