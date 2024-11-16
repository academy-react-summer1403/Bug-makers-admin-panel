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
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

// ** Third Party Components
import { Archive, Edit, Linkedin } from 'react-feather';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';
import { updatingComment } from '../../../@core/api/course/commentMng/acceptComment';
import { replayComment } from '../../../@core/api/course/commentMng/replyComment';
import { Tooltip } from '@mui/material';
import { UpdateSession } from '../../../@core/api/session/UpdateSession';
import { getAdminSchedual } from '../../../@core/api/Schedual/schedual';
import { FormSelect } from 'react-bootstrap';
const AddSession = ({row , title , sessionId}) => {
  // ** Validation Schema
 const [form, setForm] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSchdual'],
    queryFn: () => getAdminSchedual('1990/10/12', '3000/10/10'),
    keepPreviousData: true,
  });
  console.log(data);
// Default Values from API
const defaultValue = {
    scheduleSessionId: row?.scheduleSessionId || form,
    sessionTitle: row?.sessionTitle || '',
    sessionDescribe: row?.sessionDescribe || ''
  };

  
  const validationSchema = Yup.object({
    sessionTitle: Yup.string()
      .required('عنوان جلسه الزامی است')
      .min(10, 'عنوان جلسه باید حداقل 10 کاراکتر باشد')
      .max(70, 'عنوان جلسه نباید بیشتر از 100 کاراکتر باشد')
      ,
  
    sessionDescribe: Yup.string()
      .required('توضیحات جلسه الزامی است')
      .min(10, 'توضیحات جلسه باید حداقل 10 کاراکتر باشد')
      .max(500, 'توضیحات جلسه نباید بیشتر از 500 کاراکتر باشد')
      ,
  
    scheduleSessionId: Yup.string()
      .required('شناسه جلسه الزامی است')
      .nullable(),  
  });
  
  

    const queryClient = useQueryClient()
    const UpdateSessionFun = useMutation({
        mutationKey:['UpdateSessionKey'],
        mutationFn: (values) => UpdateSession(values , row),
        onSuccess:() => {
            setShow(false)
            queryClient.invalidateQueries('getSessionList')
        }
    })
  
    const handleSubmit = (values) => {
        // send Api 
        console.log(values);
        UpdateSessionFun.mutate(values)
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
      <Tooltip sessionTitle='ویرایش کامنت' placement='top'>
      <Button size='sm' onClick={() => setShow(true)}>
        {title} 
      </Button>
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
                  <Label className='form-label' for='sessionTitle'>
                      عنوان جلسه <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='sessionTitle'
                    name='sessionTitle'
                    placeholder='sessionTitle'
                    value={values.sessionTitle}
                    onChange={handleChange}
                    invalid={touched.sessionTitle && !!errors.sessionTitle}
                  />
                  {touched.sessionTitle && errors.sessionTitle && <FormFeedback>{errors.sessionTitle}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='sessionDescribe'>
                       توضیحات جلسه<span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='sessionDescribe'
                    name='sessionDescribe'
                    placeholder='sessionDescribe'
                    value={values.sessionDescribe}
                    onChange={handleChange}
                    invalid={touched.sessionDescribe && !!errors.sessionDescribe}
                  />
                  {touched.sessionDescribe && errors.sessionDescribe && <FormFeedback>{errors.sessionDescribe}</FormFeedback>}
                </div>
                {row == null ? (
                <FormSelect 
                value={form}
                onChange={(e) => setForm(e.target.value)}
                    >
                {data?.map((item) => (
                    <option key={item.id} value={item.id} >{item.courseGroupId}</option>
                ))}
                 </FormSelect>
                ) : null }

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
export default AddSession;
