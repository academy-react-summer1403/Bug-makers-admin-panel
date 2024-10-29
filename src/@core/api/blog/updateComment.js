import axiosInstance from "../../interceptor/interceptor";

export const UpdateComment = async (data) => {
  const response = await axiosInstance.put('/News/UpdateNewsComment' , data );
  return response.data; 
  };
  