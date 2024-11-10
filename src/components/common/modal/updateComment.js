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
  FormFeedback
} from 'reactstrap'

// ** Third Party Components
import { Archive, Edit, Linkedin } from 'react-feather';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';
import { updatingComment } from '../../../@core/api/course/commentMng/acceptComment';
import { replayComment } from '../../../@core/api/course/commentMng/replyComment';
import { Tooltip } from '@mui/material';

const UpdateComment = ({ CommentId , CourseId , Describe , Title , icon , Api , KeyMutate , topic}) => {
  // ** Validation Schema
  const validationSchema = Yup.object().shape({

  });

  // Default Values from API
  const defaultValue = {
    CommentId: CommentId || '',
    CourseId: CourseId || '',
    Title: Title || '',
    Describe: Describe || ''
    };

    const queryClient = useQueryClient()
    const updateCommentData = useMutation({
        mutationKey:[KeyMutate],
        mutationFn: (formData) => Api(formData),
        onSuccess:() => {
            setShow(false)
              queryClient.invalidateQueries('getCommentCourseAdmin')
        }
    })
  
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('CommentId',CommentId)
        formData.append('CourseId',CourseId)
        formData.append('Title',values.Title)
        formData.append('Describe',values.Describe)

        console.log(formData);
        // send Api 
        updateCommentData.mutate(formData)
    }

  const [show, setShow] = useState(false);  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
    >
      <Tooltip title='ویرایش کامنت' placement='top'>
      <div onClick={() => setShow(true)}>
        {icon} 
      </div>
      </Tooltip>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'>بروزرسانی کامنت</h1>
            <p>اطلاعات کامنت</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form style={{  display : 'flex', justifyContent : 'center' , flexFlow: 'row wrap', gap: '14px'}}>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='Title'>
                      عنوان کامنت <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='Title'
                    name='Title'
                    placeholder='Title'
                    value={values.Title}
                    onChange={handleChange}
                    invalid={touched.Title && !!errors.Title}
                  />
                  {touched.Title && errors.Title && <FormFeedback>{errors.Title}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='Describe'>
                       {topic}<span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='Describe'
                    name='Describe'
                    placeholder='Describe'
                    value={values.Describe}
                    onChange={handleChange}
                    invalid={touched.Describe && !!errors.Describe}
                  />
                  {touched.Describe && errors.Describe && <FormFeedback>{errors.Describe}</FormFeedback>}
                </div>
                <Button type='submit' className='me-1' style={{position: 'absolute' , bottom :'10px' ,right: '100px'}} color='primary'>
                  ارسال
                </Button>
                <Button type='reset' color='secondary' style={{position: 'absolute' , bottom :'10px' , left: '100px'}} outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default UpdateComment;
