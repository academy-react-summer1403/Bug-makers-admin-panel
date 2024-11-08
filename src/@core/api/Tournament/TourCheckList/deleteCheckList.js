
import axiosInstance from "../../../interceptor/interceptor";

export const deleteTourCheckList = async (groupId) => {

const response = await axiosInstance.delete('/Tournament/TournamentCheckLists' , {data : {deleteEntityId : groupId}});
    return response.data;
};
