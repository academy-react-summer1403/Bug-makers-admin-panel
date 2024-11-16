import axiosInstance from "../../interceptor/interceptor";

export const UpdateSession = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Session/UpdateSession' : '/Session/AddSession'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
