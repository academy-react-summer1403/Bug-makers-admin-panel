
import axiosInstance from "../../interceptor/interceptor";

export const getAssCourse = async () => {

const response = await axiosInstance.get('/CourseAssistance');
    return response.data;
};
