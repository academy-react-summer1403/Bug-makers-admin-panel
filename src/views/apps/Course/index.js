import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCourseList } from '../../../redux/CourseSlice';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import SearchBox from '../../../components/common/modal/SearchBox/SearchBox';
import DataTable from 'react-data-table-component';
import SelectOpt from '../../../components/common/modal/Select/SelectOpt';
import DateModal from '../../../components/Date/Date';
import PriceFilter from '../../../components/PriceFilter/PriceFilter';
import CourseListItems from './CourseListItems ';
import moment from 'moment-jalaali';
import Active from '../../../components/common/active/active';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '../../../components/common/modal/pagination';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';

const CoursePage = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const CourseListItem = useSelector((state) => state.Course.CourseList);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getCourses', queryValue, teacherId, categoryQuery, minCost, maxCost, currentPage],
    queryFn: () => getCourseListWithPagination(queryValue, teacherId, categoryQuery, currentPage, itemsPerPage, '', minCost, maxCost),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCourseList(data.courseDtos || data));
    }
  }, [data, dispatch]);

  const handleSearch = (e) => setQueryValue(e.target.value);
  const handlePriceFilter = (min, max) => {
    setMinCost(min);
    setMaxCost(max);
  };

  const handleRemoveFilter = () => {
    setQueryValue('');
    setTeacherId(null);
    setCategoryQuery('');
    setMinCost(null);
    setMaxCost(null);
  };

  const itemsPerPage = 8;
  const handleViewSwitch = () => setViewMode(viewMode === 'table' ? 'grid' : 'table');

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const columns = [
    {
      name: 'عنوان',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'مدرس',
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: 'قیمت',
      selector: row => row.cost,
      sortable: true,
    },
    {
      name: 'آخرین آپدیت',
      selector: row => moment(row.lastUpdate).format('jYYYY/jMM/jDD'),
      sortable: true,
    },
    {
      name: 'وضعیت',
      selector: row => row.statusName,
      sortable: true,
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          <Link to={'/apps/Detail/' + row.courseId}>مشاهده</Link>
          <Active
            isActive={row.isActive}
            id={row.courseId}
            styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
            api="/Course/ActiveAndDeactiveCourse"
            method="put"
            text='غیر فعال'
            text2='فعال'
          />
        </div>
      )
    }
  ];

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
        <button className='btn btn-primary' onClick={handleViewSwitch}>
          {viewMode === 'table' ? 'نمایش به صورت شبکه' : 'نمایش به صورت جدول'}
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
              data={CourseListItem}
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
            <div className='d-flex flex-wrap justify-content-center gap-4 mt-3'>
              {CourseListItem
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((course) => (
                  <motion.div
                    key={course.courseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseListItems
                      courseId={course.courseId}
                      title={course.title}
                      img={course.tumbImageAddress}
                      technologyList={course.technologyList}
                      description={course.describe}
                      teacherName={course.teacherName}
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
            </div>
            <Pagination
              pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursePage;
