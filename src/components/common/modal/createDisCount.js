import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateWallet } from '../../../@core/api/wallet/updateWallet';
import { getUser } from '../../../@core/api/user/getUserById';
import { Tooltip } from '@mui/material';
import { FormSelect } from 'react-bootstrap';
import { getCourseAllUser } from '../../../@core/api/course/getAllCByUser';
import { CreateDisCountApi } from '../../../@core/api/discount/createDisCount';

const CreateDisCount = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [userData, setUserData] = useState()

  // Get the list of users from the API
  const { data } = useQuery({
    queryKey: ['getCourse'],
    queryFn: getCourseAllUser,
  });
  const CostPrice = data?.courseFilterDtos?.find((el => el.courseId == userData))

console.log(data);
  console.log(data);
  const defaultValue = {
    discount: 0,
    Pcost: CostPrice?.cost,
    PODID: userData
  }

  const validationSchema = Yup.object().shape({
    Pcost: Yup.string().required('این فیلد الزامی است'),
    Pcost: Yup.string().required('این فیلد الزامی است'),
    PODID: Yup.string().required('لطفا یک دوره انتخاب کنید'),
  });
  const Pcost = CostPrice?.cost
  const CreateDisCountFun = useMutation({
    mutationKey: ['createDisCountKey'],
    mutationFn: (walletData) => CreateDisCountApi(walletData, Pcost , userData),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getCount');
    }
  });

  const handleSubmit = (values) => {
    CreateDisCountFun.mutate(values.discount);
    console.log(values.discount);
    setShow(false)
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title="افزودن تخفیف" placement="top">
        <Button onClick={() => setShow(true)} color="transparent" style={{ border: 'none' }}>
          {title}
        </Button>
      </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن تخفیف</h1>
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
                    {data?.courseFilterDtos?.map(user => (
                      <option key={user.courseId} value={user.courseId}>
                        {user.title}
                      </option>
                    ))}
                    </FormSelect>
                  {touched.UserId && errors.UserId && <FormFeedback>{errors.UserId}</FormFeedback>}
                </div> 
                <div className="mb-1 w-40">
                  <Label for="Pcost">قیمت اولیه <span className="text-danger">*</span></Label>
                  <Input
                    id="Pcost"
                    name="Pcost"
                    style={{ width: '600px' }}
                    value={values.Pcost}
                    onChange={handleChange}
                    invalid={touched.Pcost && !!errors.Pcost}
                  />
                  {touched.Pcost && errors.Pcost && <FormFeedback>{errors.Pcost}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="discount">درصد تخفیف<span className="text-danger">*</span></Label>
                  <Input
                    id="discount"
                    name="discount"
                    type='number'
                    style={{ width: '600px' }}
                    value={values.discount}
                    onChange={handleChange}
                    invalid={touched.discount && !!errors.discount}
                  />
                  {touched.discount && errors.discount && <FormFeedback>{errors.discount}</FormFeedback>}
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

export default CreateDisCount;
