
import axiosInstance from "../../interceptor/interceptor";

export const getVideoAll = async () => {

const response = await axiosInstance.get('https://6751b883d1983b9597b40062.mockapi.io/courseVideo/courseVideo');
    return response.data;
};
export const deleteVideo = async (id) => {

const response = await axiosInstance.delete(`https://6751b883d1983b9597b40062.mockapi.io/courseVideo/courseVideo/${id}`);
    return response.data;
};
export const createVideo = async (data) => {

const response = await axiosInstance.post('https://6751b883d1983b9597b40062.mockapi.io/courseVideo/courseVideo' ,data);
    return response.data;
};
export const updateVideo = async (data , id) => {

const response = await axiosInstance.put(`https://6751b883d1983b9597b40062.mockapi.io/courseVideo/courseVideo/${id}` ,data);
    return response.data;
};
