import axiosInstance from "../../../interceptor/interceptor";

export const getNotifType = async () => {
  let url = `/Notification/NotificationTypeList`;

  const response = await axiosInstance.get(url);
  return response.data; 
};
