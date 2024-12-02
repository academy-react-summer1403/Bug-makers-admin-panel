import axiosInstance from "../../interceptor/interceptor";

export const getExamById = async (examId) => {
let url = `https://tahacode.ir/Exam/exam/${examId}`;


  const response = await axiosInstance.get(url);
  return response.data; 
};
