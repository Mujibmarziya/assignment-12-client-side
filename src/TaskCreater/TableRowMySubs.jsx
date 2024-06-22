import React, { useContext } from 'react';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { axiosCommon } from '../Hooks/useAxiosCommon';
import { AuthContext } from '../Authprovider/Authprovider';
import toast from 'react-hot-toast';

const TableRowMySubs = ({row,refetch}) => {
    const { user } = useContext(AuthContext)
    const {title,_id,Task_details,dateOfSubmission,workerEmail,task_quantity,submission_Details,Payable_amount,submission_info,status} =row;

    const handlestatus = async (status) => {
        console.log(status,_id);
        const dataSub ={
            submissionId: _id,
            status:status,
            task_quantity,
            Payable_amount,
            userEmail: user.email
        }
         const userdata ={workerEmail,Payable_amount}
         console.log(userdata);
        try {
            const response = await axiosCommon.put(`/submissions/${_id}`, dataSub);
            toast.success(response.data.message);
            toast.success('status updated')
            if(status !=='Approved'){
                const response1 = await axiosCommon.post('/notifications',{message:'status updated '} );
                toast.success('status rejected')
            }
            if(response && status !=='Rejected'){
                const response = await axiosCommon.post('/users',{email:workerEmail,task_completion:parseInt(1),coins:parseInt(Payable_amount)} ); 
                // payable-amount =coins per task
                toast.success('Payment Done and task Completion of worker increased')
                // if(status !=='Approved'){
                //     const response1 = await axiosCommon.post('/notifications',{message:'status updated '} );
                //     toast.success('status rejected')
                // }
                if(status !=='Rejected'){
                    const response2 = await axiosCommon.post('/notifications',{message:'status updated and got coined'} );
                    toast.success('status approved')
                }
               
            }
            refetch();
           
        } catch (error) {
            console.error('Error approving submission:', error);
            toast.error('Failed to approve submission');
        }
    };

   
    return (
        
             <TableRow
       
       key={_id} 
       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
     >
       <TableCell component="th" scope="row">
        {title}
       </TableCell>
       <TableCell align="right">{Task_details}</TableCell>
       <TableCell align="right">{Task_details}</TableCell>
       <TableCell align="right">{dateOfSubmission}</TableCell> 
       <TableCell align="right"><h1 className='text-right lg:text-center'>{task_quantity}</h1></TableCell>
       <TableCell align="right">{submission_Details}</TableCell>
       <TableCell align="right">{Payable_amount}</TableCell> 
       <TableCell align="right">{submission_info}</TableCell> 
       <TableCell align="right">{status}</TableCell> 
      <div className='flex'>
      <Link onClick={()=>handlestatus('Approved')} className="btn m-4 text-white bg-blue-900" >
       Approve
     </Link>
     <Link  onClick={()=>handlestatus('Rejected')} className="btn m-4 text-white bg-blue-900" >
       Reject
     </Link>
     <Link className="btn m-4 text-white bg-blue-900" to={`subdetail/${_id}`}>Submissions Details</Link>
     
    
  {/* <h3 className="font-bold text-lg">Submission Details</h3>
    <h3 className="font-bold text-lg "><span className='text-blue-900'>Task Title:</span> {title}</h3>
    <p className="py-4"><span className='text-blue-900'>Task Details:</span>{Task_details}</p>
    <p className="py-4"><span className='text-blue-900'>Submissions Info:</span>{submission_info}</p>
    <p className="py-4"><span className='text-blue-900'>Payable Amount:</span>{Payable_amount}</p> */}
   
    
 
</div>
     </TableRow>
    
    );
};

export default TableRowMySubs;