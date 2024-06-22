
// import { useState } from 'react'

// import useRole from '../../../../hooks/useRole'
// import HostModal from '../../../Modal/HostRequestModal.jsx'

// import toast from 'react-hot-toast'
// import useAuth from '../../../../hooks/useAuth.js'
import MenuItem from './MenuItem.jsx'
import { IoIosHome } from 'react-icons/io'
import { MdAddComment } from 'react-icons/md'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { GrTask } from 'react-icons/gr'
// import useAxiosSecure from '../Hooks/UseAxiosSecure.jsx'
const WorkerMenu = () => {


  return (
    <>
      <MenuItem
        icon={IoIosHome}
        label='Worker Home'
        address='worker-home'
      />
      <MenuItem
        icon={GrTask}
        label='My Tasklists'
        address='my-tasklists'
      />
      <MenuItem
        icon={MdAddComment}
        label='My Submissions'
        address='my-submissions'
      />
      <MenuItem
        icon={BiMoneyWithdraw}
        label='Withdrawal'
        address='withdrawal'
      />

    
    </>
  )
}

export default WorkerMenu
