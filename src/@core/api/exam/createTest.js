
import axiosInstance from "../../interceptor/interceptor";

export const createTest = async (examData) => {
let url = 'https://tahacode.ir/Exam/createTest';


  const response = await axiosInstance.post(url , examData);
  return response.data; 
};
