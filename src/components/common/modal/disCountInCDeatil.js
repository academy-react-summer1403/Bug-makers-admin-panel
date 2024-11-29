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
import { CreateDisCountApi } from '../../../@core/api/discount/createDisCount';

const CourseDisCount = ({ cost , uuid , title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [userData, setUserData] = useState(1)
  
  const defaultValue = {
    disCount: ''
  } ;

  const validationSchema = Yup.object().shape({
    disCount: Yup.number().required('این فیلد الزامی است'),
  });

  const DisCountFun = useMutation({
    mutationKey: ['createDisCount'],
    mutationFn: (values) => CreateDisCountApi(values, cost, uuid),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('courseDetails');
    }
  });

  const handleSubmit = (values) => {
    DisCountFun.mutate(values.disCount);
    setShow(false)
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button onClick={() => setShow(true)} color='primary' style={{marginRight:'10px'}}>
         {title}
      </Button>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ایجاد کد تخفیف</h1>
            <p>اطلاعات  تخفیف  را وارد کنید</p>
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
                  <Label for="disCount">درصد تخفیف<span className="text-danger">*</span></Label>
                  <Input
                    id="disCount"
                    name="disCount"
                    type='number'
                    placeholder='0'
                    style={{ width: '600px' }}
                    value={values.disCount}
                    onChange={handleChange}
                    invalid={touched.disCount && !!errors.disCount}
                  />
                  {touched.disCount && errors.disCount && <FormFeedback>{errors.disCount}</FormFeedback>}
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

export default CourseDisCount;
