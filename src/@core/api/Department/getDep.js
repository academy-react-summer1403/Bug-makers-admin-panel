
import axiosInstance from "../../interceptor/interceptor";

export const getDep = async () => {

const response = await axiosInstance.get('/Department');
    return response.data;
};
