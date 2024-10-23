import axiosInstance from "../../interceptor/interceptor";

export const getGroup = async (teacherId, id) => {
    const response = await axiosInstance.get(
        `/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${id}`);
    return response.data;
};
