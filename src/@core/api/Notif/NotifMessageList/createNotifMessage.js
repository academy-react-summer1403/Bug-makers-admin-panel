import axiosInstance from "../../../interceptor/interceptor";

export const UpdateNotificationMessage = async (BulldingData , row) => {

    const method = row ? 'put' : 'post'
    const url = row ? '/Notification/UpdateNotificationMessage' : '/Notification/CreateNotificationMessage'
  const response = await axiosInstance[method](url , BulldingData);
  return response.data; 
};
