// ** React Imports
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { updateUser } from '../../../views/apps/user/store/index';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-jalaali';
import { motion, AnimatePresence } from 'framer-motion'; 
import DataTable from 'react-data-table-component';
import noImg from '../../../assets/images/icons/image.jpg'
// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Badge
} from 'reactstrap'

// ** Third Party Components
import { Archive, Check, Delete, Edit, Eye, Linkedin, X } from 'react-feather';

// ** Styles
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';
import { getReplayComment } from '../../../@core/api/course/commentMng/showReplay';
import { ThreeDots } from 'react-loader-spinner';
import UpdateComment from './updateComment';
import { replayComment } from '../../../@core/api/course/commentMng/replyComment';
import { Skeleton, Tooltip } from '@mui/material';

const ShowReplay = ({commentId , courseId ,deleteCommentApiFull ,  acceptCommentShowAll , deleteComment}) => {
  const [show, setShow] = useState(false);  

  const [addComment, setAddComment] = useState(false)

  const { data  , isLoading} = useQuery({
    queryKey:['getReplay'],
    queryFn:() => getReplayComment(commentId , courseId),
    enabled : show,
  })

  const queryClient = useQueryClient()

  const itemsPerPage = 8;

    // use date 
    const useDate = (date) => {
        if(!date) return 'تاریخ  وجود ندارد';
        return moment(date).format('jYYYY/jMM/jDD'); 
      }


    //   add && delete 
      const handleAccept = (row) => {
        acceptCommentShowAll.mutate({ commentId:row.id})
      }
      const handleDelete = (row) => {
        deleteComment.mutate({ commentId:row.id})
      }
      const handleDeleteFull = (row) => {
        deleteCommentApiFull.mutate({ commentId:row.id})
      }
  const columns = [
    {
      selector: row => row.pictureAddress,
      width:'50px',
      cell : row => {
        return(
            <img width={'30px'}style={{borderRadius: '100%'}} src={row.pictureAddress ? row.pictureAddress : noImg} onError={(e) => {e.target.src = noImg}} />
        )
      }
    },
    {
      name: 'نام کاربر',
      width:'60px',
      selector: row => row.author,
    },
    {
      name: 'عنوان کامنت',
      selector: row => row.title,
    },
    {
      name: 'توضیحات کامنت',
      selector: row => row.describe,
    },
    {
      name: 'تعداد دیس لایک',
      width:'100px',
      selector: row => row.disslikeCount,
    },
    {
      name: 'تعداد لایک',
      width:'100px',
      selector: row => row.likeCount,
    },
    {
      name: 'تاریخ ریپلای',
      width:'100px',
      selector: row => useDate(row.insertDate),
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
        <div style={{ display: 'flex', gap: '20px' }}>
        <div>
        <Tooltip title='رد کامنت' placement='top' >
            <X id="TooltipX" className='cursor-pointer'  onClick={() => handleDelete(row)} size={24}  />
          </Tooltip>
        </div>
        <div>
          <Tooltip title='تایید کامنت' placement='top' >
          <Check  className='cursor-pointer' onClick={() => handleAccept(row)} id="TooltipCheck" size={24}  />
          </Tooltip>
        </div>
        <div>
          <Tooltip title='حذف کامنت' placement='top'>
            <Delete  className='cursor-pointer' onClick={() => handleDeleteFull(row)} id="TooltipRemove" size={24}  />
          </Tooltip>
        </div>
      </div>
      )
    },
    {
      name: 'پاسخ',
      cell: row => (
          <UpdateComment 
            Api={replayComment} 
            CommentId={row.id} 
            CourseId={row.courseId}
            topic='پاسخ'  
            color='primary'
            icon={
              <Button KeyMutate={'replayComment'} color='primary' >پاسخ</Button>
            }
          />
      )
    }
  ];

  const handleClick = () => {
    setShow(true)
    
  }

  const customStyles = {
    table: {
      style: {
        minHeight: '500px',
      },
    },
  };
  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
      
    >
      <Tooltip title='نمایش ریپلای' placement='top' >
      <Button color='transparent'   onClick={handleClick} >نمایش ریپلای</Button>
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>ریپلای های این کامنت</ModalHeader>
        <ModalBody  className="px-sm-5 mx-50 pb-5">
        <AnimatePresence>
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,flexFlow:'column wrap '}}
          >
          {isLoading ? (
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
              ) : (
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  customStyles={customStyles}
                  highlightOnHover
                  noDataComponent={<Badge>این کامنت هیچ ریپلای نخورده</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowReplay;
