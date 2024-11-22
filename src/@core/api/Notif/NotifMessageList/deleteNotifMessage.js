import axiosInstance from "../../../interceptor/interceptor";

export const deleteNotifMessage = async (TypeId) => {
let url = '/Notification/DeleteNotificationMessage';

  const response = await axiosInstance.delete(url , {data:{deleteEntityId:TypeId}});
  return response.data; 
};
