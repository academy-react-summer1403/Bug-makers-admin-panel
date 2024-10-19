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
  FormFeedback
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
import moment from 'moment-jalaali';

// ** Images
import CourseItem from '../../../../components/common/modal/CourseItem'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../store'
import { useSelector } from 'react-redux'

const SecurityTab = () => {

  const useDate = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  // ** Hooks
  const user = useSelector(state => state.user.selectUser)
  console.log(user);
  // ** Columns for DataTable
  const columns = [
    {
      name: 'عنوان دوره',
      minWidth : '50px',
      cell: row => <Link to={`/apps/Detail/${row.courseId}`}>{row.title}</Link>,
      sortable: true,
    },
    {
      name: 'توضیحات',
      maxWidth : '200px',
      selector: row => row.describe,
      sortable: false,
    },
    {
      name: 'آخرین آپدیت',
      minWidth : '50px',
      selector: row => useDate(row.lastUpdate),
      sortable: false,
    },
  ];

  // ** Render
  if (user.isTecher === true) {
    return (
      <div className='w-100'>
      <DataTable
        title="دوره‌های شما"
        columns={columns}
        data={user.courses}
        pagination
        responsive={true}
        className='react-dataTable'
        noDataComponent={<div>شما هیج دوره‌ای را ثبت نکردید</div>}
      />
      </div>
    )
  } else if (user.courses.length === 0) {
    return (
      <div>
        <h1>شما هیج دوره‌ای را ثبت نکردید</h1>
      </div>
    )
  }

  return null; 
}

export default SecurityTab
