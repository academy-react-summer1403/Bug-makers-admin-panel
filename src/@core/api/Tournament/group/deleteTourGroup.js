
import axiosInstance from "../../../interceptor/interceptor";

export const deleteTourGroup = async (groupId) => {

const response = await axiosInstance.delete('/Tournament/DeleteTournamentGroup' , {data : {deleteEntityId : groupId}});
    return response.data;
};
