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
import { deleteTourGroup } from '../../../@core/api/Tournament/group/deleteTourGroup';
import EditTourGroup from './updateTourGroup';
import ShowStuTourGroup from './showStuTourGroup';
import EditTourGroupStu from './EditTourGroupStu';
import ShowTourGroupMentor from './showTourGroupMentor';
import ShowCheckListAvg from './checkListAvg';
import { Skeleton, Tooltip } from '@mui/material';
import { getSession } from '../../../@core/api/session/getSession';
import AddSession from './AddSession';
import ShowHomeWorkSession from './showHomeWorkSession';
const ShowSession = ({group  , TourId, sessionId , isLoading}) => {
  const [show, setShow] = useState(false);  
  const queryClient = useQueryClient()
 

const noDataMessage = "هیچ جلسه‌ای وجود ندارد"; 
  const itemsPerPage = 8;

    // use date 
    const useDate = (date) => {
        if(!date) return 'تاریخ  وجود ندارد';
        return moment(date).format('jYYYY/jMM/jDD'); 
      }


      const deleteTourGroupFn = useMutation({
        mutationKey:['deleteGroupTour'],
        mutationFn: (groupId) => deleteTourGroup(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries('group')
        }
      })
      const sessionData = Array.isArray(sessionId) ? sessionId : (sessionId ? [sessionId] : []); 


    //   add && delete 
      const handleAccept = (row) => {
        acceptCommentShowAll.mutate({ commentId:row.id})
      }
      const handleDelete = (row) => {
        deleteTourGroupFn.mutate(row.id)
      }
      const handleDeleteFull = (row) => {
        deleteCommentApiFull.mutate(row.id)
      }
  const columns = [

    {
      name: 'نام جلسه',
      width:'150px',
      selector: row => row.sessionTitle,
      cell : row => (
        <Tooltip title={row.sessionTitle} placement='top'>
        <span
        style={{
          width:'100px',
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}
        >{row.sessionTitle}</span>
        </Tooltip>
      )
    },
    {
      name: ' توضیحات جلسه',
      selector: row => row.sessionDescribe,
      width:'200px',
      cell : row => (
        <Tooltip title={row.sessionDescribe} placement='top'>
        <span
        style={{
          width:'100px',
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}
        >{row.sessionDescribe}</span>
        </Tooltip>
      )
    },
    {
        name: 'فایل جلسه',
        width: '150px',
        selector: row => row.sessionFileDtos && row.sessionFileDtos.length > 0
          ? `${row.sessionFileDtos.length} فایل`
          : 'وجود ندارد',
      }
,      
    {
      name: 'تاریخ انتشار جلسه',
      width:'150px',
      selector: row => useDate(row.insertDate),
    },
    {
      name: 'حالت جلسه',
      width:'150px',
      selector: row => row.forming,
      cell : row => (
        <Badge  color={row.forming ? 'success' : 'danger'}>{row.forming ? 'تشکیل شده' : 'تشکیل نشده'}</Badge>
      )
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
            <AddSession sessionId={sessionId?.id} row={row} title='ویرایش جلسه' />
            <ShowHomeWorkSession idSession={row.scheduleSessionId} sessionId={row.scheduleSessionId} /> 
        </div>
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
 
      
    >
      <Button size='sm'  color='transparent' className=' cursor-pointer'  style={{border:'none'}} onClick={handleClick} >نمایش جلسه</Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>گروه های این تورنومنت</ModalHeader>
        <ModalBody  className="px-sm-5 mx-50 pb-5">
        <div className='d-flex gap-3' style={{flexFlow: 'row nowrap'}}>
        {group == null ? (
        <AddSession title='افزودن جلسه به این گروه   ' color='success' />
        ) : null}
        </div>
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
                  data={sessionData}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  customStyles={customStyles}
                  highlightOnHover
                  noDataComponent={<Badge color='warning'>این بازه زمانی هیچ جلسه ای ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowSession;
