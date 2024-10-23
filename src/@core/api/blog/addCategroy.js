import axiosInstance from "../../interceptor/interceptor";

export const addCategory = async (data, uuid) => {
    const response = await axiosInstance.post(
        `/Course/AddCourseTechnology?=${uuid}`, 
        data 
    );
    return response.data;
};
