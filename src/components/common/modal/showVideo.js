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
import CreateCourseVideoGroup from './CreateCourseGroupVideo';
import { UpdateCourseGroupName } from '../../../@core/api/video/videoApi';
import toast from 'react-hot-toast';
import CreateVideoUrl from './createVideoUrl';

const ShowVideo = ({id , row , mainRow}) => {
  const [show, setShow] = useState(false);  

  const queryClient = useQueryClient()

  const deleteGroup = useMutation({
    mutationKey: ['deleteTestKey'],
    mutationFn: (examId) => UpdateCourseGroupName(examId , mainRow.id),
    onSuccess:() => {
        queryClient.invalidateQueries('getVideo') 
      toast.success('ویدیو حذف شد')
    }
  })

  const deleteData = [...mainRow.groups];


  const handleDeleteVideo = (videoId) => {
    const updatedGroups = mainRow.groups.map(group => {
      if (group.videos && group.videos.length > 0) {
        group.videos = group.videos.filter(video => video.videoId !== videoId);
      }
      return group;
    });
  
    const updateData = {
      courseId: mainRow.courseId,
      groups: updatedGroups, 
      id: mainRow.id
    };
  
    deleteGroup.mutate(updateData);
  }
  
  const itemsPerPage = 8;



  const columns = [
    {
        name:"آیدی ویدیو",
      selector: row => row.videoId,
    },
    {
        name:"عنوان ویدیو",
      selector: row => row.title	,
    },
        {
      name: 'آدرس ویدیو',
      selector: (row) => row.videoUrl,
      cell: row => (
        <Tooltip title={row.videoUrl} placement='top-end'>
            <span 
                style={{
                    width:'150px',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                }}
            >
                {row.videoUrl}
            </span>
        </Tooltip>
      )
    },
    {
      name: 'دسترسی',
      cell: row => (
        <Badge color={row.isLock ? 'danger' : 'success'} >{row.isLock ? 'قفل شده' : 'باز شده'}</Badge>
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
            <Button size="sm" onClick={() => handleDeleteVideo(row.videoId)} color='transparent' >حذف ویدیو</Button>
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
  const dataArray = row?.videos;
  console.log(dataArray , row);
  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
      
    >
      <Tooltip title='نمایش گروه' placement='top' >
      <Button color='transparent' style={{border:'none'}}   onClick={handleClick} >نمایش گروه</Button>
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>ویدیو های این گروه</ModalHeader>
            <CreateVideoUrl row={mainRow} title={<Plus />} />

        <ModalBody  className="px-sm-5 mx-50 pb-5">
        <AnimatePresence>
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,flexFlow:'column wrap '}}
          >

                <DataTable
                  columns={columns}
                  data={dataArray}
                  pagination
                  paginationPerPage={itemsPerPage}
                  paginationRowsPerPageOptions={[8, 15, 30]}
                  responsive
                  customStyles={customStyles}
                  highlightOnHover
                  noDataComponent={            <div >
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
                  </div>}
                />
          </motion.div>
      </AnimatePresence>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ShowVideo;
