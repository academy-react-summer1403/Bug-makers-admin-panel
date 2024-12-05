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
  fName: Yup.string().required('نام الزامی است'),
  lName: Yup.string().required('نام خانوادگی الزامی است'),
  nationalCode: Yup.string().matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد').required('کد ملی الزامی است'),
})

const Step2 = ({ stepper }) => {
  const user = useSelector(state => state.user.selectUser)
  const edit = useSelector(state => state.editUser.EditList)

  console.log(edit);
  const initialValues = {
    fName: user.fName,
    lName: user.lName,
    nationalCode: user.nationalCode,
    currentPictureAddress: user.currentPictureAddress || '', 
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
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true} // Enable reinitialization when Redux state changes
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='fName'>
                  نام  <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='fName'
                  name='fName'
                  placeholder='محمد'
                  className={`form-control ${touched.fName && errors.fName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='fName' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='lName'>
                  نام خانوادگی <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='lName'
                  name='lName'
                  placeholder='بحر العلومی'
                  className={`form-control ${touched.lName && errors.lName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='lName' component={FormFeedback} />
              </Col>
            </Row>

            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label' for='nationalCode'>
                   کد ملی <span className='text-danger'>*</span>
                </Label>
                <Field
                  id='nationalCode'
                  name='nationalCode'
                  placeholder='(09xxxxxxxxx)'
                  className={`form-control ${touched.nationalCode && errors.nationalCode ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='nationalCode' component={FormFeedback} />
              </Col>

              <Col md='6' className='mb-1'>
                <Label className='form-label' for='currentPictureAddress'>
                  عکس پروفایل 
                </Label>
                <Field
                  id='currentPictureAddress'
                  name='currentPictureAddress'
                  placeholder='عکس پروفایل'
                  className={`form-control ${touched.currentPictureAddress && errors.currentPictureAddress ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name='currentPictureAddress' component={FormFeedback} />
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

export default Step2
