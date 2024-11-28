import axiosInstance from "../../interceptor/interceptor";

export const CreateDisCountApi = async (disCount , Pcost , PODID) => {
    const url = `https://tahacode.ir/DisCost/?discount=${disCount}&Pcost=${Pcost}&PODID=${PODID}`;

    const response = await axiosInstance.post(url);
    
    return response.data;
};
