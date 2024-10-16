import axiosInstance from "../../interceptor/interceptor";

export const getLikeCount = async (courseId) => {
  const response = await axiosInstance.post(`/Course/AddCourseLike?CourseId=${courseId}`);
  return response.data; 
  };
  