import axiosInstance from "../../interceptor/interceptor";

export const deleteLikePod = async (likeId) => {

    let url = `https://tahacode.ir/podcast/like/deleteMany`

    const response = await axiosInstance.delete(url, {
        data: {
            ids: [
                likeId  
            ]
        }
    });
        
    return response.data;
};
