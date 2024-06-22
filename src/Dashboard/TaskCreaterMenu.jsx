import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdOutlinePayment, MdOutlineManageHistory,MdOutlineAddTask,MdTask } from 'react-icons/md'
import MenuItem from './MenuItem'
const TaskCreaterMenu = () => {
  return (
    <>
    <MenuItem icon={BsFillHouseAddFill} label='Home' address='task-creater-home' />
      <MenuItem icon={MdOutlineAddTask} label='Add New Task' address='add-items' />
      <MenuItem icon={MdTask} label='My Tasks' address='my-tasks' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Purchase History'
        address='Purchase-History'
      />
      <MenuItem
        icon={MdOutlinePayment}
        label='Purchase Coin'
        address='Purchase-coin'
      />
    </>
  )
}

export default TaskCreaterMenu
