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
import { useMutation } from '@tanstack/react-query';
import { updateGroupWithId } from '../../../@core/api/groupPage/updateGroup';

const EditGroup = ({ size , id , CourseId , GroupCapacity , GroupName}) => {
  const user = useSelector(state => state.user.selectUser);

  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  // ** Validation Schema
  const validationSchema = Yup.object().shape({

  });

  // Default Values from API
  const defaultValue = {
    id: id || null, 
    GroupName: GroupName || '',
    CourseId: CourseId || '',
    GroupCapacity: GroupCapacity || 0
    };

    const updateGroup = useMutation({
        mutationKey:['updateGroupId'],
        mutationFn: (formData) => updateGroupWithId(formData),
        onSuccess:() => {
            setShow(false)
        }
    })
  
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('Id',id)
        formData.append('GroupName',values.GroupName)
        formData.append('CourseId',CourseId)
        formData.append('GroupCapacity',values.GroupCapacity)
        console.log(formData);

        // send Api 
        updateGroup.mutate(formData)
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
      <Edit size={size} className=' cursor-pointer' style={{marginTop: '2px'}} onClick={() => setShow(true)} />
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
            <h1 className='mb-1'>بروزرسانی گروه</h1>
            <p>اطلاعات گروه</p>
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
                  <Label className='form-label' for='GroupName'>
                     نام گروه <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='GroupName'
                    name='GroupName'
                    placeholder='GroupName'
                    value={values.GroupName}
                    onChange={handleChange}
                    invalid={touched.GroupName && !!errors.GroupName}
                  />
                  {touched.GroupName && errors.GroupName && <FormFeedback>{errors.GroupName}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='GroupCapacity'>
                     ظرفیت گروه<span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='GroupCapacity'
                    name='GroupCapacity'
                    type='number'
                    placeholder='GroupCapacity'
                    value={values.GroupCapacity}
                    onChange={handleChange}
                    invalid={touched.GroupCapacity && !!errors.GroupCapacity}
                  />
                  {touched.GroupCapacity && errors.GroupCapacity && <FormFeedback>{errors.GroupCapacity}</FormFeedback>}
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
export default EditGroup;
