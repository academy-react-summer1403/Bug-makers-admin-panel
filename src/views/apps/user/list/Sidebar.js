// ** React Import
import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Reactstrap Imports
import { Button, Label, Form, Input, FormFeedback } from 'reactstrap';

// ** Store & Actions
import { addUser } from '../store';

// ** Validation Schema
const validationSchema = Yup.object().shape({
  gmail: Yup.string().email('فرمت ایمیل نامعتبر است').required('ایمیل الزامی است'),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقم و با 09 شروع شود')
    .required('شماره تلفن الزامی است'),
  firstName: Yup.string().required('نام الزامی است'),
  lastName: Yup.string().required('نام خانوادگی الزامی است'),
  password: Yup.string().required('رمز عبور الزامی است').min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  // At least one checkbox should be checked
  isStudent: Yup.boolean(),
  isTeacher: Yup.boolean(),
  userType: Yup.mixed().test(
    'at-least-one',
    'باید حداقل یکی از گزینه‌های دانش‌آموز یا معلم انتخاب شود',
    (values, context) => {
      const { isStudent, isTeacher } = context.parent;
      return isStudent || isTeacher;
    }
  ),
});

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** Store Vars
  const dispatch = useDispatch();

  return (
    <Sidebar
      size='lg'
      open={open}
      title='کاربر جدید'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Formik
        initialValues={{
          lastName: '',
          firstName: '',
          gmail: '',
          password: '',
          phoneNumber: '',
          isStudent: false,
          isTeacher: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          dispatch(addUser(data)); // Submit the form data
          toggleSidebar();
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
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
                invalid={touched.gmail && !!errors.gmail} // Show error if touched
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
                invalid={touched.phoneNumber && !!errors.phoneNumber} // Show error if touched
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
                invalid={touched.firstName && !!errors.firstName} // Show error if touched
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
                invalid={touched.lastName && !!errors.lastName} // Show error if touched
              />
              {touched.lastName && errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='password'>
                رمز عبور <span className='text-danger'>*</span>
              </Label>
              <Input
                type='password'
                id='password'
                name='password'
                placeholder='رمز عبور'
                value={values.password}
                onChange={handleChange}
                invalid={touched.password && !!errors.password} // Show error if touched
              />
              {touched.password && errors.password && <FormFeedback>{errors.password}</FormFeedback>}
            </div>

            {/* User Type with checkboxes in column layout */}
            <div className='mb-1'>
              <Label className='form-label'>نوع کاربر</Label>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                <Label style={{ marginBottom: '0.5rem' }}>
                  <Input
                    type='checkbox'
                    name='isStudent'
                    checked={values.isStudent}
                    onChange={handleChange}
                    invalid={touched.isStudent && !!errors.userType} // Show error if validation fails
                  />
                  دانش‌آموز
                </Label>
                <Label style={{ marginBottom: '0.5rem' }}>
                  <Input
                    type='checkbox'
                    name='isTeacher'
                    checked={values.isTeacher}
                    onChange={handleChange}
                    invalid={touched.isTeacher && !!errors.userType} // Show error if validation fails
                  />
                  معلم
                </Label>
                {errors.userType && <FormFeedback className="d-block">{errors.userType}</FormFeedback>}
              </div>
            </div>

            <Button type='submit' className='me-1' color='primary'>
              ارسال
            </Button>
            <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
              انصراف
            </Button>
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

export default SidebarNewUsers;
