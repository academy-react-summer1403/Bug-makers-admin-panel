import axiosInstance from "../../interceptor/interceptor";

export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/User/UserDetails/${userId}`);
    return response.data;
  };


  export const getUser = async (searchQueryUser) => {
    let url =  `/User/UserMannage?PageNumber=1&RowsOfPage=5000&Query=${searchQueryUser}`



  const response = await axiosInstance.get(url);
  return response.data; 
};
