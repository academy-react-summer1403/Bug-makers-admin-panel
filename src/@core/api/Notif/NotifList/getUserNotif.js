import axiosInstance from "../../../interceptor/interceptor";

export const getUserNotif = async () => {
  let url = '/Notification/UserNotificationList';

  const response = await axiosInstance.get(url);
  return response.data; 
};
