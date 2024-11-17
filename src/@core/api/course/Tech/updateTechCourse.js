import axiosInstance from "../../../interceptor/interceptor";

export const UpdateCourseTech = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = '/Technology'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
