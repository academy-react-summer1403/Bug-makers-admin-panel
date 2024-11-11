import axiosInstance from "../../interceptor/interceptor";

export const getCourseGroupId = async (groupId) => {
  const response = await axiosInstance.get(`/CourseGroup/Details?Id=${groupId}`);
  return response.data; 
};
