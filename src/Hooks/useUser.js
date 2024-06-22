import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';
import { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';


const useUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosCommon();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['use-items', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure('/users');
      return data;
    //   const filtered = data.find((dat) => dat.email == user?.email);

    //   if (filtered) {
    //     console.log(filtered.userCoin);
    //     return filtered.userCoin;
    //   } else {
    //     return 0; // Return an empty string if the user is not found
    //   }
    },
  });

  return [users, isLoading];
};

export default useUsers;