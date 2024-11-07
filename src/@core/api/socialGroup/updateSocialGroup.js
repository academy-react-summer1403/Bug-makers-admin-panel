import axiosInstance from "../../interceptor/interceptor";

export const UpdateSocialGroup = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
  const response = await axiosInstance[method]('/CourseSocialGroup' , BulldingData);
  return response.data; 
};
