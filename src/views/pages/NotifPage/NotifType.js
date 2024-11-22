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
import { Skeleton } from '@mui/material';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import EditNotifType from '../../../components/common/modal/editNotifType';
import { deleteNotifType } from '../../../@core/api/Notif/notifType/deleteNotifType';

const NotifType = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getNotifTypes'],
    queryFn: getNotifType,
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
  const deleteTypeNotificationsFun = useMutation({
    mutationKey:['deleteTypeNotif'],
    mutationFn: (TypeId) => deleteNotifType(TypeId)
  })

  const columns = [
    {
      name: 'آیدی سازنده',
      selector: (row) => row.createByInfo,
    },
    {
      name: 'تاریخ انتشار',
      selector: (row) => useDay(row.insertDate),
    },
    {
      name: 'عنوان تایپ اعلان',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'توضیحات تایپ اعلان',
      selector: (row) => row.describe,
      sortable: true,
    },
    {
      name: 'عملیات',
      cell: (row) => (
      <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-basic">
            <Menu />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <EditNotifType title={'ویرایش'} row={row} />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Button color='transparent' style={{textAlign:'center'}} onClick={() => deleteTypeNotificationsFun.mutate(row.id)}>حذف تایپ اعلان</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <EditNotifType title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس تایپ اعلان و تاریخ       ..."
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

export default NotifType;
