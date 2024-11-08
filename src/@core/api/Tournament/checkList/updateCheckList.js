import axiosInstance from "../../../interceptor/interceptor";

export const UpdateCheckList = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateCheckList' : '/Tournament/AddCheckList'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
