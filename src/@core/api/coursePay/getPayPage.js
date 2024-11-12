import axiosInstance from "../../interceptor/interceptor";

export const getPayPage = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = '/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10';
  

  const response = await axiosInstance.get(url);
  return response.data; 
};
