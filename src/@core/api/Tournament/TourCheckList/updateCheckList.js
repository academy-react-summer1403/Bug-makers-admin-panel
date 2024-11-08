import axiosInstance from "../../../interceptor/interceptor";

export const UpdateCheckListTour = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateTournamentCheckList' : '/Tournament/AddTournamentCheckListCommand'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
