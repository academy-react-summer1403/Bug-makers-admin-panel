import axiosInstance from "../../../interceptor/interceptor";

export const getTech = async () => {
    const response = await axiosInstance.get('/Technology');
    return response.data;
};
