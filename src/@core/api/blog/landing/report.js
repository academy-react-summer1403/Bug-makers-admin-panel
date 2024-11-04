import axiosInstance from "../../../interceptor/interceptor";

export const getLandingReport = async () => {
const response = await axiosInstance.get('/Home/LandingReport');
  return response.data; 
};
