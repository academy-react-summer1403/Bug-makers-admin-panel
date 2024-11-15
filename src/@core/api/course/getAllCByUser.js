import axiosInstance from "../../interceptor/interceptor"

export const getCourseAllUser = async (id) => {

    const response = await axiosInstance.get(
        '/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=5000'
    )
    return response.data
  }