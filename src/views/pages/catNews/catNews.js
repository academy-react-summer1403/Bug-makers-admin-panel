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
import EditGroup from '../../../components/common/modal/editGroup';
import { getCategoryList } from '../../../@core/api/course/Category';
import { getCategoryId, getCategoryListBlog } from '../../../@core/api/blog/Category';
import CreateCategoryBlog from '../../../components/common/modal/createCategoryBlog';
import UpdateCat from '../../../components/common/modal/uodateCat';
import { X } from 'react-feather';

const CatNews = () => {
    const [queryValue, setQueryValue] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const { data, isLoading, error } = useQuery({
    queryKey: ['getCategory'],
    queryFn: getCategoryListBlog,
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter(item => 
        item.categoryName.toLowerCase().includes(queryValue.toLowerCase())
      ));
    }
  }, [data, queryValue]);

  const handleSearch = (e) => setQueryValue(e.target.value);

  const handleRemoveFilter = () => {
    setQueryValue('');
  };

  const itemsPerPage = 8;

  const columns = [
    {
      name: 'نام دسته بندی',
      width: '400px',
      selector: row => row.categoryName,
      sortable: true,
    },
    {
      name: 'نام آیکون',
      width: '400px',
      selector: row => row.iconName,
      sortable: true,
    },
    {
      name: 'تایتل گوگل',
      width: '150px',
      selector: row => row.googleTitle,
      sortable: true,
    },
    {
      name: 'توضیحات گوگل',
      width: '200px',
      selector: row => row.googleDescribe,
      sortable: true,
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          <UpdateCat selectData={row.id}  />
          
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
        <X className={`${queryValue ? 'block' : 'hidden'} cursor-pointer position-absolute right-0`}
            size={14} 
            color="black" 
            onClick={() => setQueryValue('')}    
        />
        <CreateCategoryBlog />
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <ThreeDots color="#007bff" height={80} width={80} />
        </div>
      )}
      {error && <p>خطایی رخ داده است...</p>}

      <AnimatePresence>
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DataTable
            columns={columns}
            data={filteredData}  // Use filtered data here
            pagination
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

export default CatNews;
