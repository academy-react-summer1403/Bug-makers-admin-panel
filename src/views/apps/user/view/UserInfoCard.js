// ** React Imports
import { useState, Fragment } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import moment from 'moment-jalaali';

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import avatar from '../../../../assets/images/avatars/2.png'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useSelector } from 'react-redux'
import EditUserExample from '../../../../components/common/modal/edituser';
import AddRole from '../../../../components/common/modal/addRole';
import LocationPicker from '../../../../components/common/modal/LocationPicker';

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

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


const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)
  const user = useSelector(state => state.user.selectUser); 


  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: user.userName,
      lName: user.lname,
      fName: user.fname,
      email:user.gmail,
    }
  })

  // ** render user img
  const renderUserImg = () => {

  }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: user.userName,
      lName: user.lname,
      fName: user.fname
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: 'User has been suspended.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Suspension :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  // isValidURL 
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const percentage = user.profileCompletionPercentage || 0; 
  
  // birthDay  
  const useBirthDay = (date) => {
    if(!date) return 'تاریخ تولد وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
        <img 
              src={isValidURL(user.currentPictureAddress) ? user.currentPictureAddress : avatar} 
              style={{width : '150px', height : '150px' , margin : 'auto' , display : 'block' , borderRadius : '100%' }}
              />
          <div className='d-flex justify-content-around my-2 pt-75'>

            <div className='d-flex align-items-start me-2 ' style={{marginTop : '5px'}}>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{user.coursesReseves.length ? user.coursesReseves.length	 : '0'}</h4>
                <small>{user.coursesReseves.length ? 'دور های رزرو شده' : 'این کاربر هیچ دوره ای را رزرو نکرده'}</small>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: 60, height: 60 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`, 
                    textColor: '#000',
                    trailColor: '#d6d6d6', 
                    backgroundColor: '#85d8ee' 
                  })}
                />
              </div>
              <div className='ms-75'>
                <h4 className='mb-0'>
                  {percentage > 0 ? percentage + '%' : 'این کاربر پروفایل خود را تکمیل نکرده'}
                </h4>
                <small>درصد تکمیل پروفایل</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>جزییات</h4>
          <div className='info-container'>
            {user !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نام کاربری : </span>
                  <span>{user.userName ? user.userName : 'این کاربر دارای نام کاربری نمیباشد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>آدرس ایمیل :</span>
                  <span>{user.gmail ? user.gmail : 'این کاربر دارای جیمیل نمیباشد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>وضعیت :</span>
                  <Badge className='text-capitalize' color={statusColors[user.active ? 'active' : 'inactive']}>
                    {user.active ? 'فعال' : 'غیرفعال'}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>تاریخ تولد : </span>
                  <span className='text-capitalize'>{useBirthDay(user.birthDay)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>کد ملی : </span>
                  <span className='text-capitalize'>{user.nationalCode ? user.nationalCode : 'کد ملی ثبت نشد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>جنسیت : </span>
                  <span className='text-capitalize'>{user.gender ? 'مرد' : 'زن'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>تاریخ ثبت نام : </span>
                  <span className='text-capitalize'>{useBirthDay(user.insertDate)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>آدرس : </span>
                  <span className='text-capitalize'>{user.homeAdderess ? user.homeAdderess : 'آدرس ثبت نشد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>درباره کاربر : </span>
                  <span className='text-capitalize'>{user.userAbout ? user.userAbout : 'اطلاعاتی ثبت نشد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نقش :</span>
                  <span className='text-capitalize'>{user.roles[0]?.roleName ? user.roles[0]?.roleName : 'هیچ دسترسی ندارد'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>شماره تلفن : </span>
                  <span>{user.phoneNumber ? user.phoneNumber : 'این کاربر دارای شماره تلفن نمیباشد'}</span>
                </li>
              </ul>
            ) : null}
          </div>

        {/* edit */}
           <EditUserExample size={'20px'} /> 
           <div style={{position : 'relative' ,right : '80px' , bottom : '20px'}} >
           <AddRole  size={'20px'} />
           </div>
           <LocationPicker />
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='fName'>
                  First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='fName'
                  name='fName'
                  render={({ field }) => (
                    <Input {...field} id='fName' placeholder='John' invalid={errors.fName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lName'>
                  Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lName'
                  name='lName'
                  render={({ field }) => (
                    <Input {...field} id='lName' placeholder='Doe' invalid={errors.lName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Usernadkcdkdme
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={user.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === user.status)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={user.phoneNumber.substr(user.phoneNumber.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='phoneNumber'>
                  phoneNumber
                </Label>
                <Input id='phoneNumber' defaultValue={user.phoneNumber} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={roleOptions}
                  theme={selectThemeColors}
                  defaultValue={roleOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
