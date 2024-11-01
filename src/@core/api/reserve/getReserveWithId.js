import axiosInstance from "../../interceptor/interceptor";

export const getCourseReserveWithId = async (id) => {
    const response = await axiosInstance.get(`/CourseReserve/${id}`);
    return response.data;
  };