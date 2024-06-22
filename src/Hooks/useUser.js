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
   
    },
  });

  return [users, isLoading];
};

export default useUsers;