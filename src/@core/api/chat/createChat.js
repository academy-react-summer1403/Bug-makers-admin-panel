import axiosInstance from "../../interceptor/interceptor";

export const createChat = async (chatMessage) => {

const response = await axiosInstance.post('https://tahacode.ir/Text' , chatMessage);
        return response.data;
    };
    