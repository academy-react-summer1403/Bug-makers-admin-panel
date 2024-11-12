import axiosInstance from "../../interceptor/interceptor";

export const deletePayment = async (id) => {
    const formData = new FormData();
    formData.append('PaymentId' ,id)
  const response = await axiosInstance.delete('/CoursePayment' , {data : formData});
  return response.data;
};
