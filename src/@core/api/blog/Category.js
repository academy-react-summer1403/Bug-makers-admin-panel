import axiosInstance from "../../interceptor/interceptor";

export const getCategoryListBlog = async () => {
  const response = await axiosInstance.get('/News/GetListNewsCategory');
  return response.data;
};
