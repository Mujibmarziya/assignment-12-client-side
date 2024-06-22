import React, { useContext, useEffect, useState } from 'react';
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

import useUsers from '../Hooks/useUser';
const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    const [users] =useUsers();
    const [totalPaymentsByAllTaskCreatersvalue,setTotal] =useState(0);
    console.log(users);
    const totalUserCoins = users.reduce((total, user) => total + parseInt(user.userCoin), 0);
    // const [totalWithdrawal, setTotalWithdrawal] = useState(() => {
    //     // Load total withdrawal from local storage if available
    //     const savedTotal = localStorage.getItem('totalWithdrawal');
    //     return savedTotal ? parseFloat(savedTotal) : 0;
    // });
    const [paymentCount, setPaymentCount] = useState(() => {
      // Load the payment count from local storage if available
      const savedCount = localStorage.getItem('paymentCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
  });

   

    //   Fetch  Data
    const {
      data: withdrawals = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['withdrawals', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/withdrawals')
         console.log(data);
        // const filtered = data.filter((dats)=>dats.role== 'worker')
       
        return data
      },
    })
    console.log(withdrawals);
    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const { data } = await axiosSecure.get('/payments');
          const totalPaymentsByAllTaskCreators = data.reduce((sum, fil) => sum + parseInt(fil.price), 0);
          setTotal(totalPaymentsByAllTaskCreators);
        } catch (error) {
          console.error('Error fetching payments:', error);
        }
      };
  
      fetchPayments();
    }, [axiosSecure]);
    const handlePaymentSuccess =async (_id,workeremail,coins) => {
        try{
            const { data } = await axiosSecure.delete(`/withdrawals/${_id}`)
            //   const filtered = data.filter((dats)=>dats._id==_id)
            await axiosSecure.post('/users', {
                email:workeremail,
                coinNeeded: coins
            });
             
           refetch()

           setPaymentCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem('paymentCount', newCount.toString());
            return newCount;
        });
           toast.success('deleted and the withdraw coins will be deducted from the worker!')
        }
        catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Failed to process payment.');
          }
       
        
    

    }
    return (
        <div>
          <div>
      
       
      <div>
          <h1 className=' text-blue-950 font-bold text-center mb-3'>All the Tasks</h1>
          <h2 className="text-blue-950 font-bold text-center mb-3">Total payments: {paymentCount}</h2>
          <h2 className="text-blue-950 font-bold text-center mb-3">Total payments By Task Creaters: {totalPaymentsByAllTaskCreatersvalue} $</h2>
          {/* I was unclear about the requirements for total payments made by the user from various sources.That's why i implemented both.Total Payments And Total dollar payments by taskcreaters.  */}
          <h2 className="text-blue-950 font-bold text-center mb-3">Total Users: {users.length}</h2>
          <h2 className="text-blue-950 font-bold text-center mb-3">Total Users coins: {totalUserCoins}</h2>
      </div>
       <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow className='text-blue-950'>
    <TableCell><h1 className='font-bold text-blue-950 '>Worker Name</h1></TableCell>
      <TableCell><h1 className='font-bold text-blue-950 '>Worker Email</h1></TableCell>
      
     
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Payment System</h1></TableCell> 
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Withdraw Amount</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Coins</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold text-blue-950'>Payment Number</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold'>Withdraw Time</h1></TableCell>
      <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
      <TableCell align="right"><h1 className='font-bold'></h1></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {withdrawals.map((row) => (
       <TableRow
   
       key={row._id} 
       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
     >
       {/* <TableCell component="th" scope="row">
        <img src={image} alt="" />
       </TableCell> */}
       
       <TableCell align="right">{row.workername}</TableCell>
       <TableCell align="right">{row.workeremail}</TableCell> 
       <TableCell align="right">{row.paymentSystem}</TableCell>
       <TableCell align="right">{row.withdrawAmount}</TableCell> 
       <TableCell align="right">{row.coins}</TableCell> 
       <TableCell align="right">{row.accountNumber}</TableCell>  
       <TableCell align="right">{row.dateTime}</TableCell> 
       <Link onClick={()=>handlePaymentSuccess(row._id,row.workeremail,row.coins)} className="btn m-4 text-white bg-blue-900">
           Payment Success
         </Link>

     </TableRow>
    ))}
  </TableBody>
  </Table>
  </TableContainer>
  </div>
            
        </div>
    );
};

export default AdminHome;