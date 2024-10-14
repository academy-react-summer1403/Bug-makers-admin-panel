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

// ** Images
import CourseItem from '../../../../components/common/modal/CourseItem'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../store'
import { useSelector } from 'react-redux'

const SecurityTab = () => {
  // ** Hooks
  const user = useSelector(state => state.user.selectUser)
  
  // ** Render
  if (user.isTecher === true) {
    return (
      <div style={{ maxWidth: '540px', display: 'flex', flexFlow: 'column wrap', gap: '15px', justifyContent: 'center' }}>
        {user.courses?.map((item) => (
          <CourseItem
            key={item.courseId}
            title={item.title}
            describe={item.describe}
            imageUrl={item.tumbImageAddress}
            lastUpdate={item.lastUpdate}
          />
        ))}
      </div>
    )
  }else if(user.courses.length === 0) {
    return(
      <div>
        <h1>شما هیج دوره ای را ثبت نکردید</h1>
      </div>
    )
  }
}

export default SecurityTab
