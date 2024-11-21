import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBox from '../../../components/common/modal/SearchBox/SearchBox';
import DataTable from 'react-data-table-component';
import SelectOpt from '../../../components/common/modal/Select/SelectOpt';
import moment from 'moment-jalaali';
import { ThreeDots } from 'react-loader-spinner';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import { Dropdown, FormSelect } from 'react-bootstrap';
import ReactSelect from 'react-select';
import { getUserComment } from '../../../@core/api/course/commentMng/user';
import { Bold, Edit, Menu, MessageCircle, Minus } from 'react-feather';
import ShowReplay from '../../../components/common/modal/showReplay';
import { acceptComment, deleteCommentApi, deleteCommentApiFull, updatingComment } from '../../../@core/api/course/commentMng/acceptComment'
import UpdateComment from '../../../components/common/modal/updateComment';
import { Tooltip } from '@mui/material';
import { deleteCommentPodcastApi, getCommentPodcast } from '../../../@core/api/podcast/commentMng';
import UpdateCommentPodcast from '../../../components/common/modal/updateCommentPodcast';


const CommentMngPodcast = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [queryValueStatic, setQueryValueStatic] = useState('');
  const [user, setUser] = useState();
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);
  const [acceptSelect, setAcceptSelect] = useState(null);
  const [listData, setListData] = useState([]);
  const items = useSelector((state) => state.role.rolePage);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getCommentPodcast'],
    queryFn: getCommentPodcast,
    keepPreviousData: true,
  });

  const handleSearch = (e) => setQueryValue(e.target.value);
  const handleSearchStatic = (e) => setQueryValueStatic(e.target.value);
  const handlePriceFilter = (min, max) => {
    setMaxCost(max);
  };

  const handleRemoveFilter = () => {
    setQueryValue('');
    setTeacherId(null);
    setCategoryQuery('');
    setMaxCost(null);
    setQueryValueStatic('');
    setUser(null);
    setAcceptSelect(null);
  };

  const itemsPerPage = 8;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const queryClient = useQueryClient();
  const acceptCommentShowAll = useMutation({
    mutationKey: ['acceptingComment'],
    mutationFn: ({ commentId }) => {
      return acceptComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentCourseAdmin');
    },
  });

  const deleteComment = useMutation({
    mutationKey: ['rejectComment'],
    mutationFn: ({ commentId }) => {
      return deleteCommentApi(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentPodcast');
    },
  });

  const deleteCommentPodcast = useMutation({
    mutationKey: ['deleteCommentPodcast'],
    mutationFn: ({ commentId }) => {
      return deleteCommentPodcastApi(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentPodcast');
    },
  });

  const handleDelete = (row) => {
    deleteCommentPodcast.mutate({ commentId: row.id });
  };

  console.log(acceptSelect);
  useEffect(() => {
    const filteredData = data?.data.filter((el) => {
        const matchesAccept = acceptSelect === null || el.IsAccept === acceptSelect;
                        console.log("Accept filter:", acceptSelect, "el.IsAccept:", el.IsAccept, "matchesAccept:", matchesAccept);      
        const matchesUserId = queryValue ? el.UserId.includes(queryValue) : data?.data;
      return matchesAccept && matchesUserId;
    });
    setListData(filteredData);
  }, [data, acceptSelect, queryValue]);

  const columns = [
    {
      name: 'آیدی کاربر',
      selector: row => row.UserId,
      cell: row => (
        <Tooltip title={row.UserId} placement="top-end">
          <span
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.UserId}
          </span>
        </Tooltip>
      ),
    },
    {
      name: 'نام کاربری',
      selector: row => row.UserName,
      cell: row => (
        <Tooltip title={row.UserName} placement="top-end">
          <span
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.UserName}
          </span>
        </Tooltip>
      ),
    },
    {
      name: 'عنوان کامنت',
      selector: row => row.Title,
      cell: row => (
        <Tooltip title={row.Title} placement="top-end">
          <span
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.Title}
          </span>
        </Tooltip>
      ),
    },
    {
      name: 'توضیحات کامنت',
      width: '150px',
      selector: row => row.Desc,
      cell: row => (
        <Tooltip title={row.Desc} placement="top-end">
          <span
            style={{
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.Desc}
          </span>
        </Tooltip>
      ),
    },
    {
      name: 'وضعیت',
      selector: row => row.IsAccept,
      sortable: true,
      cell: row => (
        <Badge color={row.IsAccept ? 'success' : 'warning'}>
          {row.IsAccept ? 'تاییده شده' : 'در انتظار تایید'}
        </Badge>
      ),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-comment-options">
            <Menu />
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item  onClick={() => handleDelete(row)}>
                حذف کامنت
            </Dropdown.Item>
  
            <Dropdown.Item >
              <UpdateCommentPodcast selectData={row} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      ),
    },
  ];

  const { data: getUser } = useQuery({
    queryKey: ['getUserComment'],
    queryFn: getUserComment,
  });

  return (
    <div className='container mt-4'>
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='آیدی کاربر'
          value={queryValue}
          onChange={handleSearch}
        />
      <FormSelect
        value={acceptSelect}
        style={{width:'250px'}}
        className='cursor-pointer'
        onChange={(e) => setAcceptSelect(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
      >
        <option className='cursor-pointer' value={null}>همه</option>
        <option  className='cursor-pointer' value={true}>فعال</option>
        <option  className='cursor-pointer' value={false}>غیرفعال</option>
      </FormSelect>
        <Button color='warning' className='btn btn-light' onClick={handleRemoveFilter}>
          حذف تمامی فیلتر
        </Button>
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
              data={listData}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentMngPodcast;
