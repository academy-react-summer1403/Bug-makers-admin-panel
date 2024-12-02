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
import { Menu, Plus } from 'react-feather';
import { Skeleton } from '@mui/material';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import EditNotifType from '../../../components/common/modal/editNotifType';
import { deleteNotifType } from '../../../@core/api/Notif/notifType/deleteNotifType';
import { getAllWallet } from '../../../@core/api/wallet/getAllWallet';
import EditWallet from '../../../components/common/modal/editWallet';
import { DeleteWallet } from '../../../@core/api/wallet/deleteWallet';
import CostUp from '../../../components/common/modal/CostUp';
import { getUser } from '../../../@core/api/user/getUserById';
import { SendEmailActive } from '../../../@core/api/wallet/active/sendMail';
import ActiveWallet from '../../../components/common/modal/activeWallet';
import { getDisCount } from '../../../@core/api/discount/disCount';
import { getCourseAllUser } from '../../../@core/api/course/getAllCByUser';
import { DeleteCountCourse } from '../../../@core/api/discount/deleteCount';
import CreateDisCount from '../../../components/common/modal/createDisCount';
import { getAllUserExam } from '../../../@core/api/exam/getAllUserExam';

const UserExam = () => {
  const itemsPerPage = 8;
    const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['getUserExam'],
    queryFn: getAllUserExam,
  });
  const { data: user } = useQuery({
    queryKey: ['getUserList'],
    queryFn: getUser
  });
  console.log(user);
  const [userList, setUserList] = useState([]);
  const [combinedData, setCombinedData] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

console.log(user);
  useEffect(() => {
    if (data?.data && user?.listUser) {
      const combinedData = data?.data?.map((userItem) => {
        const matchingUser = user?.listUser?.find(
          (listUserItem) => listUserItem.id === Number(userItem.UserId)
        );
        
        if (matchingUser) {
          return {
            ...matchingUser,
            ...userItem,
          };
        }
        console.log(matchingUser);
  
        return null;
      }).filter((item) => item !== null);
  
      const filteredUsers = combinedData?.filter((user) => 
        user.fname?.toLowerCase().includes(searchText.toLowerCase())       );
  
      setCombinedData(filteredUsers); 
      setFilteredData(combinedData)
      setUserList(filteredUsers); 
    }
  }, [data, user , setSearchText]);

  useEffect(() => {
    if (searchText) {
      const result = userList?.filter((row) =>
        row.fname?.includes(searchText.toLowerCase())       );
      setFilteredData(result);
    }
  }, [searchText, data]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const deleteDisCount = useMutation({
    mutationKey:['deleteCount'],
    mutationFn: (data) => DeleteCountCourse(data),
    onSuccess: () => {
        queryClient.invalidateQueries('getCount')   
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
      name: 'نام دانشجو',
      selector: (row) => row.fname +' ' + row.lname,
    },
    {
      name: 'ایمیل کاربر',
      selector: (row) => row.gmail,
    },
    {
      name: 'درصد تست',
      selector: (row) => row.Percent,
    },
    {
      name: 'زمان آزمون',
      selector: (row) => row.Time,
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
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام کاربر..."
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

export default UserExam;
