import { useQuery } from 'react-query';
import axiosInstance from './axiosInstance';

const fetchUsers = async ({ page = 0, rowsPerPage = 10, sortCol = 'DESC', sortType = 'InsertDate', query = '', isActiveUser = true, isDeletedUser = true, roleId = null }) => {
  const response = await axiosInstance.get('/User/UserMannage', {
    params: {
      PageNumber: page,
      RowsOfPage: rowsPerPage,
      SortingCol: sortCol,
      SortType: sortType,
      Query: query,
      IsActiveUser: isActiveUser,
      IsDeletedUser: isDeletedUser,
      roleId: roleId
    }
  });
  return response.data;
};

const useUsers = (page, rowsPerPage, query, sortCol, sortType, isActiveUser, isDeletedUser, roleId) => {
  return useQuery(
    ['users', page, rowsPerPage, query, sortCol, sortType, isActiveUser, isDeletedUser, roleId],
    () => fetchUsers({ page, rowsPerPage, query, sortCol, sortType, isActiveUser, isDeletedUser, roleId })
  );
};
