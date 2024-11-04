import axios from "axios";

export const uploadImage = async (formData) => {
  const response = await axios.post('https://tahacode.ir/file' , formData);
  return response.data; 
};
