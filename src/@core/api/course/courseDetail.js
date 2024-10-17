import axiosInstance from "../../interceptor/interceptor"
import { useParams } from "react-router-dom"

export const getCourseDetail = async (id) => {

    const response = await axiosInstance.get(
      '/Course/' + id
    )
    return response.data
  }