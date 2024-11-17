
import axiosInstance from "../../interceptor/interceptor";

export const getAllChat = async () => {

const response = await axiosInstance.get('https://tahacode.ir/help/AdminAll');
    return response.data;
};
export const getChatById = async (id) => {

const response = await axiosInstance.get(`https://tahacode.ir/help/HelpById/${id}`);
    return response.data;
};
