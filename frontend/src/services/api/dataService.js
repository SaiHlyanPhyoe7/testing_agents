import axiosClient from '../../api/axiosClient.js'

export const fetchProductList = async () => {
  const response = await axiosClient.get('/products')
  return response.data
}
