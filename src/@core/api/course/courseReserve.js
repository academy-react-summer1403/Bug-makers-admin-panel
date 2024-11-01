import axiosInstance from "../../interceptor/interceptor";

export const getCourseReserve = async () => {
  const response = await axiosInstance.get('/CourseReserve');
  return response.data;
};

export const deleteCourseReserve = async (id) => {
  const response = await axiosInstance.delete('/CourseReserve' , {data : {id}});
  return response.data;
};
