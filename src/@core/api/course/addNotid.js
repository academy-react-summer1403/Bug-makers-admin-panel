import axiosInstance from "../../interceptor/interceptor";

export const createNotifCourse = async (data) => {
  const response = await axiosInstance.post('/Notification/SendNotificationMessageCourseUsers' , data);
  return response.data;
};
