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
import { title } from 'process';
import EditGroup from '../../../components/common/modal/editGroup';
import AddGroupCourse from '../../../components/common/modal/AddGroup';
import { Skeleton, Tooltip } from '@mui/material';
import { getAllPodcast } from '../../../@core/api/podcast/getAllPodcast';
import UpdatePodcast from '../../../components/common/modal/updatePodcast';
import { getLikePodcast } from '../../../@core/api/podcast/commentMng';
import { deleteLikePod } from '../../../@core/api/podcast/deleteLikePod';
import { Menu } from 'react-feather';

const Podcast = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);


  moment.loadPersian();
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD dddd'); 
  }
  const dispatch = useDispatch();
  const blogListItem = useSelector((state) => state.blog.blogList);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getAllPodcast', queryValue],
    queryFn: () => getAllPodcast(queryValue),
    keepPreviousData: true,
  });
  const { data : likePod } = useQuery({
    queryKey: ['getLikePodcast'],
    queryFn: getLikePodcast,
    keepPreviousData: true,
  });

  console.log(data);
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

  const deleteLikeId = useMutation({
    mutationKey:['deleteLikePod'],
    mutationFn: (id) => deleteLikePod(id),
    onSuccess: () => {
      queryClient.invalidateQueries('getLikePodcast')    
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
        const likeItem = likePod?.data?.find(item => item.podcastId === row.id);
        console.log(likeItem);
        deleteLikeId.mutate(likeItem.id)
      }
    });
  }
  
  const columns = [
    {
      name: 'سازنده',
      selector: row => row.creator,
      sortable: true,
    },
    {
      name: 'نام پادکست',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'توضیحات پادکست',
      selector: row => row.Desc,
      sortable: true,
      cell : row  => (
        <Tooltip title={row.Desc} placement='top-end' >
            <span
            style={{
                width:'100px',
                overflow:'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
            }}
            >
                {row.Desc}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'تاریخ انتشار',
      selector: row => useDay(row.InsertTime),
      sortable: true,
    },
    {
      name: 'تعداد لایک',
      sortable: true,
      cell: row => {
        const likeItem = likePod?.data?.filter(item => item.podcastId === row.id);

        if (likeItem) {
          return <span>{likeItem.length}</span>;
        }
    
        return <span>0</span>;
      },
    },
       
    
    {
      name: 'عملیات',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-edit-delete">
            <Menu />
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item >
              <UpdatePodcast selectData={row} />
            </Dropdown.Item>
  
            <Dropdown.Item  onClick={() => handleDelete(row)}>
              حذف لایک
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
      <UpdatePodcast  />

        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='دنبال چی میگردی'
          value={queryValue}
          onChange={handleSearch}
        />
        

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
              data={data?.data?.Dots}
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

export default Podcast;