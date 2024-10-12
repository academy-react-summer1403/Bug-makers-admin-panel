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
import { Archive, Linkedin } from 'react-feather';

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
      fName: Yup.string().required('نام الزامی است'),
    lName: Yup.string().required('نام خانوادگی الزامی است'),
    isStudent: Yup.boolean(),
    isTecher: Yup.boolean(),
    active: Yup.boolean(),
    userName: Yup.string().required('نام کاربری را وارد کنید'),
    nationalCode: Yup.number().required('کدملی الزامیست'),
    userType: Yup.mixed().test(
      'at-least-one',
      'باید حداقل یکی از گزینه‌های دانش‌آموز یا معلم انتخاب شود',
      (values, context) => {
        const { isStudent, isTecher } = context.parent;
        return isStudent || isTecher;
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


  // Default Values from API
  const defaultValue = {
    id: user.id || null, 
    fName: user.fname || null,
    lName: user.lname || null,
    userName: user.userName || null,
    gmail: user.gmail || null,
    phoneNumber: user.phoneNumber || null,
    active: user.active ? true : false,
    isDelete: user.isDelete || null,
    isTecher: user.isTecher || false,
    isStudent: user.isStudent || false,
    recoveryEmail: user.recoveryEmail || null,
    userAbout: user.userAbout || null,
    telegramLink: user.telegramLink || null,
    homeAdderess: user.homeAdderess || null,
    nationalCode: user.nationalCode || null,
    gender: user.gender || false,
    latitude: user.latitude || null,
    longitude: user.longitude || null,
    insertDate: user.insertDate || null, // اضافه شده
    birthDay: user.birthDay || null,
  };
  
  
  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState(true);
  
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
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form style={{  display : 'flex', justifyContent : 'center' , flexFlow: 'row wrap', gap: '14px'}}>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='userName'>
                    نام کاربری <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='userName'
                    name='userName'
                    placeholder='userName'
                    value={values.userName}
                    onChange={handleChange}
                    invalid={touched.userName && !!errors.userName}
                  />
                  {touched.userName && errors.userName && <FormFeedback>{errors.userName}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
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

                <div className='mb-1 w-40'>
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

                <div className='mb-1 w-40'>
                  <Label className='form-label' for='fName'>
                    نام <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='fName'
                    name='fName'
                    placeholder='نام'
                    value={values.fName}
                    onChange={handleChange}
                    invalid={touched.fName && !!errors.fName}
                  />
                  {touched.fName && errors.fName && <FormFeedback>{errors.fName}</FormFeedback>}
                </div>

                <div className='mb-1 w-40'>
                  <Label className='form-label' for='lName'>
                    نام خانوادگی <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='lName'
                    name='lName'
                    placeholder='نام خانوادگی'
                    value={values.lName}
                    onChange={handleChange}
                    invalid={touched.lName && !!errors.lName}
                  />
                  {touched.lName && errors.lName && <FormFeedback>{errors.lName}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='nationalCode'>
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
                  {touched.nationalCode && errors.nationalCode && <FormFeedback>{errors.nationalCode}</FormFeedback>}
                </div>


                {/* start  */}

                <div style={{width:'230px'}}>
                <Label className='form-label' for='gender'>
                    وضعیت <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    type='select'
                    id='gender'
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    invalid={touched.gender && !!errors.gender}
                  >
                    <option value='true'>مرد</option>
                    <option value='false'>زن</option>
                  </Input>
                  {touched.gender && errors.gender && <FormFeedback>{errors.gender}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='homeAdderess'>
                    ادرس  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='homeAdderess'
                    name='homeAdderess'
                    placeholder='آدرس'
                    value={values.homeAdderess}
                    onChange={handleChange}
                    invalid={touched.homeAdderess && !!errors.homeAdderess}
                  />
                  {touched.homeAdderess && errors.homeAdderess && <FormFeedback>{errors.homeAdderess}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='userAbout'>
                    درباره کاربر  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='userAbout'
                    name='userAbout'
                    placeholder='درباره کاربر'
                    value={values.userAbout}
                    onChange={handleChange}
                    invalid={touched.userAbout && !!errors.userAbout		}
                  />
                  {touched.userAbout && errors.userAbout && <FormFeedback>{errors.userAbout}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='recoveryEmail'>
                    ایمیل بازگردانی  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='recoveryEmail'
                    name='recoveryEmail'
                    placeholder='ایمیل  بازگردانی'
                    value={values.recoveryEmail}
                    onChange={handleChange}
                    invalid={touched.recoveryEmail && !!errors.recoveryEmail		}
                  />
                  {touched.recoveryEmail && errors.recoveryEmail && <FormFeedback>{errors.recoveryEmail}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='telegramLink'>
                    لینک تلگرام  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='telegramLink'
                    name='telegramLink'
                    placeholder='لینک تلگرام'
                    value={values.telegramLink}
                    onChange={handleChange}
                    invalid={touched.telegramLink && !!errors.telegramLink		}
                  />
                  {touched.telegramLink && errors.telegramLink && <FormFeedback>{errors.telegramLink}</FormFeedback>}
                </div>
                <div className='mb-1 ' style={{width : '230px'}}>
                  <Label className='form-label' for='gender'>
                    جنسیت <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    type='select'
                    id='gender'
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    invalid={touched.gender && !!errors.gender}
                  >
                    <option value='true'>مرد</option>
                    <option value='false'>زن</option>
                  </Input>
                  {touched.gender && errors.gender && <FormFeedback>{errors.gender}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='LinkedinLink'>
                    لینک لینکدین  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='LinkedinLink'
                    name='LinkedinLink'
                    placeholder='لینک لینکدین'
                    value={values.LinkedinLink}
                    onChange={handleChange}
                    invalid={touched.LinkedinLink && !!errors.LinkedinLink		}
                  />
                  {touched.LinkedinLink && errors.LinkedinLink && <FormFeedback>{errors.LinkedinLink}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='latitude'>
                    lat  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='latitude'
                    name='latitude'
                    placeholder='latitude'
                    value={values.latitude}
                    onChange={handleChange}
                    invalid={touched.latitude && !!errors.latitude		}
                  />
                  {touched.latitude && errors.latitude && <FormFeedback>{errors.latitude}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='longitude'>
                    long  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='longitude'
                    name='longitude'
                    placeholder='longitude'
                    value={values.longitude}
                    onChange={handleChange}
                    invalid={touched.longitude && !!errors.longitude		}
                  />
                  {touched.longitude && errors.longitude && <FormFeedback>{errors.longitude}</FormFeedback>}
                </div>

                <div className='mt-2 w-40'>
                  <Label className='form-label'> </Label>
                  <DatePicker
                    name='birthday'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </div>

                <div className='mb-1  ' style={{width: '300px'}}>
                  <Label className='form-label'>نوع کاربر</Label>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                    <Label style={{ marginBottom: '0.5rem' }}>
                      <Input
                        type='checkbox'
                        name='isTecher'
                        checked={values.isTecher}
                        onChange={handleChange}
                      />
                      معلم
                    </Label>
                    <Label style={{ marginBottom: '0.5rem' }}>
                      <Input
                        type='checkbox'
                        name='isStudent'
                        checked={values.isStudent}
                        onChange={handleChange}
                      />
                      دانش‌آموز
                    </Label>
                    {errors.userType && <FormFeedback className="d-block">{errors.userType}</FormFeedback>}
                  </div>
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
};

export default EditUserExample;
