import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const TaskCreaterMenu = () => {
  return (
    <>
    <MenuItem icon={BsFillHouseAddFill} label='Home' address='task-creater-home' />
      <MenuItem icon={BsFillHouseAddFill} label='Add New Task' address='add-items' />
      <MenuItem icon={MdHomeWork} label='My Tasks' address='my-tasks' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Purchase History'
        address='Purchase-History'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Purchase Coin'
        address='Purchase-coin'
      />
    </>
  )
}

export default TaskCreaterMenu
