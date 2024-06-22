import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layouts/Main'
import Errorpage from '../Errorpage/Errorpage'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Privateroute from './Privateroute'
import DashboardLayout from '../Dashboard/DashboardLayout'
import AddItems from '../TaskCreater/AddItems'
import MyTask from '../TaskCreater/MyTask'
import Update from '../TaskCreater/Update'
import TaskCreaterHome from '../TaskCreater/TaskCreaterHome'
import PurchaseCoin from '../TaskCreater/PurchaseCoin'
import PaymentHistory from '../TaskCreater/PaymentHistory'
import MyTaskListsWorker from '../Worker/MyTaskListsWorker'
import Details from '../Worker/Details'
import MySubmissions from '../Worker/MySubmissions'
import MyApprovedSubs from '../Worker/MyApprovedSubs'
import ManageUsers from '../AdminMenu/ManageUsers'
import ManageTasks from '../AdminMenu/ManageTasks'
import Withdrawal from '../Worker/Withdrawal'
import AdminHome from '../AdminMenu/AdminHome'


export const Route = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Errorpage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    //   {
    //     path: '/room/:id',
    //     element: (
    //       <PrivateRoute>
    //         <RoomDetails />
    //       </PrivateRoute>
    //     ),
    //   },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/dashboard',
    element: (
      <Privateroute>
        <DashboardLayout />
      </Privateroute>
    ),
    children: [
      {
        path: 'task-creater-home',
        element: (
          <Privateroute>
           <TaskCreaterHome></TaskCreaterHome>
          </Privateroute>
        ),
      },
      {
        index: true,
        path: 'add-items',
        element: (
          <Privateroute>
            <AddItems></AddItems>
          </Privateroute>
        ),
      },
      {
        path: 'my-tasks',
        element: (
          <Privateroute>
           <MyTask></MyTask>
          </Privateroute>
        ),
      },
      {
        path: 'Purchase-History',
        element: (
          <Privateroute>
           <PaymentHistory></PaymentHistory>
          </Privateroute>
        ),
      },
      {
        path: 'Purchase-coin',
        element: (
          <Privateroute>
          <PurchaseCoin></PurchaseCoin>
          </Privateroute>
        ),
      },
        // children:[
          {
        //     index: true,
            path: 'my-tasks/update/:_id',
            element: (
             <Update></Update> 
            ),
            loader: ({params}) => fetch(`https://assignment-12-server-beige-five.vercel.app/items/${params._id}`),
          },
          {
            path: 'my-tasklists',
            element: (
              <Privateroute>
              <MyTaskListsWorker></MyTaskListsWorker>
              </Privateroute>
            ),
          },
          {
            path: 'my-tasklists/detail/:_id',
            element: (
              <Privateroute>
              <Details></Details>
              </Privateroute>
            ),
            loader: ({params}) => fetch(`https://assignment-12-server-beige-five.vercel.app/items/${params._id}`),
          },
          {
            path: 'my-submissions',
            element: (
              <Privateroute>
              <MySubmissions></MySubmissions>
              </Privateroute>
            ),
          },
          {
            path: 'worker-home',
            element: (
              <Privateroute>
             <MyApprovedSubs></MyApprovedSubs>
              </Privateroute>
            ),
          },
          {
            path: 'manage-users',
            element: (
              <Privateroute>
            <ManageUsers></ManageUsers>
              </Privateroute>
            ),
          },
          {
            path: 'manage-tasks',
            element: (
              <Privateroute>
            <ManageTasks></ManageTasks>
              </Privateroute>
            ),
          },
          {
            index:true,
            path: 'admin-home',
            element: (
              <Privateroute>
            <AdminHome></AdminHome>
              </Privateroute>
            ),
          },
          {
            path: 'withdrawal',
            element: (
              <Privateroute>
            <Withdrawal></Withdrawal>
              </Privateroute>
            ),
          },
        // ]
   
    //   {
    //     index: true,
    //     element: (
    //       <PrivateRoute>
    //         <Statistics />
    //       </PrivateRoute>
    //     ),
    //   },
    
    
    //   {
    //     path: 'manage-users',
    //     element: (
    //       <PrivateRoute>
    //         <AdminRoute>
    //           <ManageUsers />
    //         </AdminRoute>
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'my-bookings',
    //     element: (
    //       <PrivateRoute>
    //         <MyBookings />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'manage-bookings',
    //     element: (
    //       <PrivateRoute>
    //         <HostRoute>
    //           <ManageBookings />
    //         </HostRoute>
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'profile',
    //     element: (
    //       <PrivateRoute>
    //         <Profile />
    //       </PrivateRoute>
    //     ),
    //   },
    ],
  },
])
