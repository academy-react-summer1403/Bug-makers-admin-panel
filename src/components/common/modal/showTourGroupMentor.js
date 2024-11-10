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
import { deleteTourGroupStu, getTourGroupStu } from '../../../@core/api/Tournament/group/getGroupStu';
import EditTourGroupStu from './EditTourGroupStu';
import { UpdateTourGroupMentor, deleteTourGroupMentor, getTourGroupMentor } from '../../../@core/api/Tournament/group/groupMentor';
import { FaChalkboardTeacher } from "react-icons/fa";
import { Tooltip } from '@mui/material';

const ShowTourGroupMentor = ({group , isLoading , TourId}) => {
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
        queryKey:['getMentorTourGroup' , group],
        queryFn: () => getTourGroupMentor(group)
      })
      const deleteTourGroupStuFn = useMutation({
        mutationKey:['deleteGroupTourMentor'],
        mutationFn: (groupId) => deleteTourGroupMentor(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries('group')
        }
      })


    //   add && delete 
      const handleAccept = (row) => {
        acceptCommentShowAll.mutate({ commentId:row.id})
      }
      const handleDelete = (row) => {
        deleteTourGroupStuFn.mutate(row.mentorGroupId)
      }
      const handleDeleteFull = (row) => {
        deleteCommentApiFull.mutate(row.mentorGroupId)
      }
  const columns = [
    {
      name: 'نام منتور',
      selector: row => row.mentorName,
    },
    {
      name: 'آیدی کاربر',
      selector: row => row.userId,
    },
    {
      name: 'تاریخشه ',
      selector: row => row.mentorHistoryCount,
    },
    {
      name: 'تعداد وظایف انجام شده ',
      selector: row => row.mentorDoCount,
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
            <Button color='danger' style={{padding:'5px' , fontSize:'12px'}}  onClick={() => handleDelete(row)} >حذف منتور</Button>
            <EditTourGroupStu api={UpdateTourGroupMentor}  color='success'   title={'افزودن  منتور'} />
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
      <Tooltip title='نمایش منتور ها' placement='top' >
        <User color='blue'  size={'14px'} className=' cursor-pointer' style={{marginTop: '2px'}} onClick={handleClick} />
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>منتور های این گروه</ModalHeader>
        <ModalBody  className="px-sm-5 mx-50 pb-5">
        <EditTourGroupStu api={UpdateTourGroupMentor} title='افزودن  منتور به گروه' color='success' />
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
                  noDataComponent={<Badge color='warning'>این گروه هیچ منتوری ندارد</Badge>}
                />
              )}
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowTourGroupMentor;
