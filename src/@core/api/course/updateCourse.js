import axiosInstance from "../../interceptor/interceptor";

export const updateCourse = async (id, formData) => {
    const response = await axiosInstance.put('/Course', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
