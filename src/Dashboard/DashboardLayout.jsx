import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

import Navbar from '../Components/Navbar'
import DashboardNavbar from './DashboardNavbar'
import Footer from '../Components/Footer'

const DashboardLayout = () => {
  return (
    <div className='flex flex-col'>
     <div className='z-[88]'>
     <DashboardNavbar></DashboardNavbar>
     </div>
      <div className='relative   md:flex' >
       

      
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
       <Footer></Footer>
      </div>
    </div>
    </div>
  )
}

export default DashboardLayout
