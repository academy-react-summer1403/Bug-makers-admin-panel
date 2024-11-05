// ** React Imports
import { Fragment, useEffect, useState } from 'react'
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

import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../../../@core/api/user/getUserById'
import { setRolePage } from '../../../../redux/rolePage'

const MyCourse = () => {

  const useDate = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  // ** Hooks
  const userId = useSelector((state) => state.userId.userId)
  const { data } = useQuery({
    queryKey:['getUserByIdPage'],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRolePage(data))
  }, [data])

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
  if (data?.isTecher === true) {
    return (
      <div className='w-100'>
      <DataTable
        title="دوره‌های شما"
        columns={columns}
        data={data?.courses}
        pagination
        responsive={true}
        className='react-dataTable'
        noDataComponent={<div>شما هیج دوره‌ای را ثبت نکردید</div>}
      />
      </div>
    )
  } else if (data?.courses?.length === 0) {
    return (
      <div>
        <h1>شما هیج دوره‌ای را ثبت نکردید</h1>
      </div>
    )
  }

  return null; 
}

export default MyCourse
