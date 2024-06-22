import axios from 'axios'

export const axiosCommon = axios.create({
  baseURL: 'http://localhost:5002',
})
const useAxiosCommon = () => {
  return axiosCommon
}

export default useAxiosCommon
