import axiosInstance from "../../interceptor/interceptor";

export const getProfileInfo = async () => {
    const response = await axiosInstance.get(
        '/SharePanel/GetProfileInfo'
    );
    return response.data;
};
