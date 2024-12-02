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
import { Archive, Check, Delete, Edit, Eye, Linkedin, Menu, Plus, X } from 'react-feather';

// ** Styles
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';
import { getReplayComment } from '../../../@core/api/course/commentMng/showReplay';
import { ThreeDots } from 'react-loader-spinner';
import UpdateComment from './updateComment';
import { replayComment } from '../../../@core/api/course/commentMng/replyComment';
import {  Skeleton, Tooltip } from '@mui/material';
import { getExamById } from '../../../@core/api/exam/getById';
import { Dropdown } from 'react-bootstrap';
import CreateExamModal from './createExamModal';
import CreateTest from './createTest';
import { deleteTest } from '../../../@core/api/exam/deleteTest';

const ShowTest = ({id}) => {
  const [show, setShow] = useState(false);  

  const [addComment, setAddComment] = useState(false)
  const {data , isLoading} = useQuery({
    queryKey:['getByIdList', id],
    queryFn:() => getExamById(id),
    enabled: !!id
  })

  const deleteTestFun = useMutation({
    mutationKey: ['deleteTestKey'],
    mutationFn: (examId) => deleteTest(examId),
    onSuccess:() => {
      query.invalidateQueries('getByIdList', id) 
    }
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
      name: 'سوال',
      selector: row => row.question,
      cell : row => (
        <Tooltip title={row.question} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.question}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'پاسخ صحیح',
      selector: row => row.Correct,
      cell : row => (
        <Tooltip title={row.Correct} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.Correct}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'سوال یک',
      selector: row => row.op1,
      cell : row => (
        <Tooltip title={row.op1} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.op1}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'سوال دو',
      selector: row => row.op2,
      cell : row => (
        <Tooltip title={row.op2} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.op2}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'سوال سه',
      selector: row => row.op3,
      cell : row => (
        <Tooltip title={row.op3} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.op3}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'سوال چهار',
      selector: row => row.op4,
      cell : row => (
        <Tooltip title={row.op4} placement='top-end'>
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >
                {row.op4}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'عملیات',
      cell: row => (
        <Dropdown className="no-border">
        <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-custom-components">
          <Menu />
        </Dropdown.Toggle>
  
        <Dropdown.Menu className="border-0">
  
          <Dropdown.Item as="div" className="d-flex justify-content-center align-items-center gap-1">
            <Button size="sm" onClick={() => deleteTestFun.mutate(row.id)} color='transparent' >حذف آزمون</Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      )
    },
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
      <Button color='transparent' style={{border:'none'}}   onClick={handleClick} >نمایش تست ها</Button>
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>تست های این آزمون</ModalHeader>
        <CreateTest id={id} size='md'  title={<Plus />} />

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
                  data={data?.data?.tests}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  customStyles={customStyles}
                  highlightOnHover
                  noDataComponent={<Badge>این آزمون هیچ تستی ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowTest;
