import axiosInstance from "../../interceptor/interceptor";

export const getCoursePayment = async (id) => {
  const response = await axiosInstance.get(`/CoursePayment?CourseId=${id}`);
  return response.data;
};
