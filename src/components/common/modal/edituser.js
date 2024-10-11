// ** React Imports
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { updateUser } from '../../../views/apps/user/store/index';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
import { Archive } from 'react-feather';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const EditUserExample = ({ onClick, user }) => {

  const [startDate, setStartDate] = useState(user.birthDay ? new Date(user.birthDay) : new Date());
  const dispatch = useDispatch();

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    gmail: Yup.string().email('فرمت ایمیل نامعتبر است').required('ایمیل الزامی است'),
    phoneNumber: Yup.string()
      .matches(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقم و با 09 شروع شود')
      .required('شماره تلفن الزامی است'),
    firstName: Yup.string().required('نام الزامی است'),
    lastName: Yup.string().required('نام خانوادگی الزامی است'),
    isStudent: Yup.boolean(),
    isTeacher: Yup.boolean(),
    nationalCode: Yup.number().required('کدملی الزامیست'),
    userType: Yup.mixed().test(
      'at-least-one',
      'باید حداقل یکی از گزینه‌های دانش‌آموز یا معلم انتخاب شود',
      (values, context) => {
        const { isStudent, isTeacher } = context.parent;
        return isStudent || isTeacher;
      }
    ),
  });

  // ** Form Submission
  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      birthDay: startDate.toISOString() // Convert to ISO string for API
    };
    dispatch(updateUser(formattedData));
    setShow(false);
  };

  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
      onClick={onClick}
    >
      <Archive size={14} />
      <div className="" onClick={() => setShow(true)}>
        Show
      </div>
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
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Formik
            initialValues={{
              id: user.id || '',
              lastName: user.lname || '',
              firstName: user.fname || '',
              gmail: user.gmail || '',
              phoneNumber: user.phoneNumber || '',
              isStudent: user.isStudent || false,
              isTeacher: user.isTeacher || false,
              nationalCode : user.NationalCode			 || '',
              birthDay: user.birthDay || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form>
                <div className='mb-1'>
                  <Label className='form-label' for='gmail'>
                    ایمیل <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='gmail'
                    name='gmail'
                    placeholder='user@gmail.com'
                    value={values.gmail}
                    onChange={handleChange}
                    invalid={touched.gmail && !!errors.gmail}
                  />
                  {touched.gmail && errors.gmail && <FormFeedback>{errors.gmail}</FormFeedback>}
                </div>

                <div className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                    شماره تلفن <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='(09xxxxxxxxx)'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    invalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && <FormFeedback>{errors.phoneNumber}</FormFeedback>}
                </div>

                <div className='mb-1'>
                  <Label className='form-label' for='firstName'>
                    نام <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='firstName'
                    name='firstName'
                    placeholder='نام'
                    value={values.firstName}
                    onChange={handleChange}
                    invalid={touched.firstName && !!errors.firstName}
                  />
                  {touched.firstName && errors.firstName && <FormFeedback>{errors.firstName}</FormFeedback>}
                </div>

                <div className='mb-1'>
                  <Label className='form-label' for='lastName'>
                    نام خانوادگی <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    placeholder='نام خانوادگی'
                    value={values.lastName}
                    onChange={handleChange}
                    invalid={touched.lastName && !!errors.lastName}
                  />
                  {touched.lastName && errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='nationalCode	'>
                    national code  <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='nationalCode'
                    name='nationalCode'
                    placeholder='national code'
                    value={values.nationalCode}
                    onChange={handleChange}
                    invalid={touched.nationalCode && !!errors.nationalCode		}
                  />
                  {touched.lastName && errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
                </div>

                <div className='mb-1'>
                  <Label className='form-label'>تاریخ تولد</Label>
                  <DatePicker
                    name='birthday'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </div>

                <div className='mb-1'>
                  <Label className='form-label'>نوع کاربر</Label>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <Label style={{ marginBottom: '0.5rem' }}>
                      <Input
                        type='checkbox'
                        name='isStudent'
                        checked={values.isStudent}
                        onChange={handleChange}
                      />
                      دانش‌آموز
                    </Label>
                    <Label style={{ marginBottom: '0.5rem' }}>
                      <Input
                        type='checkbox'
                        name='isTeacher'
                        checked={values.isTeacher}
                        onChange={handleChange}
                      />
                      معلم
                    </Label>
                    {errors.userType && <FormFeedback className="d-block">{errors.userType}</FormFeedback>}
                  </div>
                </div>

                <Button type='submit' className='me-1' color='primary'>
                  ارسال
                </Button>
                <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditUserExample;
