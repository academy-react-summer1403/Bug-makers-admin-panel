import axiosInstance from "../../../interceptor/interceptor";

export const UpdateTerm = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = '/Term'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
