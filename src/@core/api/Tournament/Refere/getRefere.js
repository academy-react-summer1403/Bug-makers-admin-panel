
import axiosInstance from "../../../interceptor/interceptor";

export const getRefere = async () => {

const response = await axiosInstance.get('/Tournament/ListOfReferesUser');
    return response.data;
};
