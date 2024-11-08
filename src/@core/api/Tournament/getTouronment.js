
import axiosInstance from "../../interceptor/interceptor";

export const getTournoment = async () => {

const response = await axiosInstance.get('/Tournament/GetTournament');
    return response.data;
};
