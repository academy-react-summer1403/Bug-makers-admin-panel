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
import { Archive, Check, Delete, Edit, Eye, Linkedin, User, X } from 'react-feather';

// ** Styles
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';
import { getReplayComment } from '../../../@core/api/course/commentMng/showReplay';
import { ThreeDots } from 'react-loader-spinner';
import UpdateComment from './updateComment';
import { replayComment } from '../../../@core/api/course/commentMng/replyComment';
import { deleteTourGroup } from '../../../@core/api/Tournament/group/deleteTourGroup';
import EditTourGroup from './updateTourGroup';
import { UpdateTourGroupStu, deleteTourGroupStu, getTourGroupStu } from '../../../@core/api/Tournament/group/getGroupStu';
import EditTourGroupStu from './EditTourGroupStu';
import ShowCheckListAvg from './checkListAvg';
import { Tooltip } from '@mui/material';
const ShowStuTourGroup = ({group , isLoading , TourId}) => {
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


      const {data} = useQuery({
        queryKey:['getStuTourGroup' , group],
        queryFn: () => getTourGroupStu(group)
      })
      const deleteTourGroupStuFn = useMutation({
        mutationKey:['deleteGroupTourStu'],
        mutationFn: (groupId) => deleteTourGroupStu(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries('group')
        }
      })


    //   add && delete 
      const handleAccept = (row) => {
        acceptCommentShowAll.mutate({ commentId:row.id})
      }
      const handleDelete = (row) => {
        deleteTourGroupStuFn.mutate(row.id)
      }
      const handleDeleteFull = (row) => {
        deleteCommentApiFull.mutate(row.id)
      }
  const columns = [
    {
      name: 'نام دانش آموز',
      selector: row => row.studentName,
    },
    {
      name: 'آیدی کاربر',
      selector: row => row.studentId,
    },
    {
      name: 'آیدی گروه',
      selector: row => row.groupId,
    },
    {
      name: 'تاریخ انتشار گروه',
      selector: row => useDate(row.insertDate),
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
            <Button color='danger' style={{padding:'5px' , fontSize:'12px'}}  onClick={() => handleDelete(row)} >حذف دانش آموز</Button>
            <EditTourGroupStu api={UpdateTourGroupStu}  color='info'  row={row} title={'ویرایش'} />
            <EditTourGroupStu api={UpdateTourGroupStu} color='success'   title={'افزودن دانش آموز'} />
            <ShowCheckListAvg   TourId={TourId} userId={row.studentId}  group={group} />
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

      <Tooltip title='نمایش دانشجو ها' placement='top'>
        <User size={'14px'}  className=' cursor-pointer' style={{marginTop: '2px'}} onClick={handleClick} />
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>دانشجو های این گروه</ModalHeader>
        <ModalBody  className="px-sm-5 mx-50 pb-5">
        <EditTourGroupStu api={UpdateTourGroupStu} title='افزودن دانش آموز به گروه' color='success' />
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
                  data={data}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  highlightOnHover
                  noDataComponent={<Badge color='warning'>این گروه هیچ دانشجویی ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowStuTourGroup;
