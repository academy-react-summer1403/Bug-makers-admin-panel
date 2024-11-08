import axiosInstance from "../../../interceptor/interceptor";

export const UpdateRefere = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateReferee' : '/Tournament/AddReferee'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
