import axiosInstance from "../../interceptor/interceptor";

export const UpdatePodcastApi = async (values , id) => {

    let url = id ? `https://tahacode.ir/podcast/update?id=${id}` : 'https://tahacode.ir/podcast/create'
    let method = id ? 'put' : 'post'
    const response = await axiosInstance[method](url, values);
    
    return response.data;
};
