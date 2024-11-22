import axiosInstance from "../../../interceptor/interceptor";

export const UpdateNotifType = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    const url = row ? '/Notification/UpdateNotificationType' : '/Notification/CreateNotificationType'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
