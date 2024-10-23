import axiosInstance from "../../interceptor/interceptor";

export const getBlogListWithPagination = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = `/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=5000&SortingCol=InsertDate&SortType=${sorting ? sorting : 'DESC'}`;
  

  if (query) {
    url += `&Query=${query}`;
  }


  const response = await axiosInstance.get(url);
  return response.data; 
};
