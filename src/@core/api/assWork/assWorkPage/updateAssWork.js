import axiosInstance from "../../../interceptor/interceptor";

export const UpdateAssWork = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
  const response = await axiosInstance[method]('/AssistanceWork' , BulldingData);
  return response.data; 
};
