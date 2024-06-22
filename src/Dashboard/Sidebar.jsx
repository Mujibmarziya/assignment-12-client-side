import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
// import { BsFingerprint, BsFillHouseAddFill } from 'react-icons/bs'
// import { GrUserAdmin } from 'react-icons/gr'
// import { MdHomeWork } from 'react-icons/md'
import { AiOutlineBars } from 'react-icons/ai'
// import { BsGraphUp } from 'react-icons/bs'
// import { NavLink } from 'react-router-dom'
// import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'
// import useRole from '../../../hooks/useRole'
// import MenuItem from './Menu/MenuItem'


import WorkerMenu from './WorkerMenu'
import TaskCreaterMenu from './TaskCreaterMenu'
import AdminMenu from './AdminMenu'
import { AuthContext } from '../Authprovider/Authprovider'
import MenuItem from './MenuItem'
import useRole from '../Hooks/UseRole'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  const [isActive, setActive] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [role, isLoading] = useRole()
// const [role, isLoading] = useState('admin')
  console.log(role,'from userole')
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

//   const toggleHandler = event => {
//     setToggle(event.target.checked)
//   }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100  text-gray-800 mt-11 flex justify-between md:hidden'>
        <div>
          {/* <div className='block cursor-pointer p-4 font-bold'>
          <Link to={'/'}><h1 className="btn btn-ghost text-xl text-pink-800">Coin Workers</h1></Link>
          </div> */}
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden  min-h-40 my-auto bg-gray-200 w-64 space-y-6 px-2  py-16 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-blue-100 mx-auto'>
            <Link to={'/'}><h1 className="btn btn-ghost text-xl text-blue-800">Coin Workers</h1></Link>
            </div>
          </div> */}

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
           

         
            <nav>
            
             
              {role === 'worker' && <WorkerMenu />}
              {role === 'task-creator' && <TaskCreaterMenu />}
              {role === 'Admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        {/* <div>
          <hr />

          
          <MenuItem
            label='Profile'
            address='/dashboard/profile'
            icon={FcSettings}
          />

          <button
            onClick={logout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div> */}
      </div>
    </>
  )
}

export default Sidebar
