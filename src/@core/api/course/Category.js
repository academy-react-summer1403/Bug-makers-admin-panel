import axiosInstance from "../../interceptor/interceptor";

export const getCategoryList = async () => {
  const response = await axiosInstance.get('/Home/GetTechnologies');
  return response.data;
};
