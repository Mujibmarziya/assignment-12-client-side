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

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {/* <img src="https://i.ibb.co/qn2Qrjs/icons8-task-24.png" alt="" /> */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}><MdOutlineTask></MdOutlineTask></button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <h3 className="font-bold text-lg">Task Details</h3>
    <h3 className="font-bold text-lg "><span className='text-blue-900'>Task Title:</span> {title}</h3>
    <p className="py-4"><span className='text-blue-900'>Task Details:</span>{Task_details}</p>
    <p className="py-4"><span className='text-blue-900'>Submissions Info:</span>{submission_info}</p>
    <p className="py-4"><span className='text-blue-900'>Payable Amount:</span>{Payable_amount}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        {/* <TableCell align="right">
        <label htmlFor={`role-select-${_id}`} className='block mb-4 text-sm'>Select Role:</label>
          <select
            name="role"
            id={`role-select-${_id}`}
            value={rolee}
            className='border-2 p-3 rounded-xl'
            onChange={handleRoleChange}
          >
            <option>Select an option</option>
            <option value="worker">worker</option>
            <option value="task-creator">Task Creator</option>
            <option value="admin">Admin</option>
          </select>
          </TableCell>  */}
        {/* <TableCell align="right">
       
     
     
    {/* </TableCell> */}
      </TableRow>
    );
};

export default TableRowManageTasks;