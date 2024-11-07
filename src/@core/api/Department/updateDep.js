import axiosInstance from "../../interceptor/interceptor";

export const UpdateDep = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
  const response = await axiosInstance[method]('/Department' , BulldingData);
  return response.data; 
};
