import axiosInstance from "../../../interceptor/interceptor";

export const getAllActive = async (row) => {

    let url = 'https://tahacode.ir/wallet/active/'

    const response = await axiosInstance.get(url );
    
    return response.data;
};
