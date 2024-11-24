// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  Badge
} from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import * as yup from 'yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Edit, Trash, Settings, MessageSquare, ChevronRight } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Images
import CourseItem from '../../../../components/common/modal/CourseItem'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../store'
import { useSelector } from 'react-redux'
import moment from 'moment-jalaali';

const connections = () => {
  const useDate = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  // ** Hooks
  const user = useSelector(state => state.user.selectUser)

  // ** Columns for DataTable
  const columns = [
    {
      name: 'عنوان دوره',
      minWidth : '50px',
      cell: row => <Link to={`/apps/Detail/${row.courseId}`}>{row.courseName}</Link>,
      sortable: true,
    },
    {
      name: 'نام دانش آموز',
      maxWidth : '200px',
      selector: row => row.studentName,
      sortable: false,
    },
    {
      name: 'آیدی دانش آموز',
      maxWidth : '200px',
      selector: row => row.studentId,
      sortable: false,
    },
    {
      name: 'آخرین آپدیت',
      minWidth : '50px',
      selector: row => useDate(row.reserverDate),
      sortable: false,
    },
  ];



  // ** Render
  if (user.isTecher === true) {
    return (
      <div className='w-100'>
      <DataTable
        title="دوره های رزرو شده"
        columns={columns}
        data={user.coursesReseves}
        pagination
        responsive={true}
        className='react-dataTable'
        noDataComponent={<span>شما هیج دوره‌ای را ثبت نکردید</span>
      } 
      />
      </div>
    )
  }else { return <Row> <span color='warning' style={{textAlign:'center'}}>این کاربر هیچ دوره ای  را نکرده است</span></Row>
  }

}

export default connections
