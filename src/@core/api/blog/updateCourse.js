import { useSelector } from "react-redux";
import axiosInstance from "../../interceptor/interceptor";

export const updateCourse = async (formData , course) => {

    const method = Array.isArray(course) && course.length > 0 ? 'put' : 'post';
    const url = '/Course'

    const response = await axiosInstance[method](url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
