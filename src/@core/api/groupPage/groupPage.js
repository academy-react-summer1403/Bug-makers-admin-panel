import axiosInstance from "../../interceptor/interceptor";

export const getGroupData = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = `/CourseGroup?PageNumber=1&RowsOfPage=5000&SortingCol=DESC&SortType=Expire`;
  

  if (query) {
    url += `&Query=${query}`;
  }
  if (query) {
    url += `&Query=${query}`;
  }


  const response = await axiosInstance.get(url);
  return response.data; 
};
