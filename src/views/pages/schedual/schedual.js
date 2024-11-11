import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setCourseList } from '../../../redux/CourseSlice';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import SearchBox from '../../../components/common/modal/SearchBox/SearchBox';
import DataTable from 'react-data-table-component';
import SelectOpt from '../../../components/common/modal/Select/SelectOpt';
import DateModal from '../../../components/Date/Date';
import PriceFilter from '../../../components/PriceFilter/PriceFilter';
import moment from 'moment-jalaali';
import Active from '../../../components/common/active/active';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '../../../components/common/modal/pagination';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { getBlogListWithPagination } from '../../../@core/api/blog/getCourseListWithPagination';
import { setBlogList } from '../../../redux/blogSlice';
import { getGroupData } from '../../../@core/api/groupPage/groupPage';
import { Button } from 'react-bootstrap';
import { deleteGroup } from '../../../@core/api/course/deleteGroup';
import { deleteGroupPage } from '../../../@core/api/groupPage/deleteGroup';
import Swal from 'sweetalert2';
import { title } from 'process';
import EditGroup from '../../../components/common/modal/editGroup';
import AddGroupCourse from '../../../components/common/modal/AddGroup';
import { Skeleton } from '@mui/material';
import CreateCategoryBlog from '../../../components/common/modal/createCategoryBlog';
import CreateSchedual from '../../../components/common/modal/createSchedual';
import { getAdminSchedual, getSchedualId } from '../../../@core/api/Schedual/schedual';
import { Badge, Input } from 'reactstrap';

const Schedual = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);
    const [startTime, setStartTime] = useState('1900/01/10')
    const [endTime, setEndTime] = useState('3000/01/10')
    const [schedualId, setSchedualId] = useState('')

    console.log(endTime);
    console.log(startTime);
  const dispatch = useDispatch();
  const blogListItem = useSelector((state) => state.blog.blogList);
  moment.loadPersian();
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD dddd'); 
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['getSchdual', startTime, endTime],
    queryFn: () => getAdminSchedual(startTime, endTime),
    enabled : !!endTime
    // keepPreviousData: true,
  });

//   useEffect(() => {
//     if (data) {
//       dispatch(setBlogList(data.courseDtos || data));
//     }
//   }, [data, dispatch]);

  const handleSearch = (e) => setQueryValue(e.target.value);

  const handleRemoveFilter = () => {
    setQueryValue('');
    // setTeacherId(null);
    // setCategoryQuery('');

  };

  const itemsPerPage = 8;
  const handleViewSwitch = () => setViewMode(viewMode === 'table' ? 'grid' : 'table');

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const queryClient = useQueryClient();

  const deleteGroupId = useMutation({
    mutationKey:['deleteGroupWithId'],
    mutationFn: (id) => deleteGroupPage(id),
    onSuccess: () => {
      queryClient.invalidateQueries('getGroup',  queryValue, teacherId, categoryQuery, minCost, maxCost, currentPage)    
    }
  })

  const handleDelete = (row) => {
    Swal.fire({
      title: 'از حذف این گروه مطمئنی؟',
      text: "این عمل غیرقابل بازگشت است!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن!',
      cancelButtonText: 'خیر، انصراف',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGroupId.mutate(row.groupId)
      }
    });
  }
  
  const columns = [
    {
      name: 'آیدی گروه ',
      selector: row => row.courseGroupId,
      sortable: true,
    },
    {
      name: 'ساعت شروع ',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'ساعت پایان',
      selector: row => row.endTime,
      sortable: true,
    },
    {
      name: 'تعداد در هفته ',
      selector: row => row.weekNumber,
      sortable: true,
    },
    {
      name: 'روز دوره',
      selector: row => useDay(row.startDate),
      sortable: true,
    },
    {
      name: 'حالت دوره',
      selector: row => row.forming,
      sortable: true,
      cell : row => (
        // <Badge color={row.forming ? 'success' : 'danger'} >{row.forming ? 'تشکیل شده' : 'تشکیل نشده'}</Badge>
        <Active
        isActive={row.forming}
        id={row.id}
        styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
        api="/Schedual/SchedualFroming"
        method="put"
        text2='تشکیل شده'
        text='تشکیل نشده'
      />  
    )
    },    
    {
      name: 'حضور غیاب دانشجو',
      selector: row => row.lockToRaise,
      sortable: true,
      cell : row => (
        <Active
        isActive={row.lockToRaise}
        id={row.id}
        styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
        api="/Schedual/LockToRiase"
        method="put"
        text2='نمیتوانند شرکت کنند'
        text='میتوانند شرکت کنند'
      />
      )
    },    
    {
      name: 'عملیات',
      cell: row => (
        <div onClick={() => setSchedualId(row.id)} className='d-flex justify-content-center align-items-center gap-1'>
            <CreateSchedual schedual={getSchdualDataid} />
        </div>
      )
    }
  ];

  const {data : getSchdualDataid} = useQuery({
    queryKey:['SchedualId' , schedualId],
    queryFn: () => getSchedualId(schedualId),
    enabled : !!schedualId
  })
  const {data : course } = useQuery({
    queryKey:['getCourses'],
    queryFn:getCourseListWithPagination
  })
  return (
    <div className='container mt-4'>
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <Input 
            type='date'
            name='startTime'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
        />
        <Input 
            type='date'
            name='endTime'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
        />
        <CreateSchedual />

      </div>



      <AnimatePresence>
        {viewMode === 'table' ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={itemsPerPage}
              paginationRowsPerPageOptions={[8, 15, 30]}
              responsive
              highlightOnHover
              noDataComponent={
                <div>
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              <Skeleton animation="wave"  height={50} width={1300} />
              </div>
            }
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
        
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedual;