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
import { getBlogListWithPagination } from '../../../@core/api/blog/getCourseListWithPagination';
import { setBlogList } from '../../../redux/blogSlice';
import { Dropdown, FormSelect } from 'react-bootstrap';
import { Menu } from 'react-feather';
import { Skeleton } from '@mui/material';

const BlogPage = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);
  const [active, setActive] = useState()

  const dispatch = useDispatch();
  const blogListItem = useSelector((state) => state.blog.blogList);
  console.log(blogListItem.news);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getblog', queryValue, teacherId, categoryQuery, minCost, active, currentPage],
    queryFn: () => getBlogListWithPagination(queryValue,  currentPage, itemsPerPage, active),
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

  const columns = [
    {
      name: 'عنوان',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'نام نویسنده مقاله',
      selector: row => row.addUserFullName,
      sortable: true,
    },
    {
      name: 'دسته بندی مقاله',
      selector: row => row.newsCatregoryName,
      sortable: true,
    },    
    {
      name: 'عملیات',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} size="sm" id="dropdown-actions">
            <Menu />
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/apps/blogDetail/${row.id}`} >
              <Link  to={'/apps/blogDetail/' + row.id}  className="me-2" />
              مشاهده
            </Dropdown.Item>
  
            <Dropdown.Item >
              <Active
                isActive={row.isActive}
                keyword={row.keyword}
                id={row.id}
                styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
                api="News/ActiveDeactiveNews"
                method="put"
                text='غیر فعال'
                text2='فعال'
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
        <FormSelect value={active} onChange={() => setActive(e.target.value)} placeholder={'وضعیت'}    style={{width:'200px'}}>
          <option  >انتخاب کنید</option>
          <option value={true} onClick={() => setActive(true)}>تاییده شده </option>
          <option value={false} onClick={() => setActive(false)}>در انتظار تایید</option>
        </FormSelect>
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
              data={blogListItem.news}
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
                      // technologyList={course.technologyList}
                      description={course.miniDescribe}
                      teacherName={course.addUserFullName}
                      // likeCount={course.likeCount}
                      // commandCount={course.commandCount}
                      // courseRate={course.courseRate}
                      // statusName={course.statusName}
                      // price={course.cost}
                      // currentRegistrants={course.currentRegistrants}
                      // date={moment(course.lastUpdate).format('jYYYY/jMM/jDD')}
                    />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;