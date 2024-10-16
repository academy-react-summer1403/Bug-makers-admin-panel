import axiosInstance from "../../interceptor/interceptor";

export const getTeacherList = async () => {
  const response = await axiosInstance.get('/Home/GetTeachers');
  return response.data; 
  console.log(response.data);
};
