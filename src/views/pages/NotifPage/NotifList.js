import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Button } from 'reactstrap';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { getDep } from '../../../@core/api/Department/getDep';
import EditDep from '../../../components/common/modal/editDep';
import { getAssCourse } from '../../../@core/api/assWork/getAssCourse';
import EditAssCourse from '../../../components/common/modal/editAssCourse';
import { getAssWork } from '../../../@core/api/assWork/assWorkPage/getAssWork';
import EditAssWork from '../../../components/common/modal/editAssWork';
import { Dropdown } from 'react-bootstrap';
import { Menu, Plus } from 'react-feather';
import { Skeleton, Tooltip } from '@mui/material';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import EditNotifType from '../../../components/common/modal/editNotifType';
import { deleteNotifType } from '../../../@core/api/Notif/notifType/deleteNotifType';
import { getMessageListNotif } from '../../../@core/api/Notif/NotifMessageList/getNotifMessageList';
import EditMessageNotif from '../../../components/common/modal/EditMessageNotif';
import { deleteNotifMessage } from '../../../@core/api/Notif/NotifMessageList/deleteNotifMessage';
import { getUserNotif } from '../../../@core/api/Notif/NotifList/getUserNotif';
import SendNotif from '../../../components/common/modal/SendNotif';

const NotifList = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getUserNotifList'],
    queryFn: getUserNotif,
  });

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data.filter((row) =>
        row.userId == searchText.toLowerCase() ||
        useDay(row.insertDate).toLowerCase().includes(searchText.toLowerCase()) 
      );
      setFilteredData(result);
    }
  }, [searchText, data]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const deleteMessageNotificationsFun = useMutation({
    mutationKey:['deleteMessageNotif'],
    mutationFn: (TypeId) => deleteNotifMessage(TypeId)
  })

  const columns = [
    {
      name: 'آیدی کاربر',
      selector: (row) => row.userId,
    },
    {
      name: 'وضعیت  خواندن',
      selector: (row) => row.isRead,
      sortable: true,
      cell : row => (
        <Badge color={row.isRead ? 'success' : 'danger'} >{row.isRead ? 'خوانده شده' : 'خوانده نشده'}</Badge>
      )
    },
    {
      name: 'تاریخ انتشار',
      selector: (row) => useDay(row.insertDate),
    },
    {
      name: 'تاریخ خواندن',
      selector: (row) => useDay(row.readDate),
      cell: row => (
        <span>{row.readDate !== null ? useDay(row.readDate) : 'خوانده نشده'}</span>
      )
    },
  ];

  const customStyles = {
    table: {
      style: {
        minHeight: '300px', 
        height: 'auto', 
      },
    },
    
  };
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <SendNotif title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس آیدی کاربر و تاریخ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DataTable
            columns={columns}
            data={filteredData} 
            pagination
            customStyles={customStyles}
            noDataComponent={
              <div >
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
          </div> 
            }
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[8, 15, 30]}
            responsive
            highlightOnHover
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotifList;
