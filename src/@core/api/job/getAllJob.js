import axiosInstance from "../../interceptor/interceptor";

export const getAllJob = async () => {
let url = 'https://tahacode.ir/jobs/getJobAdmin';


  const response = await axiosInstance.get(url);
  return response.data; 
};
