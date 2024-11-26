import axiosInstance from "../../../interceptor/interceptor";

export const sendEmailActive = async (id , emailData) => {

    let url = `https://tahacode.ir/wallet/active/${id}`

    const response = await axiosInstance.post(url , emailData);
    
    return response.data;
};
