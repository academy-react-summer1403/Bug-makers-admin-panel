import axiosInstance from "../../interceptor/interceptor";

export const UpdateWallet = async (values , id) => {
    let url = id ? `https://tahacode.ir/wallet/update/${id}` : `https://tahacode.ir/wallet/create`
    let method = id ? 'put' : 'post'
    const response = await axiosInstance[method](url, values);
    
    return response.data;
};
