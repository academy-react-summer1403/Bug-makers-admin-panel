import axiosInstance from "../../interceptor/interceptor"
import { useParams } from "react-router-dom"

export const getCommentBlogMap = async (id) => {

    const response = await axiosInstance.get('https://classapi.sepehracademy.ir/api/News?PageNumber=1&RowsOfPage=10')
    return response.data
  }
export const getCommentListBlog = async (id) => {

    const response = await axiosInstance.get(`/News/GetNewsComments?NewsId=${id}`)
    return response.data
  }

  