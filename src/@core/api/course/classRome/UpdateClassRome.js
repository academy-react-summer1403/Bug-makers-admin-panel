import axiosInstance from "../../../interceptor/interceptor";

export const UpdateClassRome = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = '/ClassRoom'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
