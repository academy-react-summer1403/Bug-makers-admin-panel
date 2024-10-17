import axiosInstance from "../../interceptor/interceptor";

export const getCourseListWithPagination = async (query, teacherId, categoryQuery, startDate, endDate , sorting , minCost , maxCost) => {
  let url = `/Course/CourseList?PageNumber=1&RowsOfPage=300&SortingCol=Active&SortType=${sorting ? sorting : 'DESC'}`;
  

  if (query) {
    url += `&Query=${query}`;
  }

  if (teacherId) {
    url += `&TeacherId=${teacherId}`;
  }

  if (categoryQuery) {
    url += `&TechCount=1&ListTech=${categoryQuery}`;
  }

  if (startDate) {
    url += `&StartDate=${startDate}`;
  }
  if (endDate) {
    url += `&EndDate=${endDate}`;
  }
  if (minCost) {
    url += `&CostDown=${minCost}`;
  }
  if (maxCost) {
    url += `&CostUp=${maxCost}`;
  }

  const response = await axiosInstance.get(url);
  return response.data; 
};
