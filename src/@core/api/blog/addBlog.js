import axiosInstance from "../../interceptor/interceptor";

export const AddBlog = async (formData , course) => {

    const url = '/News/CreateNews'

    const response = await axiosInstance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
