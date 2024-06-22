import axios from 'axios'

export const axiosCommon = axios.create({
  baseURL: 'https://assignment-12-server-beige-five.vercel.app',
})
const useAxiosCommon = () => {
  return axiosCommon
}

export default useAxiosCommon
