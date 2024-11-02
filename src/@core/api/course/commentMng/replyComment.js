import axiosInstance from "../../../interceptor/interceptor";

export const replayComment = async (formData) => {
    const url = `/Course/AddReplyCourseComment`;
const response = await axiosInstance.post(url , formData);
    return response.data;
};
