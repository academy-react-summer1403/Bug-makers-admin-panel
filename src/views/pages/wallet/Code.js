import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Delete, Menu, Plus } from 'react-feather';
import { Skeleton, Tooltip } from '@mui/material';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import EditNotifType from '../../../components/common/modal/editNotifType';
import { deleteNotifType } from '../../../@core/api/Notif/notifType/deleteNotifType';
import { getAllWallet } from '../../../@core/api/wallet/getAllWallet';
import EditWallet from '../../../components/common/modal/editWallet';
import { DeleteWallet } from '../../../@core/api/wallet/deleteWallet';
import CostUp from '../../../components/common/modal/CostUp';
import { getUser } from '../../../@core/api/user/getUserById';
import { SendEmailActive } from '../../../@core/api/wallet/active/sendMail';
import { getAllActive } from '../../../@core/api/wallet/active/getAll';
import { FaRecycle } from 'react-icons/fa';
import { resetData } from '../../../@core/api/wallet/active/resetData';

const Code = () => {
  const itemsPerPage = 8;
    const queryClient = useQueryClient()

  const [userList, setUserList] = useState([]);
  const [combinedData, setCombinedData] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();

  const { data: userAll } = useQuery({
    queryKey: ['getAllActiveCode'],
    queryFn: getAllActive
  });

  useEffect(() => {
    if (userAll) {
      const result = userAll?.data?.filter((row) =>
        row.email?.includes(searchText.toLowerCase())       );
      setFilteredData(result);
    }
  }, [searchText , userAll]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const deleteData = useMutation({
    mutationKey:['deleteCode'],
    mutationFn: () => resetData(),
    onSuccess: () => {
        queryClient.invalidateQueries('getAllActiveCode')   
    }
  })


  const sendEmail = useMutation({
    mutationKey:['activeEmail'],
    mutationFn: (row) => SendEmailActive(row)
  })


  const handleSendMail = (row) => {
    sendEmail.mutate(row)
  }
  const columns = [
    {
      name: 'ایمیل',
      selector: (row) => row.email
    },
    {
      name: 'کد تایید',
      selector: (row) => row.Code,
    },

  ];

  const customStyles = {
    table: {
      style: {
        minHeight: '500px',
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <Tooltip title='حذف داده' placement='top' >
            <Delete className='cursor-pointer' onClick={() => deleteData.mutate()} />
        </Tooltip>
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس  ایمیل..."
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

export default Code;
