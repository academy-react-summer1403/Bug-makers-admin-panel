import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateBuildding } from '../../../@core/api/building/updateBuildding';
import Map from '../map/map'; // Import Map component
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr';
import { UpdateAssWork } from '../../../@core/api/assWork/assWorkPage/updateAssWork';
import { getAssCourse } from '../../../@core/api/assWork/getAssCourse';
import { Tooltip } from '@mui/material';
import { getBuilding } from '../../../@core/api/building/building';
import { UpdateClassRome } from '../../../@core/api/course/classRome/UpdateClassRome';
import { UpdateStatus } from '../../../@core/api/course/status/updateStatus';

const EditStatus = ({ row, title ,length }) => {
    const [show, setShow] = useState(false);
    const query = useQueryClient();
    const [buldingState, setBuldingState] = useState(row?.buildingId)

    const { data : buldingData } = useQuery({
        queryKey: ['getBuilding'],
        queryFn: getBuilding,
      });
  const defaultValue = row ? {
    id: row.id || null,
    statusName: row.statusName || '',
    describe: row.describe || '',
    statusNumber: row.statusNumber || '',
  } : {
    statusName: '',
    describe: '',
    statusNumber: length + 1,
  };

  const validationSchema = Yup.object().shape({
    describe: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    statusName: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateStatusFun = useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: (BulldingData) => UpdateStatus(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getStatus');
    }
  });

  const handleSubmit = (values) => {
    updateStatusFun.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
    <Tooltip title='افزودن تسک' placement='top' >

      <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
    </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی وضعیت  ' : 'افزودن وضعیت'} </h1>
            <p>اطلاعات کلاس را وارد کنید</p>
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
                  <Label for="statusName">نام وضعیت <span className="text-danger">*</span></Label>
                  <Input
                    id="statusName"
                    name="statusName"
                  style={{ width: '300px' }}
                    value={values.statusName}
                    onChange={handleChange}
                    invalid={touched.statusName && !!errors.statusName}
                  />
                  {touched.statusName && errors.statusName && <FormFeedback>{errors.statusName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="describe"> توضیحات<span className="text-danger">*</span></Label>
                  <Input
                    id="describe"
                    name="describe"
                    style={{ width: '300px' }}
                    value={values.describe}
                    onChange={handleChange}
                    invalid={touched.describe && !!errors.describe}
                  />
                  {touched.describe && errors.describe && <FormFeedback>{errors.describe}</FormFeedback>}
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

export default EditStatus;
