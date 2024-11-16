
import axiosInstance from "../../interceptor/interceptor";

export const getSession = async (sessionId) => {

const response = await axiosInstance.get(`/Session/SessionDetail?SessionId=${sessionId}`);
    return response.data;
};
