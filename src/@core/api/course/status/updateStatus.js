import axiosInstance from "../../../interceptor/interceptor";

export const UpdateStatus = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = '/Status'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
