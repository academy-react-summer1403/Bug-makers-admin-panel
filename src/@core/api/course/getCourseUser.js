import axiosInstance from "../../interceptor/interceptor";

export const getCourseUser = async (courseId , searchValue) => {
  let url = `/CourseUser/GetCourseUserList?Query=${searchValue}&CourseId=${courseId}`;


  const response = await axiosInstance.get(url);
  return response.data; 
};
