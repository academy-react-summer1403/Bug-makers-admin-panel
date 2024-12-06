import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Button } from 'reactstrap';
import moment from 'moment-jalaali';
import { Dropdown } from 'react-bootstrap';
import { Menu, Plus } from 'react-feather';
import { Skeleton, Tooltip } from '@mui/material';
import { SendEmailActive } from '../../../@core/api/wallet/active/sendMail';
import { getCourseAllUser } from '../../../@core/api/course/getAllCByUser';
import { DeleteCountCourse } from '../../../@core/api/discount/deleteCount';
import CreateDisCount from '../../../components/common/modal/createDisCount';
import { deleteVideo, getVideoAll } from '../../../@core/api/video/videoApi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CreateVideo from '../../../components/common/modal/createVideo';
import ShowGroupVideo from '../../../components/common/modal/showGroupVideo';

const VideoPage = () => {
  const itemsPerPage = 8;
    const queryClient = useQueryClient()
  const { data , isLoading} = useQuery({
    queryKey: ['getVideo'],
    queryFn: getVideoAll,
  });
  const { data: course } = useQuery({
    queryKey: ['getAllUserList'],
    queryFn: getCourseAllUser
  });
  const [userList, setUserList] = useState([]);
  const [combinedData, setCombinedData] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

console.log(course);
  useEffect(() => {
    if (data && course?.courseFilterDtos) {
      const combinedData = data?.map((userItem) => {
        const matchingUser = course?.courseFilterDtos?.find(
          (listUserItem) => listUserItem.courseId === userItem.courseId
        );
        
        if (matchingUser) {
          return {
            ...matchingUser,
            ...userItem,
          };
        }
  
        return null;
      }).filter((item) => item !== null);
  
      const filteredUsers = combinedData?.filter((user) => 
        user.title?.toLowerCase().includes(searchText.toLowerCase())       );
  
      setCombinedData(filteredUsers); 
      setFilteredData(combinedData)
      setUserList(filteredUsers); 
    }
  }, [data, course , setSearchText]);

  useEffect(() => {
    if (searchText) {
      const result = userList?.filter((row) =>
        row.title?.includes(searchText.toLowerCase())       );
      setFilteredData(result);
    }
  }, [searchText, data]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const deleteVideoFun = useMutation({
    mutationKey:['deleteVideoKey'],
    mutationFn: (id) => deleteVideo(id),
    onSuccess: () => {
        queryClient.invalidateQueries('getVideo')  
        toast.success('ویدیو حذف شد') 
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
      name: 'عنوان دوره',
      cell: (row) => <Link to={'/apps/Detail/' + row.courseId} >{row.title}</Link>,
    },
    {
      name: 'تعداد گروه',
      selector: (row) => row.groups.length,
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
            <Dropdown.Item >
              <ShowGroupVideo isLoading={isLoading} row={row} />
            </Dropdown.Item>
            <Dropdown.Item >
              <Button color='transparent' style={{textAlign:'center' , border:'none'}} onClick={() => deleteVideoFun.mutate(row.id)}>حذف ویدیو</Button>
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
        minHeight: '500px',
      },
    },
  };
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
      <CreateVideo title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام دوره..."
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

export default VideoPage;
