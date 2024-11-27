import axiosInstance from "../../../interceptor/interceptor";

export const SendEmailActive = async (row) => {

    let url = `https://tahacode.ir/wallet/active/${row.id}`

    const response = await axiosInstance.post(url , { "email" :row.gmail});
    
    return response.data;
};
