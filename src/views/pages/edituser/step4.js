import { Fragment, useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setEditList } from '../../../redux/EditUser'
import DatePicker from "react-multi-date-picker"
import transition from "react-element-popper/animations/transition"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from 'moment-jalaali'

const Step4 = ({ stepper }) => {
  const user = useSelector(state => state.user.selectUser)
  const edit = useSelector(state => state.editUser.EditList)

  const [dateState, setDateState] = useState(user.birthDay ? moment(user.birthDay).format('jYYYY/jMM/jDD') : '')

  const initialValues = {
    birthDay: user.birthDay || '', 
    gender: user.gender || '', 
    linkdinProfile: user.linkdinProfile || '',
    telegramLink: user.telegramLink || '',
  }

  const dispatch = useDispatch()

  const convertPersianToEnglishNumbers = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return str.split('').map(char => {
      const index = persianNumbers.indexOf(char);
      return index !== -1 ? englishNumbers[index] : char;
    }).join('');
  }

  // ** onSubmit Function
  const onSubmit = (values) => {
    // If the birthDay field is empty or not modified, use the user birthDay
    const birthDayInGregorian = values.birthDay 
      ? moment(convertPersianToEnglishNumbers(dateState), 'jYYYY/jMM/jDD').format('YYYY-MM-DD') 
      : '';

    const combinedData = {
        ...edit,
        ...values,
        birthDay: dateState ? new Date(birthDayInGregorian).toISOString() : user?.birthDay , 
    }

    // Dispatch the updated data
    dispatch(setEditList(combinedData))

    // Proceed to the next step if birthDay has a valid value
    if (birthDayInGregorian) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>اطلاعات دوره</h5>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          birthDay: Yup.string().required('تاریخ تولد الزامی است'),
          gender: Yup.string().required('جنسیت الزامی است'),
        })}
        onSubmit={onSubmit}
        enableReinitialize={true} // Reinitialize form when the user data changes
      >
        {({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='birthDay'>
                  تاریخ تولد
                </Label>
                <Field name="birthDay">
                  {({ field, form }) => (
                    <DatePicker
                      style={{ width: '660px', height: '38px' }}
                      value={values.birthDay || dateState} // Set initial value as the current value in state
                      onChange={(date) => {
                        setDateState(date?.format("YYYY/MM/DD"));
                        setFieldValue("birthDay", date?.format("YYYY-MM-DD")); // Set form value for birthDay
                      }} 
                      animations={[transition()]}
                      calendar={persian} 
                      locale={persian_fa} 
                      calendarPosition="bottom-center"
                    />
                  )}
                </Field>
                <ErrorMessage name="birthDay" component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='gender'>
                  جنسیت
                </Label>
                <Field
                  as='select'
                  id='gender'
                  name='gender'
                  className={`form-control ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
                  value={values.gender || ''} 
                >
                  <option value="">انتخاب کنید</option>
                  <option value="true">مرد</option>
                  <option value="false">زن</option>
                </Field>
                <ErrorMessage name='gender' component={FormFeedback} />
              </Col>
            </Row>

            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='linkdinProfile'>
                  لینک پروفایل لینکدین <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='linkdinProfile'
                  name='linkdinProfile'
                  placeholder='لینک پروفایل لینکدین'
                  className={`form-control ${touched.linkdinProfile && errors.linkdinProfile ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='linkdinProfile' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='telegramLink'>
                  لینک تلگرام
                </Label>
                <Field
                  id='telegramLink'
                  name='telegramLink'
                  placeholder='لینک تلگرام'
                  className={`form-control ${touched.telegramLink && errors.telegramLink ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='telegramLink' component={FormFeedback} />
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

export default Step4
