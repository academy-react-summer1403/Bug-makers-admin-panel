
import axiosInstance from "../../../interceptor/interceptor";

export const getTourGroupMentor = async (group) => {
const response = await axiosInstance.get(`/Tournament/GetGroupMentorList?GroupId=${group}`);
    return response.data;
};


export const deleteTourGroupMentor = async (groupId) => {

    const response = await axiosInstance.delete('/Tournament/DeleteMentorFromGroup' , {data : {deleteEntityId : groupId}});
        return response.data;
    };
    

export const UpdateTourGroupMentor = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateTournamentStudentGroup' : '/Tournament/AddMentorToGroup'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
