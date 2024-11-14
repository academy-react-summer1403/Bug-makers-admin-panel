import axiosInstance from "../../interceptor/interceptor";

export const getCommentPodcast = async () => {

    let url = `https://tahacode.ir/podcast/comment/All`

    const response = await axiosInstance.get(url);
    
    return response.data;
};
export const getLikePodcast = async () => {

    let url = `https://tahacode.ir/podcast/like/getAllAdmin`

    const response = await axiosInstance.get(url);
    
    return response.data;
};


export const deleteCommentPodcastApi = async (id) => {

    let url = `https://tahacode.ir/podcast/comment/delete/${id}`

    const response = await axiosInstance.delete(url);
    
    return response.data;
};

export const UpdatePodcastCommentApi = async (values , id) => {

    let url = id ? `https://tahacode.ir/podcast/comment/update/${id}` : 'https://tahacode.ir/podcast/comment/create'
    let method = id ? 'put' : 'post'
    const response = await axiosInstance[method](url, values);
    
    return response.data;
};
