// ** React Imports
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { addRole } from '../../../views/apps/user/store/index';
import { Switch } from '@mui/material'; 

import "react-datepicker/dist/react-datepicker.css";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Card
} from 'reactstrap'

// ** Third Party Components
import { UserPlus } from 'react-feather';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const AddRole = ({ onClick, size }) => {
  const user = useSelector(state => state.user.selectUser)
  const dispatch = useDispatch();

  // ** Validation Schema
  const validationSchema = Yup.object().shape({});

  // ** Form Submission
  const handleSubmit = (data) => {
    const formattedData = {
      RoleId: data.roleId,
      id: data.userId,
    };
    dispatch(addRole({ user: formattedData, enable: data.enable }));
    setShow(false);
  };

  // Default Values from API
  const defaultValue = {
    roleId: user.RoleId,
    userId: user.id,
    enable: false 
  };

  const [show, setShow] = useState(false);

  const roleOptions = [
    { RoleId: '1', label: 'ادمین', roleName: 'Administrator', roleParentName: null },
    { RoleId: '2', label: 'معلم', roleName: 'Teacher', roleParentName: null },
    { RoleId: '3', label: 'کارمند.ادمین', roleName: 'Employee.Admin', roleParentName: 'Admin' },
    { RoleId: '4', label: 'نویسنده ادمین', roleName: 'Employee.Writer', roleParentName: 'Employee.Admin' },
    { RoleId: '5', label: 'دانش آموز', roleName: 'Student', roleParentName: null },
    { RoleId: '7', label: 'مدیریت مسابقات', roleName: 'TournamentAdmin', roleParentName: null },
    { RoleId: '8', label: 'داور', roleName: 'Referee', roleParentName: null },
    { RoleId: '9', label: 'مربی مسابقات', roleName: 'TournamentMentor', roleParentName: 'TournamentAdmin' },
    { RoleId: '10', label: 'پشتیبان', roleName: 'Support', roleParentName: null }
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <UserPlus size={size} className=' cursor-pointer' onClick={() => setShow(true)} />
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
            <h1 className='mb-1'>ویرایش نقش کاربر</h1>
            <p>برای ویرایش نقش کاربر از گزینه‌های زیر استفاده کنید.</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' ,  minHeight : '400px'            }}>
                <Card style={{ width: '100%', padding: '20px' }}>
                  <Row>
                    <Col md="6">
                      <Label for='roleId'>نقش کاربر</Label>
                      <Input
                        type='select'
                        id='roleId'
                        name='roleId'
                        value={values.roleId}
                        onChange={handleChange}
                      >
                        {roleOptions.map((role) => (
                          <option key={role.RoleId} value={role.RoleId}>
                            {role.label}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="6">
                      <Label for='enable'>فعال بودن</Label>
                      <div className="d-flex align-items-center">
                        <Switch
                          checked={values.enable}
                          onChange={(e) => setFieldValue('enable', e.target.checked)}
                          color='primary'
                        />
                        <span>{values.enable ? 'فعال' : 'غیرفعال'}</span>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Row className='mt-3'>
                    <Col md="6">
                      <Button type='submit' style={{position: 'absolute' , bottom :'10px' , right: '100px'}} color='primary'>
                        ارسال
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button type='reset' color='secondary' style={{position: 'absolute' , bottom :'10px' , left: '100px'}} outline onClick={() => setShow(false)}>
                        انصراف
                      </Button>
                    </Col>
                  </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddRole;
