
import axiosInstance from "../../interceptor/interceptor";

export const getBuilding = async () => {

const response = await axiosInstance.get('/Building');
    return response.data;
};
