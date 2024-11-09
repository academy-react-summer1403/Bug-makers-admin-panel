
import axiosInstance from "../../../interceptor/interceptor";

export const getCheckListAvg = async (group , TourId , userId) => {
const response = await axiosInstance.get(`/Tournament/ListAvrageCheckListAdmin?GroupId=${group}&UserId=${userId}&TournamentId=${TourId}`);
    return response.data;
};


export const UpdateTourGroupAvg = async (BulldingData , row) => {

  const response = await axiosInstance.post('/Tournament/SetAvrageForGroupCheckList' , BulldingData);
  return response.data; 
};
