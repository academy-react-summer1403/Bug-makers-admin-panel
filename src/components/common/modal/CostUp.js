import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateWallet } from '../../../@core/api/wallet/updateWallet';
import { getUser } from '../../../@core/api/user/getUserById';
import { Tooltip } from '@mui/material';
import { FormSelect } from 'react-bootstrap';
import { UpdateTransaction } from '../../../@core/api/wallet/Transaction/UpdateTransaction';

const CostUp = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [userData, setUserData] = useState(1)
  
  // Get the list of users from the API
  const { data } = useQuery({
    queryKey: ['getUserData'],
    queryFn: getUser,
  });

  const math = (min ,max) => {
    return Math.floor(Math.random() * (max - min + 1))  + min
  }

  const defaultValue =  {
    WalletId: row.id ,
    Title: '' ,
    Serial: math(1,1000).toString() , 
    Cost: '',
  }




  const validationSchema = Yup.object().shape({
    Cost: Yup.number().required('این فیلد الزامی است').min(5, 'حداقل 5 کاراکتر'),
    Title: Yup.string().required('این فیلد الزامی است'),
    Serial: Yup.string().required('لطفا یک کاربر انتخاب کنید').nullable(),
  });
  const id = row?.id
  const createTransactionFun = useMutation({
    mutationKey: ['createTransaction'],
    mutationFn: (walletData) => UpdateTransaction(walletData, id),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getWallet');
    }
  });

  const handleSubmit = (values) => {
    createTransactionFun.mutate(values);
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
            <h1 className="mb-1">افزایش موجودی</h1>
            <p>اطلاعات  تراکنش را وارد کنید</p>
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
                  <Label for="Cost">مبلغ پرداختی<span className="text-danger">*</span></Label>
                  <Input
                    id="Cost"
                    name="Cost"
                    type='number'
                    style={{ width: '600px' }}
                    value={values.Cost}
                    onChange={handleChange}
                    invalid={touched.Cost && !!errors.Cost}
                  />
                  {touched.Cost && errors.Cost && <FormFeedback>{errors.Cost}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="Title">عنوان تراکنش<span className="text-danger">*</span></Label>
                  <Input
                    id="Title"
                    name="Title"
                    style={{ width: '600px' }}
                    value={values.Title}
                    onChange={handleChange}
                    invalid={touched.Title && !!errors.Title}
                  />
                  {touched.Title && errors.Title && <FormFeedback>{errors.Title}</FormFeedback>}
                </div>
{/* 
                <div className="mb-1 w-40">
                  <Label for="Serial">آیدی کاربر<span className="text-danger">*</span></Label>
                  <FormSelect
                    id="Serial"
                    name="Serial"
                    type="select"
                    style={{ width: '600px' }}
                    value={userData}
                    onChange={(e) => setUserData(e.target.value)}
                    invalid={touched.Serial && !!errors.Serial}
                  >
                    <option value="">لطفا یک کاربر انتخاب کنید</option>
                    {data?.listUser.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.fname + ' ' + user.lname}
                      </option>
                    ))}
                    </FormSelect>
                  {touched.Serial && errors.Serial && <FormFeedback>{errors.Serial}</FormFeedback>}
                </div> */}
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

export default CostUp;
