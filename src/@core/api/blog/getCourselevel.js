import axiosInstance from "../../interceptor/interceptor";

export const getAllDataCreateCourse = async () => {
  const response = await axiosInstance.get('/Course/GetCreate');
  return response.data; 
};
