import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBox from '../../../../components/common/modal/SearchBox/SearchBox';
import DataTable from 'react-data-table-component';
import SelectOpt from '../../../../components/common/modal/Select/SelectOpt';
import moment from 'moment-jalaali';
import Active from '../../../../components/common/active/active';
import { ThreeDots } from 'react-loader-spinner';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { getCommentCourseAdmin } from '../../../../@core/api/course/commentMng/commentMng';
import { Badge, Button } from 'reactstrap';
import { Dropdown, FormSelect } from 'react-bootstrap';
import ReactSelect from 'react-select';
import { getUserComment } from '../../../../@core/api/course/commentMng/user';
import { Edit, Menu, MessageCircle, Minus } from 'react-feather';
import ShowReplay from '../../../../components/common/modal/showReplay';
import { acceptComment, deleteCommentApi, deleteCommentApiFull, updatingComment } from '../../../../@core/api/course/commentMng/acceptComment';
import UpdateComment from '../../../../components/common/modal/updateComment';
import { getCommentCourseTeacher } from '../../../../@core/api/course/commentMng/commentMngTeacher';
import { getCommentCoursePage } from '../../../../@core/api/course/commentMng/commentMngAll';
import {getUserById} from '../../../../@core/api/user/getUserById'
import {setRolePage} from '../../../../redux/rolePage'
import { Skeleton } from '@mui/material';

const CommentMngForCoursePage = () => {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const [queryValue, setQueryValue] = useState('');
  const [queryValueStatic, setQueryValueStatic] = useState('');
  const [user, setUser] = useState();
  const [maxCost, setMaxCost] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(0);
  const [acceptSelect, setAcceptSelect] = useState()

  const { data, isLoading, error } = useQuery({
    queryKey: ['getCommentCourseAdmin', queryValue, teacherId, categoryQuery,user , acceptSelect, currentPage],
    queryFn: () => getCommentCoursePage(queryValue, teacherId, categoryQuery, currentPage, itemsPerPage, '', user, acceptSelect),
    keepPreviousData: true,
  });

  const userId = useSelector((state) => state.userId.userId)
  const { data : role } = useQuery({
    queryKey:['getUserByIdPage'],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRolePage(role))
  }, [role])
  const [fieldData, setFieldData] = useState([])
  useEffect(() => {
    if(data){
    setFieldData(data.comments.filter(el => el.userFullName.toLowerCase().includes(queryValueStatic.toLowerCase())))
    }
  }, [data , queryValueStatic])
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
    setQueryValueStatic('')
    setUser(null)
  };

  const itemsPerPage = 8;
  // const handleViewSwitch = () => setViewMode(viewMode === 'table' ? 'grid' : 'table');

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  const queryClient = useQueryClient();
  // accept commet 
  const acceptCommentShowAll = useMutation({
    mutationKey: ['acceptingComment'],
    mutationFn: ({ commentId }) => {
      return acceptComment( commentId);

    },onSuccess: () => {
        queryClient.invalidateQueries('getCommentCourseAdmin')
      }
  });
  // reject comment 
  const deleteComment = useMutation({
    mutationKey: ['rejectComment'],
    mutationFn: ({ commentId }) => {
      return deleteCommentApi( commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentCourseAdmin')
    }
  });
  // delete comment 
  const deleteCommentFull = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: ({ commentId }) => {
      return deleteCommentApiFull(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentCourseAdmin')
    }
  });
  
  // update comment 
  const updateComment = useMutation({
    mutationKey: ['updateComment'],
    mutationFn: (formData) => {
      return acceptComment(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCommentCourseAdmin')
    }
  });
  

  const handleAccept = (row) => {
    acceptCommentShowAll.mutate({ commentId:row.commentId})
  }
  const handleDelete = (row) => {
    deleteComment.mutate({ commentId:row.commentId})
  }
  const handleDeleteFull = (row) => {
    deleteCommentFull.mutate({ commentId:row.commentId})
  }
  const columns = [
    {
      name: 'نام کاربر',
      selector: row => row.userFullName,
    },
    {
      name: 'عنوان دوره',
      selector: row => row.courseTitle,
    },
    {
      name: 'عنوان کامنت',
      selector: row => row.commentTitle,
    },
    {
      name: 'توضیحات کامنت',
      width:'150px',
      selector: row => row.describe,
    },
    {
      name: 'وضعیت',
      selector: row => row.accept,
      sortable: true,
      cell: row => {
        return(
          <Badge color={row.accept ? 'success' : 'warning'} >{row.accept ? 'تاییده شده' : 'در انتظار تایید'}</Badge>
        )
      }
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
          {row.replyCount ? (
          <ShowReplay deleteCommentApiFull={deleteCommentFull} acceptCommentShowAll={acceptCommentShowAll} deleteComment={deleteComment} commentId={row.commentId}  courseId={row.courseId} />
          ) : (
            <Minus size='14px' />
          )}
          <Dropdown>
        <Dropdown.Toggle 
          variant="transparent" 
          id="dropdown-basic" 
          style={{ padding: '5px', marginRight: '5px', border: 'none', background: 'transparent' }}          
          >
          <Menu size={'14px'} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleAccept(row)}>تایید کامنت</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDelete(row)}>رد کامنت</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeleteFull(row)}>حذف کامنت</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <UpdateComment 
         CommentId={row.commentId}  
         CourseId={row.courseId} 
         Title={row.commentTitle} 
         Describe={row.describe} 
         topic='بروزرسانی کامنت'
         Api={updatingComment}
         KeyMutate={'updateComment'}
         icon={
          <Edit 
            size={'14px'} 
            className='m-2 cursor-pointer' 
            style={{ marginTop: '2px' }} 
          />
        } 
         />

        </div>
      )
    }
  ];


  const { data : getUser } = useQuery({
    queryKey:['getUserComment'],
    queryFn:getUserComment
  })

  return (
    <div className='container mt-4'>
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='توضیحات کامنت'
          value={queryValue}
          onChange={handleSearch}
        />
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='نام کاربر را وارد کنید'
          value={queryValueStatic}
          onChange={handleSearchStatic}
        />
        <SelectOpt
          width={"100%"}
          lgWidth={"160px"}
          placeholder='استاد دوره'
          isTeacherSelect={true}
          onChange={setTeacherId}
        />
        <FormSelect value={user} onChange={() => setUser(e.target.value)} placeholder={'نام کاربر'}    style={{width:'200px'}}>
          {getUser?.listUser.map((item) => (
          <option onClick={() => setUser(item.id)} key={item.id} value={item.id} >{item.fname + item.lname}</option>
          ))}
        </FormSelect>
        <FormSelect value={acceptSelect} onChange={() => setAcceptSelect(e.target.value)} placeholder={'وضعیت'}    style={{width:'200px'}}>
          <option value={true} onClick={() => setAcceptSelect(true)}>تاییده شده </option>
          <option value={false} onClick={() => setAcceptSelect(false)}>در انتظار تایید</option>
        </FormSelect>

        {/* <DateModal onFilter={(startDate, endDate) => {}} /> */}
        {/* <PriceFilter
          width={"100%"}
          lgWidth={"160px"}
          onFilter={handlePriceFilter}
        /> */}
        <Button color='warning' className='btn btn-light' onClick={handleRemoveFilter}>
          حذف تمامی فیلتر
        </Button>
        {/* <button className='btn btn-primary' onClick={handleViewSwitch}>
          {viewMode === 'table' ? 'نمایش به صورت شبکه' : 'نمایش به صورت جدول'}
        </button> */}
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
              data={fieldData}
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

export default CommentMngForCoursePage;
