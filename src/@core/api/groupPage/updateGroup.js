import axiosInstance from "../../interceptor/interceptor";

export const updateGroupWithId = async (formData) => {

  const response = await axiosInstance.put('/CourseGroup' , formData);
  return response.data; 
};
