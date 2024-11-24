import axiosInstance from "../../../interceptor/interceptor";

export const UpdateTransaction = async (values , id) => {
    let url = id ? `https://tahacode.ir/wallet/Traction/update/${id}` : `https://tahacode.ir/wallet/Traction/create`
    let method = id ? 'put' : 'post'
    const response = await axiosInstance[method](url, values);
    
    return response.data;
};
