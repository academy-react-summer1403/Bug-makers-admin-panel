import { useSelector } from "react-redux";
import axiosInstance from "../../interceptor/interceptor";

export const updateCourse = async (formData , course) => {

    const method = course?.courseId ? 'put' : 'post';
    const url = '/Course'

    console.log(course);
    const response = await axiosInstance[method](url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
