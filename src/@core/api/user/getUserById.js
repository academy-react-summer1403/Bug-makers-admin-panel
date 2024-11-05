import axiosInstance from "../../interceptor/interceptor";

export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/User/UserDetails/${userId}`);
    return response.data;
  };