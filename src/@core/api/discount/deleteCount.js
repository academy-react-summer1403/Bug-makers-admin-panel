import axiosInstance from "../../interceptor/interceptor";

export const DeleteCountCourse = async (id) => {

    let url = `https://tahacode.ir/DisCost/${id}`

    const response = await axiosInstance.delete(url);
    
    return response.data;
};
