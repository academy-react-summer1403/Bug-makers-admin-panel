import axiosInstance from "../../interceptor/interceptor";

export const getAllExam = async () => {
let url = 'https://tahacode.ir/Exam/exam';


  const response = await axiosInstance.get(url);
  return response.data; 
};
