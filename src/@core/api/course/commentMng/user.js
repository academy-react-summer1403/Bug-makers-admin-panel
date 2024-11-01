import axiosInstance from "../../../interceptor/interceptor";

export const getUserComment = async () => {
    const response = await axiosInstance.get('/User/UserMannage?PageNumber=1&RowsOfPage=5000');
    return response.data;
};
