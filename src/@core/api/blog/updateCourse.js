import axiosInstance from "../../interceptor/interceptor";

export const updateBlog = async (formData , course) => {

    const method = course  ? 'put' : 'post';
    const url = '/News/UpdateNews'

    const response = await axiosInstance[method](url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
