import axiosInstance from "../../interceptor/interceptor";

export const getCategoryListBlog = async () => {
  const response = await axiosInstance.get('/News/GetListNewsCategory');
  return response.data;
};


export const getCategoryId = async (id) => {
  const response = await axiosInstance.get(`/News/GetNewsCategory/${id}`);
  return response.data;
};

export const updateCategoryBlog = async (formData ) => {
  const response = await axiosInstance.put('/News/UpdateNewsCategory', formData);
  return response.data;
};
export const addCategoryBlog = async (formData ) => {
  const response = await axiosInstance.post('/News/CreateNewsCategory', formData);
  return response.data;
};
