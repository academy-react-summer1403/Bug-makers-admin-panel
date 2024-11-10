import axiosInstance from "../../interceptor/interceptor";

export const AddRoleUser = async (data) => {
  const response = await axiosInstance.post('/User/AddUserAccessList' , data);
  return response.data;
};
