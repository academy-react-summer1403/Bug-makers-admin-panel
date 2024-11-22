import axiosInstance from "../../../interceptor/interceptor";

export const CreateNotif = async (BulldingData ) => {

    const response = await axiosInstance.post('/Notification/SendNotificationMessage' , BulldingData);
  return response.data; 
};
