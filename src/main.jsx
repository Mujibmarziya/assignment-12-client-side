import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Authprovider from './Authprovider/Authprovider.jsx'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { Route } from './Routes/Route.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Authprovider>
     <QueryClientProvider client={queryClient}>
    
    <RouterProvider router={Route}></RouterProvider>
 
    </QueryClientProvider>
    </Authprovider>
 
  <Toaster></Toaster>
  </React.StrictMode>,
)
