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


const Step3 = ({ stepper }) => {
  const user = useSelector(state => state.user.selectUser)
  const edit = useSelector(state => state.editUser.EditList)
console.log(edit);
  const initialValues = {
    homeAdderess: user.homeAdderess,
    userAbout: user.userAbout,
    latitude: user.latitude,
    longitude: user.longitude || '', // Default value for recovery email
  }

  const dispatch = useDispatch()

  // ** onSubmit Function
  const onSubmit = (values) => {
    const combinedData = {
        ...edit,
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
        onSubmit={onSubmit}
        enableReinitialize={true} // Enable reinitialization when Redux state changes
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='homeAdderess'>
                  آدرس  <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='homeAdderess'
                  name='homeAdderess'
                  placeholder='ساری اکادمی سپهر'
                  className={`form-control ${touched.homeAdderess && errors.homeAdderess ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='homeAdderess' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='userAbout'>
                   درباره کاربر <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='userAbout'
                  name='userAbout'
                  placeholder='مدرس دوره '
                  className={`form-control ${touched.userAbout && errors.userAbout ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='userAbout' component={FormFeedback} />
              </Col>
            </Row>

            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='latitude'>
                    عرض جغرافیایی <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='latitude'
                  name='latitude'
                  placeholder='123'
                  className={`form-control ${touched.latitude && errors.latitude ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='latitude' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='longitude'>
                   طول جغرافیایی 
                </Label>
                <Field
                  id='longitude'
                  name='longitude'
                  placeholder='456'
                  className={`form-control ${touched.longitude && errors.longitude ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='longitude' component={FormFeedback} />
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

export default Step3
