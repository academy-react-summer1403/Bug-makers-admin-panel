import axiosInstance from "../../interceptor/interceptor";

export const addCategory = async (data, uuid) => {
    const response = await axiosInstance.post(
        `/Course/AddCourseTechnology?courseId=${uuid}`, 
        data 
    );
    return response.data;
};
