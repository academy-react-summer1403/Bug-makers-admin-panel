import axiosInstance from "../../interceptor/interceptor";

export const getDisCount = async () => {
    const response = await axiosInstance.get(
        'https://tahacode.ir/DisCost/All'
    );
    return response.data;
};
