import axiosInstance from "../../interceptor/interceptor";

export const deleteExam = async (examId) => {
let url = `https://tahacode.ir/Exam/exam/${examId}`;


  const response = await axiosInstance.delete(url);
  return response.data; 
};
