import axiosInstance from "../../../interceptor/interceptor";

export const DeleteTransaction = async (id) => {

    let url = `https://tahacode.ir/wallet/Traction/delete/${id}`

    const response = await axiosInstance.delete(url);
    
    return response.data;
};
