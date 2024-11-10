import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { addRole } from '../../../views/apps/user/store/index';
import { Switch, Tooltip } from '@mui/material'; 
import Select from 'react-select'; // For multi-select
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
import { useMutation } from '@tanstack/react-query';
import { AddRoleUser } from '../../../@core/api/course/addRole';

const AddRole = ({ onClick, size }) => {
  const user = useSelector(state => state.user.selectUser)
  const dispatch = useDispatch();
  // Default Values from API
  const defaultValue = {
    roles: user.roles ? user.roles.map(role => ({
      value: role.id, 
      label: role.roleName 
    })) : [],  
    userId: user.id,
    enableAllRoles: false,
    currentUserId: user.id
  };

  // ** Validation Schema
  const validationSchema = Yup.object().shape({});

  const mutation = useMutation({
    mutationKey:['AddRole'],
    mutationFn: (data) => AddRoleUser(data)
  })

  // ** Form Submission
  const handleSubmit = (data) => {
    const formattedData = data.roles.map(role => ({
      roleAccessDto: {
        roleId: Number(role.value),
        userId: user.id,
      },
      enable: true,
      currentUserId: user.id
    }));
    mutation.mutate(formattedData)    
    setShow(false);
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
      <Tooltip title='افزودن دسترسی' placement='top'>
        <UserPlus size={size} className='cursor-pointer' onClick={() => setShow(true)} />
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
            <h1 className='mb-1'>ویرایش نقش کاربر</h1>
            <p>برای ویرایش نقش کاربر از گزینه‌های زیر استفاده کنید.</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px', minHeight: '400px' }}>
                <Card style={{ width: '100%', padding: '20px' }}>
                  <Row>
                    <Col md="12">
                      <Label for='roles'>نقش‌ها</Label>
                      <Select
                        isMulti
                        name="roles"
                        options={roleOptions.map(role => ({
                          value: role.RoleId,
                          label: role.label
                        }))}
                        value={values.roles}
                        onChange={selectedOptions => setFieldValue('roles', selectedOptions)}
                      />
                    </Col>
                    <Col md="12" className="mt-3">
                      <Label for='enableAllRoles'>فعال سازی همه</Label>
                      <div className="d-flex align-items-center">
                        <Switch
                          checked={values.enableAllRoles}
                          onChange={(e) => setFieldValue('enableAllRoles', e.target.checked)}
                          color='primary'
                        />
                        <span>{values.enableAllRoles ? 'فعال' : 'غیرفعال'}</span>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Row className='mt-3'>
                  <Col md="6">
                    <Button type='submit' style={{ position: 'absolute' , bottom :'10px' , right: '100px' }} color='primary'>
                      ارسال
                    </Button>
                  </Col>
                  <Col md="6">
                    <Button type='reset' color='secondary' style={{ position: 'absolute' , bottom :'10px' , left: '100px' }} outline onClick={() => setShow(false)}>
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

