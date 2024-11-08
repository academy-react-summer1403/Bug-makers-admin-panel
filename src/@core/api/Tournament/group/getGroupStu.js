
import axiosInstance from "../../../interceptor/interceptor";

export const getTourGroupStu = async (group) => {

const response = await axiosInstance.get(`/Tournament/GetTournamentStudentGroupList?GroupId=${group}`);
    return response.data;
};


export const deleteTourGroupStu = async (groupId) => {

    const response = await axiosInstance.delete('/Tournament/DeleteStudentFromGroup' , {data : {deleteEntityId : groupId}});
        return response.data;
    };
    

export const UpdateTourGroupStu = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    let url = row ? '/Tournament/UpdateTournamentStudentGroup' : '/Tournament/AddTournamentStudentGroup'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
