import axiosInstance from "../../../interceptor/interceptor";

export const getCommentCoursePage = async (query, teacherId, categoryQuery, startDate, endDate , sorting , user , acceptSelect) => {
    let url = `/Course/CommentManagment?PageNumber=1&RowsOfPage=5000`;


  

  if (query) {
    url += `&Query=${query}`;
  }

  if (teacherId) {
    url += `&TeacherId=${teacherId}`;
  }

  if (categoryQuery) {
    url += `&TechCount=1&ListTech=${categoryQuery}`;
  }

  if (user) {
    url += `&userId=${user}`;
  }
  if (acceptSelect !== undefined) {
    url += `&Accept=${acceptSelect}`;
  }

  const response = await axiosInstance.get(url);
  return response.data; 
};
