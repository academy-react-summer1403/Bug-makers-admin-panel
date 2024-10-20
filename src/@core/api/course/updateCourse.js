import axiosInstance from "../../interceptor/interceptor";

export const updateCourse = async (formData) => {
    const response = await axiosInstance.put('/Course', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
