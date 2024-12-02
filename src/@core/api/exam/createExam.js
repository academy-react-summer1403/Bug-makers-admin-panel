import axiosInstance from "../../interceptor/interceptor";

export const createExam = async (examData) => {
let url = 'https://tahacode.ir/Exam/exam';


  const response = await axiosInstance.post(url , examData);
  return response.data; 
};
