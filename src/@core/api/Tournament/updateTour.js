import axiosInstance from "../../interceptor/interceptor";

export const UpdateTour = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateTournament' : '/Tournament/AddTournament'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
