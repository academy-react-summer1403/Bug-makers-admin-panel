
import axiosInstance from "../../../interceptor/interceptor";

export const getTourGroup = async (TourId) => {

const response = await axiosInstance.get(`/Tournament/TournamentGroupList?TournamentId=${TourId}`);
    return response.data;
};
