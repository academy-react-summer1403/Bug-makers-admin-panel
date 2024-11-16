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
import { Tooltip } from '@mui/material';
import { getSession } from '../../../@core/api/session/getSession';
import AddSession from './AddSession';
import { getHomeWork } from '../../../@core/api/session/getHomeWork';
import EditHomeWork from './AddHomeWork';
const ShowHomeWorkSession = ({group  , idSession, sessionId}) => {
  const [show, setShow] = useState(false);  
  const queryClient = useQueryClient()

    const {data , isLoading} = useQuery({
        queryKey:['getHomeWorkList' ,sessionId],
        queryFn: () => getHomeWork(sessionId),
        enabled : !!sessionId
    })


const sessionData = Array.isArray(data) ? data : (data ? [data] : []); 

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
      name: 'نام کار خانه',
      selector: row => row.hwTitle,
      cell : row => (
        <Tooltip title={row.hwTitle} placement='top'>
        <span
        style={{
          width:'100px',
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}
        >{row.hwTitle}</span>
        </Tooltip>
      )
    },
    {
      name: ' توضیحات کار خانه',
      selector: row => row.hwDescribe,
            cell : row => (
        <Tooltip title={row.hwDescribe} placement='top'>
        <span
        style={{
          width:'100px',
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}
        >{row.hwDescribe}</span>
        </Tooltip>
      )
    },   
    {
      name: 'تاریخ  کار خانه',
      selector: row => useDate(row.insertDate),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
            {/* <Button color='danger' style={{padding:'5px' , fontSize:'12px'}}  onClick={() => handleDelete(row)} >حذف گروه</Button>
            <EditTourGroup color='info' TourId={TourId} row={row} title={'ویرایش'} />
            <EditTourGroup color='success' TourId={TourId}  title={'ساخت گروه'} />
            <ShowStuTourGroup TourId={TourId}  group={row.id} />
            <ShowTourGroupMentor  group={row.id} /> */}
            <EditHomeWork idSession={idSession} sessionId={row} row={row} title='ویرایش کار در منزل' />
        </div>
      )
    },
  ];

  const handleClick = () => {
    setShow(true)
    
  }


  return (
    
    <div
 
      
    >
      <Button size='sm'  color='warning' className=' cursor-pointer'   onClick={handleClick} >نمایش کار در منزل</Button>
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
            <EditHomeWork idSession={idSession}  title='افزودن کار در منزل ' />
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
                <ThreeDots 
                  height="80" 
                  width="80" 
                  radius="9"
                  color="blue" 
                  ariaLabel="three-dots-loading" 
                  wrapperStyle={{}} 
                  wrapperClass="" 
                  visible={true}
                />
              ) : (
                <DataTable
                  columns={columns}
                  data={sessionData}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  highlightOnHover
                  noDataComponent={<Badge color='warning'>این جلسه هیچ کار در منزلی ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowHomeWorkSession;
