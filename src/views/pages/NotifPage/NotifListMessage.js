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

const NotifListMessage = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getNotifMessage'],
    queryFn: getMessageListNotif,
  });

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data.filter((row) =>
        row.title?.includes(searchText.toLowerCase()) ||
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
      name: 'آیدی سازنده',
      selector: (row) => row.createByInfo,
    },
    {
      name: 'عنوان پیام',
      selector: (row) => row.title,
      cell : row => (
        <Tooltip title={row.title} placement='top-end' >
            <span
              style={{
                width:'150px',
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap'
              }}
            >
              {row.title}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'توضیحات پیام',
      selector: (row) => row.describeText,
      cell : row => (
        <Tooltip title={row.describeText} placement='top-end' >
            <span
              style={{
                width:'150px',
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap'
              }}
            >
              {row.describeText}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'آدرس آیکون',
      selector: (row) => row.notificationIcon,
      cell : row => (
        <Tooltip title={row.notificationIcon} placement='top-end' >
            <span
              style={{
                width:'150px',
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap'
              }}
            >
              {row.notificationIcon}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'وضعیت حذف بودن',
      selector: (row) => row.isDelete,
      sortable: true,
      cell : row => (
        <Badge color={row.isDelete ? 'danger' : 'success'} >{row.isDelete ? 'حذف شده' : 'فعال'}</Badge>
      )
    },
    {
      name: 'وضعیت  آرشیو',
      selector: (row) => row.inArchive,
      sortable: true,
      cell : row => (
        <Badge color={row.inArchive ? 'success' : 'danger'} >{row.inArchive ? 'آرشیو شده' : 'آرشیو نشده'}</Badge>
      )
    },
    {
      name: 'تاریخ انتشار',
      selector: (row) => useDay(row.insertDate),
    },
    {
      name: 'عملیات',
      cell: (row) => (
      <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown >
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-basic">
            <Menu />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <EditMessageNotif title={'ویرایش'} row={row} />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Button color='transparent' style={{textAlign:'center'}} onClick={() => deleteMessageNotificationsFun.mutate(row.id)}>حذف پیام اعلان</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      ),
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
        <EditMessageNotif title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس پیام اعلان و تاریخ       ..."
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

export default NotifListMessage;
