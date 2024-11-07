
import axiosInstance from "../../interceptor/interceptor";

export const getSocialGroup = async () => {

const response = await axiosInstance.get('/CourseSocialGroup');
    return response.data;
};
