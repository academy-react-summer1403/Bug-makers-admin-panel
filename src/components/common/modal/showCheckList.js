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
import { Tooltip } from 'reactstrap';
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
import { deleteTourCheckList } from '../../../@core/api/Tournament/TourCheckList/deleteCheckList';
import EditTourCheckList from './editCheckListTour';
const ShowCheckList = ({group , isLoading , TourId}) => {
  const [show, setShow] = useState(false);  
  const [tooltipOpenX, setTooltipOpenX] = useState(false);
  const [tooltipOpenCheck, setTooltipOpenCheck] = useState(false);
  const [tooltipِDelete, setTooltipDelete] = useState(false);

  const [addComment, setAddComment] = useState(false)
  const toggleX = () => setTooltipOpenX(!tooltipOpenX);
  const toggleCheck = () => setTooltipOpenCheck(!tooltipOpenCheck);
  const toggleDelete = () => setTooltipDelete(!tooltipِDelete);


  const queryClient = useQueryClient()

  const itemsPerPage = 8;

    // use date 
    const useDate = (date) => {
        if(!date) return 'تاریخ  وجود ندارد';
        return moment(date).format('jYYYY/jMM/jDD'); 
      }


      const deleteTourGroupFn = useMutation({
        mutationKey:['deleteCheckTour'],
        mutationFn: (groupId) => deleteTourCheckList(groupId),
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
      name: 'آیدی چک لیست',
      selector: row => row.checkListId,
    },
    {
      name: 'نام چک لیست',
      selector: row => row.checkListTitle,
    },
    {
      name: 'تعداد امتیاز',
      selector: row => row.scoreNumber,
    },
    {
      name: 'تاریخ انتشار چک لیست',
      selector: row => useDate(row.checkListInsertDate),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
            <Button color='danger' style={{padding:'5px' , fontSize:'12px'}}  onClick={() => handleDelete(row)} >حذف گروه</Button>
            <EditTourCheckList color='info' TourId={TourId} row={row}  title={'ویرایش چک لیست'} />.
            <EditTourCheckList color='success' TourId={TourId}  title={'ساخت چک لیست'} />.
        </div>
      )
    },
  ];

  const handleClick = () => {
    setShow(true)
    
  }


  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
      
    >
      <Button size={'14px'}  color='warning' className=' cursor-pointer' style={{marginTop: '2px', padding:'5px 5px', fontSize:'10px'}} onClick={handleClick} >نمایش لیست</Button>
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
        <EditTourGroupStu title='افزودن دانش آموز به گروه' color='success' />
        ) : null}
        <EditTourGroup color='success' TourId={TourId}  title={'ساخت گروه'} />
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
                  data={group}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  highlightOnHover
                  noDataComponent={<Badge color='warning'>این تورنومنت هیچ گروهی ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowCheckList;
