import axiosInstance from "../../interceptor/interceptor";

export const acceptReserve = async (reserveData) => {
    const response = await axiosInstance.post('/CourseReserve/SendReserveToCourse', reserveData);
    return response.data;
  };