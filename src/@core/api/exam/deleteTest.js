import axiosInstance from "../../interceptor/interceptor";

export const deleteTest = async (examId) => {
let url = `https://tahacode.ir/Exam/test/${examId}`;


  const response = await axiosInstance.delete(url);
  return response.data; 
};
