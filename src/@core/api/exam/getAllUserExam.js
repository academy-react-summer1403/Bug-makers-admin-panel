import axiosInstance from "../../interceptor/interceptor";

export const getAllUserExam = async () => {
let url = 'https://tahacode.ir/Exam/AllUser';


  const response = await axiosInstance.get(url);
  return response.data; 
};
