
import axiosInstance from "../../../interceptor/interceptor";

export const getReplayComment = async (commentId , courseId) => {
const response = await axiosInstance.get(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`);
    return response.data;
};
