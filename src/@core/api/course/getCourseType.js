import axiosInstance from "../../interceptor/interceptor";

export const getCourseType = async () => {
  const response = await axiosInstance.get('/CourseType/GetCourseTypes');
  return response.data; 
};
