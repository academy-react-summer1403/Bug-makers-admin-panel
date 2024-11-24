import axiosInstance from "../../../interceptor/interceptor";

export const UpdateTransaction = async (values , id) => {
    let url = `https://tahacode.ir/wallet/Traction/create`
    let method = 'post'
    const response = await axiosInstance[method](url, values);
    
    return response.data;
};
