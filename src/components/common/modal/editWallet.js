import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateWallet } from '../../../@core/api/wallet/updateWallet';
import { getUser } from '../../../@core/api/user/getUserById';
import { Tooltip } from '@mui/material';
import { FormSelect } from 'react-bootstrap';

const EditWallet = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [userData, setUserData] = useState(1)
  
  // Get the list of users from the API
  const { data } = useQuery({
    queryKey: ['getUserData'],
    queryFn: getUser,
  });

  const defaultValue = row ? {
    UserName: row.UserName ,
    UserId: row.UserId , // Default to row's UserId if it exists
    Password: row.Password,
  } : {
    Password: '',
    UserName: '',
    UserId: userData.toString(),
  };

  const validationSchema = Yup.object().shape({
    Password: Yup.string().required('این فیلد الزامی است').min(5, 'حداقل 5 کاراکتر'),
    UserName: Yup.string().required('این فیلد الزامی است'),
    UserId: Yup.string().required('لطفا یک کاربر انتخاب کنید').nullable(),
  });
  const id = row?.id
  const UpdateWalletData = useMutation({
    mutationKey: ['updateWalletInfo'],
    mutationFn: (walletData) => UpdateWallet(walletData, id),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getWallet');
    }
  });

  const handleSubmit = (values) => {
    UpdateWalletData.mutate(values);
    setShow(false)
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title="افزودن کیف پول" placement="top">
        <Button onClick={() => setShow(true)} color="transparent" style={{ border: 'none' }}>
          {title}
        </Button>
      </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی کیف پول' : 'افزودن کیف پول'}</h1>
            <p>اطلاعات کیف پول را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                <div className="mb-1 w-40">
                  <Label for="Password">رمز امنیتی<span className="text-danger">*</span></Label>
                  <Input
                    id="Password"
                    name="Password"
                    style={{ width: '600px' }}
                    value={values.Password}
                    onChange={handleChange}
                    invalid={touched.Password && !!errors.Password}
                  />
                  {touched.Password && errors.Password && <FormFeedback>{errors.Password}</FormFeedback>}
                </div>
                {row == null ? (
                <>
                <div className="mb-1 w-40">
                  <Label for="UserName">نام کاربری<span className="text-danger">*</span></Label>
                  <Input
                    id="UserName"
                    name="UserName"
                    style={{ width: '600px' }}
                    value={values.UserName}
                    onChange={handleChange}
                    invalid={touched.UserName && !!errors.UserName}
                  />
                  {touched.UserName && errors.UserName && <FormFeedback>{errors.UserName}</FormFeedback>}
                </div>

                <div className="mb-1 w-40">
                  <Label for="UserId">آیدی کاربر<span className="text-danger">*</span></Label>
                  <FormSelect
                    id="UserId"
                    name="UserId"
                    type="select"
                    style={{ width: '600px' }}
                    value={userData}
                    onChange={(e) => setUserData(e.target.value)}
                    invalid={touched.UserId && !!errors.UserId}
                  >
                    <option value="">لطفا یک کاربر انتخاب کنید</option>
                    {data?.listUser.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.fname + ' ' + user.lname}
                      </option>
                    ))}
                    </FormSelect>
                  {touched.UserId && errors.UserId && <FormFeedback>{errors.UserId}</FormFeedback>}
                </div>
                </>
                ) : null} 
                <Button type="submit" color="primary">ارسال</Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(false)}>انصراف</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditWallet;
