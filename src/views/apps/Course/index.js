import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCourseList } from '../../../redux/CourseSlice';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import SearchBox from '../../../components/common/modal/SearchBox/SearchBox';
import CourseListItems from './CourseListItems ';
import Pagination from '../../../components/common/modal/pagination';
import SelectOpt from '../../../components/common/modal/Select/SelectOpt';
import DateModal from '../../../components/Date/Date';
import PriceFilter from '../../../components/PriceFilter/PriceFilter';
import moment from 'moment-jalaali';


const CoursePage = () => {
  // state variables
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState(''); 
  const [currentPage, setCurrentPage] = useState(0);
  const [listStyle, setListStyle] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sorting, setSorting] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);

  const itemsPerPage =9; 
  const dispatch = useDispatch();
  const CourseListItem = useSelector((state) => state.Course.CourseList);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['getCourses', queryValue, teacherId, categoryQuery, startDate, endDate, sorting, minCost, maxCost],
    queryFn: () => getCourseListWithPagination(queryValue, teacherId, categoryQuery, startDate, endDate, sorting, minCost, maxCost),
    keepPreviousData: true,
  });
  
  useEffect(() => {
    if (data) {
      dispatch(setCourseList(data.courseFilterDtos || data));
    }
  }, [data, dispatch]);
  
  const handleSearch = (e) => {
    setQueryValue(e.target.value); 
  };

  const handleRemoveFilter = () => {
    setQueryValue('');
    setTeacherId(null);  
    setCategoryQuery(''); 
    setFilterValue(true);
    setMinCost(null);
    setMaxCost(null);
    setTimeout(() => {
      setFilterValue(false);
    }, 100); 
  };

  const filterByDateRange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handlePriceFilter = (min, max) => {
    setMinCost(min);
    setMaxCost(max);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 952) {
        setListStyle(false);
      } else {
        setListStyle(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const convertToJalali = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const renderCourses = () => {
    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطایی رخ داده است...</p>;

    return CourseListItem
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      .map((course) => (
        <CourseListItems
          key={course.courseId}
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
          date={convertToJalali(course.lastUpdate)}
          listStyle={listStyle}
          />
        ));
  };

  return (
    <div className='container mt-4'>
      {/* searchAndFilterSection */}
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <SearchBox
          width={"100%"} 
          lgWidth={"160px"} 
          placeHolder='دنبال چی میگردی'
          value={`${filterValue ? '' : queryValue}`}
          onChange={handleSearch} 
        />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder='استاد دوره'
          isTeacherSelect={true} 
          onChange={(value) => setTeacherId(value)}
          FilterValue={filterValue}
        />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder='دسته‌بندی'
          onChange={(value) => setCategoryQuery(value)} 
          FilterValue={filterValue}
        />
        <DateModal onFilter={filterByDateRange} />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder="ترتیب نمایش"
          isSortSelect={true}
          onChange={(value) => setSorting(value)} 
          FilterValue={filterValue}
        />
        <PriceFilter
          width={"100%"}
          lgWidth={"160px"}
          onFilter={handlePriceFilter} />
        <span className='d-lg-none text-muted position-relative' style={{bottom: '2px', right: '4px'}}>
          تعداد {CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما یافت شد
        </span>
        <span className='d-lg-none btn btn-light' onClick={handleRemoveFilter}>
          حذف تمامی فیلتر
        </span>
      </div>

      {/* filterActionSection */}
      <div className='d-flex flex-wrap justify-content-end align-items-center mt-3'>
        <span className='d-none d-lg-block text-muted me-auto'>
          تعداد {CourseListItem.length} نتیجه از {data?.totalCount || 0} دوره طبق جستجوی شما یافت شد
        </span>
        <span className='d-none d-lg-block btn btn-light' onClick={handleRemoveFilter}>
          حذف تمامی فیلتر
        </span>


        {/* additionalActionButtons */}
        <div className='d-flex align-items-center gap-2'>
        </div>
      </div>

      {/* courseItemsSection */}
      <div className='d-flex flex-wrap justify-content-center gap-4 mt-3'>
        {renderCourses()}
      </div>

      {/* paginationSection */}
      <Pagination
        pageCount={Math.ceil(CourseListItem.length / itemsPerPage)}
        handlePageClick={(data) => setCurrentPage(data.selected)}
        currentPage={currentPage} 
      />
    </div>
  );
};

export default CoursePage;
