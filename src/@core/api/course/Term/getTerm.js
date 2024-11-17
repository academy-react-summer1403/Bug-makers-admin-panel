import axiosInstance from "../../../interceptor/interceptor";

export const getTerm = async () => {
    const response = await axiosInstance.get('/Term');
    return response.data;
};
