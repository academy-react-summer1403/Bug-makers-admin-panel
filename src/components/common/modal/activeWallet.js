import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateWallet } from '../../../@core/api/wallet/updateWallet';
import { getUser } from '../../../@core/api/user/getUserById';
import { Tooltip } from '@mui/material';
import { FormSelect } from 'react-bootstrap';
import { activeWallet } from '../../../@core/api/wallet/active/active';

const ActiveWallet = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [userData, setUserData] = useState(1)
  
  const defaultValue = row ? {
    code: ''
  } : {

  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('این فیلد الزامی است'),
  });
  const id = row?.id
  const ActiveCode = useMutation({
    mutationKey: ['activeCodeAut'],
    mutationFn: (walletData) => activeWallet(walletData, id),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getWallet');
    }
  });

  const handleSubmit = (values) => {
    ActiveCode.mutate(values);
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
            <h1 className="mb-1">کد تایید</h1>
            <p>اطلاعات  کد تایید را وارد کنید</p>
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
                  <Label for="code">کد تایید <span className="text-danger">*</span></Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder='0000'
                    style={{ width: '600px' }}
                    value={values.code}
                    onChange={handleChange}
                    invalid={touched.code && !!errors.code}
                  />
                  {touched.code && errors.code && <FormFeedback>{errors.code}</FormFeedback>}
                </div>
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

export default ActiveWallet;
