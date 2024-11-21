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
import { Button, Dropdown } from 'react-bootstrap';
import { deleteGroup } from '../../../@core/api/course/deleteGroup';
import { deleteGroupPage } from '../../../@core/api/groupPage/deleteGroup';
import Swal from 'sweetalert2';
import EditGroup from '../../../components/common/modal/editGroup';
import { getCategoryList } from '../../../@core/api/course/Category';
import { getCategoryId, getCategoryListBlog } from '../../../@core/api/blog/Category';
import CreateCategoryBlog from '../../../components/common/modal/createCategoryBlog';
import UpdateCat from '../../../components/common/modal/uodateCat';
import { Menu, X } from 'react-feather';
import Tooltip from '@mui/material/Tooltip';  // وارد کردن Tooltip از MUI
import { Skeleton } from '@mui/material';

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
      width:'150px',
      selector: row => (
        <Tooltip title={row.categoryName} placement="top">
          <span>{row.categoryName}</span>
        </Tooltip>
      ),
    },
    {
      name: 'نام آیکون',
      cell: row => (
        <Tooltip title={row.iconName} placement="top-end">
        <span
          style={{
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.iconName}
        </span>
        </Tooltip>
      ),
    },
    {
      name: 'تایتل گوگل',
      cell: row => (
        <Tooltip title={row.googleTitle} placement="top-end">
        <span
          style={{
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.googleTitle}
        </span>
        </Tooltip>
      ),
    },
    {
      name: 'توضیحات گوگل',
      cell: row => (
        <Tooltip title={row.googleDescribe} placement="top-end">
        <span
          style={{
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.googleDescribe}
        </span>
        </Tooltip>
      ),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} size="sm" id="dropdown-update-cat">
            <Menu /> 
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item>
              <UpdateCat title='ویرایش' selectData={row.id} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      )
    }
  ];

  return (
    <div className='container mt-4'>
      <div className=' d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
      <CreateCategoryBlog />
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='دنبال چی میگردی'
          value={queryValue}
          onChange={handleSearch}
        />
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
