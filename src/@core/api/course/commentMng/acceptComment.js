
import axiosInstance from "../../../interceptor/interceptor";

export const acceptComment = async ( commentId) => {
    const url = `/Course/AcceptCourseComment?CommentCourseId=${commentId}`;
const response = await axiosInstance.post(url);
    return response.data;
};
export const deleteCommentApi = async ( commentId) => {
    const url = `/Course/RejectCourseComment?CommentCourseId=${commentId}`;
const response = await axiosInstance.post(url);
    return response.data;
};
export const deleteCommentApiFull = async ( commentId) => {
    const url = `/Course/DeleteCourseComment?CourseCommandId=${commentId}`;
const response = await axiosInstance.delete(url);
    return response.data;
};
export const updatingComment = async (formData) => {
    const url = `/Course/UpdateCourseComment`;
const response = await axiosInstance.put(url , formData);
    return response.data;
};
