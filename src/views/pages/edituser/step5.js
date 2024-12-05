// ** React Imports
import { Fragment } from 'react'

// ** Third Party Imports
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Button, FormFeedback } from 'reactstrap'

// ** React Select Imports
import Select from 'react-select'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { setEditList } from '../../../redux/EditUser'

// ** Validation Schema using Yup

const roleOptions = [
  { id: '1', label: 'ادمین', roleName: 'Administrator', roleParentName: null },
  { id: '2', label: 'معلم', roleName: 'Teacher', roleParentName: null },
  { id: '3', label: 'کارمند.ادمین', roleName: 'Employee.Admin', roleParentName: 'Admin' },
  { id: '4', label: 'نویسنده ادمین', roleName: "Employee.Writer", roleParentName: "Employee.Admin" },
  { id: '5', label: 'دانش آموز', roleName: 'Student', roleParentName: null },
  { id: '7', label: 'مدیریت مسابقات', roleName: 'TournamentAdmin', roleParentName: null },
  { id: '8', label: 'داور', roleName: 'Referee', roleParentName: null },
  { id: '9', label: 'مربی مسابقات', roleName: 'TournamentMentor', roleParentName: 'TournamentAdmin' },
  { id: '10', label: 'پشتیبان', roleName: 'Support', roleParentName: null }
]



const Step5 = ({ stepper }) => {
  const user = useSelector(state => state.user.selectUser)
  const edit = useSelector(state => state.editUser.EditList)

  const initialValues = {
    isTecher: user.isTecher || false,
    isStudent: user.isStudent || false,
    twoStepAuth: user.twoStepAuth || false,
    roles: user.roles ? user.roles.map(role => ({ value: role.id, label: role.roleName })) : [], // تبدیل داده‌ها به { value, label }
  }

  const dispatch = useDispatch()

  const roleSelect = roleOptions.map(role => ({
    value: role.id,    
    label: role.roleName,  
  }))

  // ** onSubmit Function
  const onSubmit = (values) => {
    const formattedRoles = values.roles.map(role => ({
      id: parseInt(role.value),  
      roleName: role.label,      
      roleParentName: role.roleParentName || null,  
    }));
  
    const combinedData = {
        ...edit,
      ...values,
      roles: formattedRoles  
    }
  
    dispatch(setEditList(combinedData));
    stepper.next();
  }
  

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>اطلاعات دوره</h5>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true} // Enable reinitialization when Redux state changes
      >
        {({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='isTecher'>
                  وضعیت معلم
                </Label>
                <Field
                  as="select"
                  id="isTecher"
                  name="isTecher"
                  className={`form-control ${touched.isTecher && errors.isTecher ? 'is-invalid' : ''}`}
                  value={values.isTecher ? 'true' : 'false'}
                  onChange={e => setFieldValue('isTecher', e.target.value === 'true')}
                >
                  <option value="true">بله</option>
                  <option value="false">خیر</option>
                </Field>
                <ErrorMessage name='isTecher' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='isStudent'>
                  وضعیت دانشجویی
                </Label>
                <Field
                  as="select"
                  id="isStudent"
                  name="isStudent"
                  className={`form-control ${touched.isStudent && errors.isStudent ? 'is-invalid' : ''}`}
                  value={values.isStudent ? 'true' : 'false'}
                  onChange={e => setFieldValue('isStudent', e.target.value === 'true')}
                >
                  <option value="true">بله</option>
                  <option value="false">خیر</option>
                </Field>
                <ErrorMessage name='isStudent' component={FormFeedback} />
              </Col>
            </Row>

            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='twoStepAuth'>
                  وضعیت تأیید دو مرحله‌ای
                </Label>
                <Field
                  as="select"
                  id="twoStepAuth"
                  name="twoStepAuth"
                  className={`form-control ${touched.twoStepAuth && errors.twoStepAuth ? 'is-invalid' : ''}`}
                  value={values.twoStepAuth ? 'true' : 'false'}
                  onChange={e => setFieldValue('twoStepAuth', e.target.value === 'true')}
                >
                  <option value="true">فعال</option>
                  <option value="false">غیرفعال</option>
                </Field>
                <ErrorMessage name='twoStepAuth' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='roles'>
                  نقش کاربر
                </Label>
                <Select
                  id="roles"
                  name="roles"
                  options={roleSelect}  // استفاده از داده‌های { value, label }
                  className={`react-select ${touched.roles && errors.roles ? 'is-invalid' : ''}`}
                  value={values.roles}
                  onChange={value => setFieldValue('roles', value)}
                  isMulti
                />
                <ErrorMessage name='roles' component={FormFeedback} />
              </Col>
            </Row>

            <div className='d-flex justify-content-between'>
              <Button
                type='button'
                color='primary'
                className='btn-prev'
                onClick={() => stepper.previous()}
              >
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
              </Button>
              <Button type='submit' color='primary' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default Step5
