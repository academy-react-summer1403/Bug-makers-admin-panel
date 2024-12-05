// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Imports
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Input, FormFeedback } from 'reactstrap'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { setEditList } from '../../../redux/EditUser'

// ** Validation Schema using Yup
const validationSchema = Yup.object().shape({
  userName: Yup.string().required('نام کاربری الزامی است'),
  gmail: Yup.string().email('فرمت ایمیل نامعتبر است').required('ایمیل الزامی است'),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقم و با 09 شروع شود')
    .required('شماره تلفن الزامی است'),
  recoveryEmail: Yup.string()
    .email('فرمت ایمیل بازگردانی نامعتبر است')
    .notRequired(), // optional recovery email
})

const Step1 = ({ stepper }) => {
  const user = useSelector(state => state.user.selectUser)
    console.log(user);
  const initialValues = {
    userName: user.userName,
    gmail: user.gmail,
    phoneNumber: user.phoneNumber,
    recoveryEmail: user.recoveryEmail || '', // Default value for recovery email
  }

  const dispatch = useDispatch()

  // ** onSubmit Function
  const onSubmit = (values) => {
    const combinedData = {
      ...values, // the values submitted by the form
    }
    dispatch(setEditList(combinedData))
    stepper.next()
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>اطلاعات دوره</h5>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true} // Enable reinitialization when Redux state changes
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='userName'>
                  نام کاربری <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='userName'
                  name='userName'
                  placeholder='نام کاربری'
                  className={`form-control ${touched.userName && errors.userName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='userName' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='gmail'>
                  ایمیل <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='gmail'
                  name='gmail'
                  placeholder='user@gmail.com'
                  className={`form-control ${touched.gmail && errors.gmail ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='gmail' component={FormFeedback} />
              </Col>
            </Row>

            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='phoneNumber'>
                  شماره تلفن <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='phoneNumber'
                  name='phoneNumber'
                  placeholder='(09xxxxxxxxx)'
                  className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='phoneNumber' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='recoveryEmail'>
                  ایمیل بازگردانی
                </Label>
                <Field
                  id='recoveryEmail'
                  name='recoveryEmail'
                  placeholder='ایمیل بازگردانی'
                  className={`form-control ${touched.recoveryEmail && errors.recoveryEmail ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='recoveryEmail' component={FormFeedback} />
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

export default Step1
