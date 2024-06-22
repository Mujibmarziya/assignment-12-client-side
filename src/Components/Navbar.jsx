

import { Link, NavLink } from 'react-router-dom'


import Container from './Container'
import { AuthContext } from '../Authprovider/Authprovider'
import { useContext } from 'react'
import useCoin from '../Hooks/UseCoin'

const Navbar = () => {
//   const axiosSecure = useAxiosSecure()
//   const { user, logOut } = useAuth()
const[coin] =useCoin()
const { user, logout } = useContext(AuthContext)
console.log(user);
//   const [isOpen, setIsOpen] = useState(false)

  // for modal
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const closeModal = () => {
//     setIsModalOpen(false)
//   }
//   const modalHandler = async () => {
//     console.log('I want to be a host')
//     try {
//       const currentUser = {
//         email: user?.email,
//         role: 'guest',
//         status: 'Requested',
//       }
//       const { data } = await axiosSecure.put(`/user`, currentUser)
//       console.log(data)
//       if (data.modifiedCount > 0) {
//         toast.success('Success! Please wait for admin confirmation')
//       } else {
//         toast.success('Please!, Wait for admin approval👊')
//       }
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//     } finally {
//       closeModal()
//     }
//   }

{/* <div className="navbar-end gap-3">
    
{
    user ? <div className='flex gap-2'>
        
    <div className="dropdown dropdown-end z-20">
    <div tabIndex={0} role="button" className="btn bg-black  flex btn-circle avatar">
   
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
      </div>
    </div>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
      <li>
        <NavLink >
        <a className="justify-between mt-2">
          Profile Name:
          <span className=" bg-white rounded-lg text-black text-semibold p-2">{user.displayName}</span>
        </a>
        </NavLink>
      </li>
      
      
    </ul>
  </div>
  
       <div>
        <li className='btn btn-ghost bg-black text-white'>
        <NavLink
                      to='/dashboard'
                      className=' btn btn-ghost  block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Dashboard
                    </NavLink>
        </li>
       <li className='btn btn-ghost bg-black text-white'>
    <NavLink  onClick={logout}>Log out</NavLink>
</li>

       </div>
       
  
</div>
:
<div className='flex gap-2 '>
     <li className='btn btn-ghost bg-black text-white'>
    <NavLink to='/login'>Log In</NavLink>
</li>
<li className='btn btn-ghost bg-black text-white'>
<NavLink 
 to="/signup"
 className={({ isActive, isPending }) =>
   isPending ? "pending" : isActive ? " text-white bg-black  p-2 ml-1 " : ""
 }
>Register</NavLink>
</li>

<li className='btn btn-ghost bg-black text-white'>
<NavLink 
 to="/signup"
 className={({ isActive, isPending }) =>
   isPending ? "pending" : isActive ? " text-white bg-black  p-2 ml-1 " : ""
 }
>Watch demo</NavLink>
</li>
</div>
}
</div> */}

  return (
    <div>
    <div className="navbar bg-base-100">
<div className="navbar-start">
<div className="dropdown">
<div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</div>
<ul tabIndex={0} className="   menu menu-sm dropdown-content  mt-3 z-[55] p-2 gap-2 shadow bg-base-100 rounded-box w-52">
<ul className="menu menu-horizontal flex flex-col  gap-3 px-1">

<li>
              <NavLink to="/" className="text-sm text-pink-800 font-semibold pr-1">
                Home
              </NavLink>
            </li>
            {
              user ? (
                <>
                 <li className='btn btn-ghost bg-blue-900  text-white'>
            <NavLink
                        
                          className=' btn btn-ghost  block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Coins: {coin}
                        </NavLink>
            </li>
                  <li>
                    <NavLink to="/dashboard" className="text-sm bg-blue-900 text-white font-semibold pr-1">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={logout} className="text-sm bg-blue-900 text-white font-semibold pr-1">
                      Log out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className="text-sm bg-blue-900 text-white font-semibold pr-1">
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className="text-sm bg-blue-900 text-white font-semibold pr-1">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className="text-sm bg-blue-900 text-white font-semibold pr-1">
                      Watch demo
                    </NavLink>
                  </li>
                </>
              )
            }



</ul>
</ul>
</div>
<Link to={'/'}><h1 className="btn btn-ghost text-xl text-blue-800">Coin Workers</h1></Link>
</div>
<div className="navbar-center hidden lg:flex">
<ul className="menu menu-horizontal gap-3 px-1">

 
</ul>
</div>
<div className="navbar-end gap-3 hidden lg:flex">

    
    {
        user ? <div className='flex gap-3'>
            
        <div className="dropdown dropdown-end z-20">
        <div tabIndex={0} role="button" className="btn bg-blue-900 flex btn-circle avatar">
       
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
          
          <li>
            <NavLink >
            <a className="justify-between mt-2">
              Profile Name:
              <span className=" bg-white rounded-lg text-black text-semibold p-2">{user.displayName}</span>
            </a>
            </NavLink>
          </li>
          
          
        </ul>
      </div>
      
           <div className='flex gap-3'>
           <li className='btn btn-ghost bg-blue-900 text-white'>
            <NavLink
                        
                          className=' btn btn-ghost  block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                         Coins: {coin}
                        </NavLink>
            </li>
          
            <li className='btn btn-ghost bg-blue-900 text-white'>
            <NavLink
                          to='/dashboard'
                          className=' btn btn-ghost  block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </NavLink>
            </li>
           <li className='btn btn-ghost bg-blue-900 text-white'>
        <NavLink  onClick={logout}>Log out</NavLink>
    </li>
    
           </div>
           
      
    </div>
    :
    <div className='flex gap-2 '>
         <li className='btn btn-ghost bg-blue-900 text-white'>
        <NavLink to='/login'>Log In</NavLink>
    </li>
    <li className='btn btn-ghost bg-blue-900 text-white'>
    <NavLink 
     to="/signup"
     className={({ isActive, isPending }) =>
       isPending ? "pending" : isActive ? " text-white bg-blue-900  p-2 ml-1 " : ""
     }
    >Register</NavLink>
    </li>
    
    <li className='btn btn-ghost bg-blue-900 text-white'>
    <NavLink 
     to="/signup"
     className={({ isActive, isPending }) =>
       isPending ? "pending" : isActive ? " text-white bg-blue-900 p-2 ml-1 " : ""
     }
    >Watch demo</NavLink>
    </li>
    </div>
    }
    
</div>
</div>
 </div>
    
             
  )
}

export default Navbar
