import axiosInstance from "../../../interceptor/interceptor";

export const resetData = async () => {

    let url = 'https://tahacode.ir/wallet/active/'

    const response = await axiosInstance.delete(url);
    
    return response.data;
};
