import axiosInstance from "../../interceptor/interceptor";

export const DeleteWallet = async (id) => {

    let url = `https://tahacode.ir/wallet/delete/${id}`

    const response = await axiosInstance.delete(url);
    
    return response.data;
};
