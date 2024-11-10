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
import { Tooltip } from '@mui/material';

const EditUserExample = ({ onClick , size}) => {
  const user = useSelector(state => state.user.selectUser);

  const [startDate, setStartDate] = useState(new Date());
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
    twoStepAuth: Yup.boolean(),
    active: Yup.boolean(),
    gender: Yup.boolean(),
    userName: Yup.string().required('نام کاربری را وارد کنید'),
    nationalCode: Yup.number().required('کدملی الزامیست'),
    userType: Yup.mixed().test(
      'at-least-one',
      'باید حداقل یکی از گزینه‌های دانش‌آموز یا معلم انتخاب شود',
      (values, context) => {
        const { isStudent, isTecher , twoStepAuth} = context.parent;
        return isStudent || isTecher || twoStepAuth;
      }
    ),
  });

  // ** Form Submission

  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      birthDay: startDate.toISOString(), // Convert to ISO string for API
      roles: roleOptions.filter(role => data.roles.includes(role.id)).map(role => ({
        id: role.id,
        roleName: role.roleName,
        roleParentName: role.roleParentName
      }))
    };
    dispatch(updateUser(formattedData));
    setShow(false);
  };

  // Default Values from API
  const defaultValue = {
    id: user.id || null, 
    fName: user.fName || null,
    lName: user.lName || null,
    userName: user.userName || null,
    gmail: user.gmail || null,
    phoneNumber: user.phoneNumber || null,
    active: user.active ? true : false,
    isDelete: user.isDelete || null,
    isTecher: user.isTecher || false,
    isStudent: user.isStudent || false,
    twoStepAuth: user.twoStepAuth || false,
    recoveryEmail: user.recoveryEmail || null,
    userAbout: user.userAbout || null,
    telegramLink: user.telegramLink || null,
    homeAdderess: user.homeAdderess || null,
    nationalCode: user.nationalCode || null,
    gender: !!(user.gender) ,
    latitude: user.latitude || null,
    longitude: user.longitude || null,
    insertDate: user.insertDate || null, 
    birthDay: user.birthDay || null,
    linkdinProfile : user.linkdinProfile || null,
    currentPictureAddress: user.currentPictureAddress || null,
    roles: user.roles?.map(role => ({
      id: Number(role.id), 
      roleName: role.roleName, 
      roleParentName: role.roleParentName
    })) || []
    };
  
  
  const [show, setShow] = useState(false);  

  const roleOptions = [
    { id: '1', label: 'ادمین', roleName: 'Administrator', roleParentName: null },
    { id: '2', label: 'معلم', roleName: 'Teacher', roleParentName: null },
    { id: '3', label: 'کارمند.ادمین', roleName: 'Employee.Admin', roleParentName: 'Admin' },
    { id: '4', label: 'نویسنده ادمین' , roleName: "Employee.Writer", roleParentName: "Employee.Admin" },
    { id: '5', label: 'دانش آموز', roleName: 'Student', roleParentName: null },
    { id: '7', label: 'مدیریت مسابقات', roleName: 'TournamentAdmin', roleParentName: null },
    { id: '8', label: 'داور', roleName: 'Referee', roleParentName: null },
    { id: '9', label: 'مربی مسابقات', roleName: 'TournamentMentor', roleParentName: 'TournamentAdmin' },
    { id: '10', label: 'پشتیبان', roleName: 'Support', roleParentName: null }
  ];

  const useBirthDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
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
      <Tooltip title='ویرایش کاربر' placement='top'>
        <Edit size={size} className=' cursor-pointer' style={{marginTop: '2px'}} onClick={() => setShow(true)} />
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
            <h1 className='mb-1'>آپدیت اطلاعات کاربر</h1>
            <p>اطلاعات کاربر</p>
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
                    جنسیت <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    type='select'
                    id='gender'
                    name='gender'
                    value={values.gender}
                    onChange={(e) => {
                      const value = e.target.value === 'true';
                      handleChange({ target: { name: 'gender', value } });
                    }}
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
                  <Label className='form-label' for='currentPictureAddress'>
                   عکس پروفایل  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='currentPictureAddress'
                    name='currentPictureAddress'
                    placeholder='درباره کاربر'
                    value={values.currentPictureAddress}
                    onChange={handleChange}
                    invalid={touched.currentPictureAddress && !!errors.currentPictureAddress		}
                  />
                  {touched.currentPictureAddress && errors.currentPictureAddress && <FormFeedback>{errors.currentPictureAddress}</FormFeedback>}
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
                  <Label className='form-label' for='linkdinProfile'>
                    لینک لینکدین  <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    id='linkdinProfile'
                    name='linkdinProfile'
                    placeholder='لینک لینکدین'
                    value={values.linkdinProfile}
                    onChange={handleChange}
                    invalid={touched.linkdinProfile && !!errors.linkdinProfile		}
                  />
                  {touched.linkdinProfile && errors.linkdinProfile && <FormFeedback>{errors.linkdinProfile}</FormFeedback>}
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

                <div className='mb-1' style={{ width: '230px' }}>
                  <Label className='form-label' for='roles'>
                    نقش <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    type='select'
                    id='roles'
                    name='roles'
                    multiple
                    value={values.roles}
                    onChange={handleChange}
                    invalid={touched.roles && !!errors.roles}
                  >
                    {roleOptions.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.label}
                      </option>
                    ))}
                  </Input>
                  {touched.roles && errors.roles && <FormFeedback>{errors.roles}</FormFeedback>}
                </div>

                <div className='mb-1' style={{ width: '230px' }}>
                  <Label className='form-label' for='birthDay'>
                    تاریخ تولد <span className='text-danger'>اختیاری</span>
                  </Label>
                  <DatePicker 
                  selected={startDate} 
                  onChange={(date) => 
                  setStartDate(date)} 
                  value={useBirthDay(values.birthDay)}
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
                    <Label style={{ marginBottom: '0.5rem' }}>
                      <Input
                        type='checkbox'
                        name='twoStepAuth'
                        checked={values.twoStepAuth}
                        onChange={handleChange}
                      />
                      احراز دوعاملی
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
