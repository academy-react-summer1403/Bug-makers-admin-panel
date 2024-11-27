import axiosInstance from "../../../interceptor/interceptor";

export const activeWallet = async (walletData , id) => {

    let url = `https://tahacode.ir/wallet/active/access/${id}`

    const response = await axiosInstance.post(url , walletData);
    
    return response.data;
};
