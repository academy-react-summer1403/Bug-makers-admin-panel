import axiosInstance from "../../../interceptor/interceptor";

export const deleteNotifType = async (TypeId) => {
let url = '/Notification/DeleteNotificationType';

  const response = await axiosInstance.delete(url , {data:{deleteEntityId:TypeId}});
  return response.data; 
};
