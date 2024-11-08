
import axiosInstance from "../../../interceptor/interceptor";

export const getTourCheckList = async (TourId) => {

const response = await axiosInstance.get(`/Tournament/TournamentCheckLists?TournamentId=${TourId}`);
    return response.data;
};
