import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';
import { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';


const useCoin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosCommon();

  const { data: coin = 0, isLoading } = useQuery({
    queryKey: ['coin', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure('/users');
      const filtered = data.find((dat) => dat.email == user?.email);
        console.log(filtered);
      if (filtered) {
        console.log(filtered.userCoin);
        return filtered.userCoin;
      } else {
        return 0; // Return an empty string if the user is not found
      }
    },
  });

  return [coin, isLoading];
};

export default useCoin;