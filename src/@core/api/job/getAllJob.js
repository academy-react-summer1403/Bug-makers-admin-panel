import axiosInstance from "../../interceptor/interceptor";

export const getAllJob = async () => {
let url = '/SharePanel/GetJobHistoriesAdmin';


  const response = await axiosInstance.get(url);
  return response.data; 
};

export const UpdateWork = async (data) => {
  let url = `/SharePanel/HistoryToIndex?JobId=${data.id}&show=${data.show}`;
  
  
    const response = await axiosInstance.post(url);
    return response.data; 
  };
  
export const deleteJobApi = async (id) => {
  let url = `/SharePanel/DeleteJobHistory?HistoryId=${id}`;
  
  
    const response = await axiosInstance.delete(url);
    return response.data; 
  };
  
  