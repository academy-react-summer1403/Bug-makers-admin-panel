
import axiosInstance from "../../../interceptor/interceptor";

export const getMainCheckList = async () => {

const response = await axiosInstance.get('/Tournament/MainCheckLists');
    return response.data;
};
