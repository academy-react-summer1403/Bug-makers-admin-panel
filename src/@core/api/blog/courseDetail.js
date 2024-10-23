import axiosInstance from "../../interceptor/interceptor"
import { useParams } from "react-router-dom"

export const getBlogDetail = async (id) => {

    const response = await axiosInstance.get(
      '/News/' + id
    )
    return response.data
  }