import axiosInstance from "../../interceptor/interceptor";

export const UpdateBuildding = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
  const response = await axiosInstance[method]('/Building' , BulldingData);
  return response.data; 
};
