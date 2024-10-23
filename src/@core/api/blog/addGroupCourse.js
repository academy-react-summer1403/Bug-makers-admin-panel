import axiosInstance from "../../interceptor/interceptor";

export const addGroupCourse = async (data) => {

    const response = await axiosInstance.post(
        '/CourseGroup', data ) 
    return response.data;
};
