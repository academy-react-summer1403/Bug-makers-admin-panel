import axiosInstance from "../../../interceptor/interceptor";

export const UpdateTermDate = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Term/UpdateTermCloseDate' : '/Term/AddTermCloseDate'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
