import axiosInstance from "../../interceptor/interceptor";

export const getBlogListWithPagination = async (query, teacherId, categoryQuery, active, endDate , sorting , minCost , maxCost) => {
  let url = `/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=5000&SortingCol=InsertDate`;
  

  if (query) {
    url += `&Query=${query}`;
  }
  if (active != undefined) {
    url += `&IsActive=${active}`;
  }


  const response = await axiosInstance.get(url);
  return response.data; 
};
