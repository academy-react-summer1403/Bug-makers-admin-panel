import axiosInstance from "../../interceptor/interceptor";

export const deleteGroupPage = async (id) => {

    const formData = new FormData();
    formData.append('Id',id)
    const response = await axiosInstance.delete('/CourseGroup' , {data :formData});
  return response.data; 
};
