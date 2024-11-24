import axiosInstance from "../../../interceptor/interceptor";

export const getAllTransaction = async (queryValue) => {

    let url = `https://tahacode.ir/wallet/Traction/getAll`

    const response = await axiosInstance.get(url);
    
    return response.data;
};
