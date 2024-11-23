import axiosInstance from "../../../interceptor/interceptor";

export const getClassRome = async () => {
    const response = await axiosInstance.get('/ClassRoom');
    return response.data;
};
