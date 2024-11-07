import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateBuildding } from '../../../@core/api/building/updateBuildding';
import Map from '../map/map'; // Import Map component
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr';

const EditBullding = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();

  const defaultValue = row ? {
    id: row.id || null,
    buildingName: row.buildingName || '',
    floor: row.floor || 0,
    latitude: row.latitude ? row.latitude.toString() : '',
    longitude: row.longitude ? row.longitude.toString() : '',
    workDate: row.workDate || '',  // Make sure it's in the correct format
    active: row.active !== undefined ? row.active : true
  } : {
    buildingName: '',
    floor: 0,
    latitude: '',
    longitude: '',
    workDate: '',
    active: true
  };

  const validationSchema = Yup.object().shape({
    buildingName: Yup.string().required('این فیلد الزامی است'),
    floor: Yup.number().required('این فیلد الزامی است'),
    workDate: Yup.date().required('تاریخ الزامی است'),
    active: Yup.boolean(),
  });

  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateBuildding(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getBulding');
    }
  });

  const handleSubmit = (values) => {
    updateBuildding.mutate(values);
    console.log(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button onClick={() => setShow(true)} color="primary">{title}</Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">بروزرسانی ساختمان</h1>
            <p>اطلاعات ساختمان را وارد کنید</p>
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
                  <Label for="buildingName">نام ساختمان <span className="text-danger">*</span></Label>
                  <Input
                    id="buildingName"
                    name="buildingName"
                    value={values.buildingName}
                    onChange={handleChange}
                    invalid={touched.buildingName && !!errors.buildingName}
                  />
                  {touched.buildingName && errors.buildingName && <FormFeedback>{errors.buildingName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="floor">مساحت <span className="text-danger">*</span></Label>
                  <Input
                    id="floor"
                    name="floor"
                    type="number"
                    value={values.floor}
                    onChange={handleChange}
                    invalid={touched.floor && !!errors.floor}
                  />
                  {touched.floor && errors.floor && <FormFeedback>{errors.floor}</FormFeedback>}
                </div>

                {/* Fix Flatpickr onChange */}
                <Flatpickr
                  type="date"
                  name="workDate"
                  id="workDate"
                  style={{ width: '250px' }}
                  placeholder="ساعت کاری را انتخاب کنید"
                  className="form-control"
                  value={values.workDate}
                  onChange={(date) => {
                    // If using range, select the first date (0 index)
                    setFieldValue('workDate', date[0]);
                  }}
                  options={{
                    mode: 'range',
                    dateFormat: "Y-m-d"
                  }}
                />

                <div className="mb-1 w-40">
                  <Label for="active">فعال کردن دوره؟<span className="text-danger">*</span></Label>
                  <Input
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={values.active}
                    onChange={handleChange}
                    invalid={touched.active && !!errors.active}
                  />
                  {touched.active && errors.active && <FormFeedback>{errors.active}</FormFeedback>}
                </div>
                <Map row={row} />

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

export default EditBullding;
