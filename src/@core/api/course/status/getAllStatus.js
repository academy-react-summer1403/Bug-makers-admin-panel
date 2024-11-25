import axiosInstance from "../../../interceptor/interceptor";

export const getAllStatus = async () => {
    const response = await axiosInstance.get('/Status');
    return response.data;
};
