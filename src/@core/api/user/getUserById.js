import axiosInstance from "../../interceptor/interceptor";

export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/User/UserDetails/${userId}`);
    return response.data;
  };


  export const getUser = async (searchQueryUser) => {
    let url =  `/User/UserMannage?PageNumber=1&RowsOfPage=5000`

    if(searchQueryUser){
      url += `&Query=${searchQueryUser}`;
    }

  const response = await axiosInstance.get(url);
  return response.data; 
};
  export const updateUser = async (userData) => {
    let url =  `/User/UpdateUser`

  const response = await axiosInstance.put(url , userData);
  return response.data; 
};
