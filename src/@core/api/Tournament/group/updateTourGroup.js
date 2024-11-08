import axiosInstance from "../../../interceptor/interceptor";

export const UpdateTourGroup = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateTournamentGroup' : '/Tournament/AddTournamentGroup'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
