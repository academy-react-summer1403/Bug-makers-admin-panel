
import axiosInstance from "../../../interceptor/interceptor";

export const getAssWork = async () => {

const response = await axiosInstance.get('/AssistanceWork');
    return response.data;
};
