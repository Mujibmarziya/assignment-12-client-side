import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { MdOutlineTask } from "react-icons/md";
const TableRowManageTasks = ({row,handleDelete,refetch}) => {
    const {title,_id, image, submission_info,task_quantity,dateTime, Task_details,Payable_amount,to,from, email,displayname,userphoto} =row;
    const CoinNeeded=Payable_amount*task_quantity;
    return (
        <TableRow
   
        key={_id} 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        {/* <TableCell component="th" scope="row">
         <img src={image} alt="" />
        </TableCell> */}
        
        <TableCell align="right">{title}</TableCell>
        <TableCell align="right">{CoinNeeded}</TableCell> 
        <TableCell align="right">{task_quantity}</TableCell>
        <TableCell align="right">{Payable_amount}</TableCell> 
        <TableCell align="right">{displayname}</TableCell> 
        <TableCell align="right"> {task_quantity < 0 ? 'No' : 'Yes'}</TableCell>  
        <Link onClick={()=>handleDelete(_id)} className="btn m-4 text-white bg-blue-900">
            Delete
          </Link>

          <Link className="btn m-4 text-white bg-blue-900" to={`managetaskdetail/${_id}`}> Details</Link>

        
       
      </TableRow>
    );
};

export default TableRowManageTasks;