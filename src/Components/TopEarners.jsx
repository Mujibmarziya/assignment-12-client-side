import React, { useContext, useEffect, useState } from 'react';
import useUser from '../Hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon, { axiosCommon } from '../Hooks/useAxiosCommon';
import { AuthContext } from '../Authprovider/Authprovider';
import SingleUserCard from './SingleUserCard';

const TopEarners = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosCommon()
    // const [users] = useUser()
    // console.log(users.length);
    // const [topUsers, setTopUsers] = useState([]);

    // useEffect(() => {
    //     // Sort the users by userCoin in descending order
    //     const sortedUsers = [...users].sort((a, b) => b.userCoin - a.userCoin);

    //     // Get the top 6 users
    //     const topSixUsers = sortedUsers.slice(0, 6);

    //     setTopUsers(topSixUsers);
    // }, [users]);
    // console.log(topUsers);
    const {
        data: users = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['top-users', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get('/users')
          // console.log(data);
          const filteredd = data.filter((dats)=>dats.role=='worker')
          const sortedUsers = [...filteredd].sort((a, b) => b.userCoin - a.userCoin);

    //     // Get the top 6 users
        const topSixUsers = sortedUsers.slice(0, 6);
         
          return topSixUsers;
        },
      })
      console.log(users);
    return (
        <div className='mt-6 w-11/12 mb-5 mx-auto'>
        <div className=''>
            <h1 className='text-center text-black  font-bold '> Top Six Earners</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
            {
                users.map(singleuser=>(
                   <SingleUserCard key={singleuser._id} singleuser={singleuser}></SingleUserCard>
                ))
            }
           
        </div>
        
    </div>
    );
};

export default TopEarners;