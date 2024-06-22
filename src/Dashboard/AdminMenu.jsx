import { FaUserCog } from 'react-icons/fa'
import { GrTask } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { FaUserFriends } from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Admin Home' address='admin-home' />
      <MenuItem icon={GrTask} label='Manage Tasks' address='manage-tasks' />
      <MenuItem icon={FaUserFriends} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu
