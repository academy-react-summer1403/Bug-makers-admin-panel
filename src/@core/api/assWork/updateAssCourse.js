import axiosInstance from "../../interceptor/interceptor";

export const UpdateAssCourse = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
  const response = await axiosInstance[method]('/CourseAssistance' , BulldingData);
  return response.data; 
};
