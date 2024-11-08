import axiosInstance from "../../../interceptor/interceptor";

export const getRefereId = async (refId, TourId) => {

const response = await axiosInstance.get(`Tournament/ListOfTurnamentReferes?TournamentId=${TourId}&refeerUserId=${refId}`);
    return response.data;
};
