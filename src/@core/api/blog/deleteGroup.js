import axiosInstance from "../../interceptor/interceptor";

export const deleteGroup = async (formData) => {
    const response = await axiosInstance.delete('/CourseGroup', {
        data: formData
    });
    return response.data;
};
