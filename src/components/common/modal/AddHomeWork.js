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
import { UpdateHomeWork } from '../../../@core/api/session/getHomeWork';
const EditHomeWork = ({row , title , idSession}) => {
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
    sessionId: idSession || '',
    hwTitle: row?.hwTitle || '',
    hwDescribe: row?.hwDescribe || ''
  };

  
  const validationSchema = Yup.object({
    hwTitle: Yup.string()
      .required('عنوان جلسه الزامی است')
      .min(40, 'عنوان کار باید حداقل 40 کاراکتر باشد')
      .max(70, 'عنوان کار نباید بیشتر از 100 کاراکتر باشد')
      ,
  
    hwDescribe: Yup.string()
      .required('توضیحات جلسه الزامی است')
      .min(10, 'توضیحات کار باید حداقل 10 کاراکتر باشد')
      .max(500, 'توضیحات کار نباید بیشتر از 500 کاراکتر باشد')
      ,
  });
  
  

    const queryClient = useQueryClient()
    const UpdateSessionFun = useMutation({
        mutationKey:['AddHomeWork'],
        mutationFn: (values) => UpdateHomeWork(values , row),
        onSuccess:() => {
            setShow(false)
            queryClient.invalidateQueries('getHomeWorkList')
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
      <Tooltip hwTitle='ویرایش کامنت' placement='top'>
      <Button onClick={() => setShow(true)}>
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
            <h1 className='mb-1'>بروزرسانی کار در منزل</h1>
            <p>اطلاعات کار</p>
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
                  <Label className='form-label' for='hwTitle'>
                      عنوان کار منزل <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='hwTitle'
                    name='hwTitle'
                    placeholder='hwTitle'
                    value={values.hwTitle}
                    onChange={handleChange}
                    invalid={touched.hwTitle && !!errors.hwTitle}
                  />
                  {touched.hwTitle && errors.hwTitle && <FormFeedback>{errors.hwTitle}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='hwDescribe'>
                       توضیحات کار منزل<span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='hwDescribe'
                    name='hwDescribe'
                    placeholder='hwDescribe'
                    value={values.hwDescribe}
                    onChange={handleChange}
                    invalid={touched.hwDescribe && !!errors.hwDescribe}
                  />
                  {touched.hwDescribe && errors.hwDescribe && <FormFeedback>{errors.hwDescribe}</FormFeedback>}
                </div>
                {/* {row == null ? (
                <FormSelect 
                value={form}
                onChange={(e) => setForm(e.target.value)}
                    >
                {data?.map((item) => (
                    <option key={item.id} value={item.id} >{item.courseGroupId}</option>
                ))}
                 </FormSelect>
                ) : null } */}

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
export default EditHomeWork;
