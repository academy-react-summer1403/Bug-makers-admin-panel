import axiosInstance from "../../../interceptor/interceptor";

export const getMessageListNotif = async () => {
  let url = '/Notification/NotificationMessageList';

  const response = await axiosInstance.get(url);
  return response.data; 
};
