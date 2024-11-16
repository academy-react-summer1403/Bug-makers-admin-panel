
import axiosInstance from "../../interceptor/interceptor";

export const getHomeWork = async (sessionId) => {

const response = await axiosInstance.get(`/Session/GetSessionHomeWork?SessionId=${sessionId}`);
    return response.data;
};


export const UpdateHomeWork = async (BulldingData , row) => {

    let url = '/Session/AddSessionHomeWork'
  const response = await axiosInstance.post(url , BulldingData);
  return response.data; 
};
