import axiosInstance from "../../interceptor/interceptor";

export const getAllWallet = async (queryValue) => {

    let url = `https://tahacode.ir/wallet/getAll`

    const response = await axiosInstance.get(url);
    
    return response.data;
};
