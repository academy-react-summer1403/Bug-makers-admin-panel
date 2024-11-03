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

const GroupPage = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const blogListItem = useSelector((state) => state.blog.blogList);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getGroup', queryValue, teacherId, categoryQuery, minCost, maxCost, currentPage],
    queryFn: () => getGroupData(queryValue,  currentPage, itemsPerPage, ''),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setBlogList(data.courseDtos || data));
    }
  }, [data, dispatch]);

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
      name: 'نام گروه',
      selector: row => row.groupName,
      sortable: true,
    },
    {
      name: 'نام دوره',
      selector: row => row.courseName,
      sortable: true,
    },
    {
      name: 'نام تیچر ',
      selector: row => row.teacherName,
      sortable: true,
    },
    {
      name: 'ظرفیت دوره',
      selector: row => row.courseCapacity,
      sortable: true,
    },
    {
      name: 'ظرفیت گروه',
      selector: row => row.groupCapacity,
      sortable: true,
    },    
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          <EditGroup  id={row.groupId} CourseId={row.courseId} GroupName={row.groupName} size='14px' GroupCapacity={row.groupCapacity} />
          <Button size='sm' variant='danger' onClick={() => handleDelete(row)}>حذف گروه</Button>
        </div>
      )
    }
  ];

  const {data : course } = useQuery({
    queryKey:['getCourses'],
    queryFn:getCourseListWithPagination
  })
  return (
    <div className='container mt-4'>
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='دنبال چی میگردی'
          value={queryValue}
          onChange={handleSearch}
        />
        <AddGroupCourse courses={course?.courseDtos} />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder='استاد دوره'
          isTeacherSelect={true}
          onChange={setTeacherId}
        />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder='دسته‌بندی'
          onChange={setCategoryQuery}
        />
        {/* <DateModal onFilter={(startDate, endDate) => {}} /> */}
        {/* <PriceFilter
          width={"100%"}
          lgWidth={"160px"}
          onFilter={handlePriceFilter}
        /> */}
        <button className='btn btn-light' onClick={handleRemoveFilter}>
          حذف تمامی فیلتر
        </button>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <ThreeDots color="#007bff" height={80} width={80} />
        </div>
      )}
      {error && <p>خطایی رخ داده است...</p>}

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
              data={data?.courseGroupDtos}
              pagination
              paginationPerPage={itemsPerPage}
              paginationRowsPerPageOptions={[8, 15, 30]}
              responsive
              highlightOnHover
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* <div className='d-flex flex-wrap justify-content-center gap-4 mt-3'>
              {blogListItem.news.map((course) => (
                  <motion.div
                    key={course.courseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseListItems
                      id={course.id}
                      title={course.title}
                      img={course.currentImageAddressTumb}
                      technologyList={course.technologyList}
                      description={course.miniDescribe}
                      teacherName={course.addUserFullName}
                      likeCount={course.likeCount}
                      commandCount={course.commandCount}
                      courseRate={course.courseRate}
                      statusName={course.statusName}
                      price={course.cost}
                      currentRegistrants={course.currentRegistrants}
                      date={moment(course.lastUpdate).format('jYYYY/jMM/jDD')}
                    />
                  </motion.div>
                ))}
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupPage;