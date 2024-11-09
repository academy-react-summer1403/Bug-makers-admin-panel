import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateBuildding } from '../../../@core/api/building/updateBuildding';
import Map from '../map/map'; // Import Map component
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr';
import { FormSelect } from 'react-bootstrap';
import { UpdateTour } from '../../../@core/api/Tournament/updateTour';

const EditTour = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();

  const defaultValue = row ? {
    id: row.id || null,
    tournamentName: row.tournamentName || '',
    describe: row.describe || 0,
    avgRange: row.avgRange || 0,
    startDate: row.startDate || '',  // Make sure it's in the correct format
    endDate: row.endDate || '',  // Make sure it's in the correct format
    active: row.active
  } : {
    tournamentName: '',
    describe: '',
    avgRange: 0,
    active: '',
    startDate: '',
    endDate: '',
  };

  const validationSchema = Yup.object().shape({
    tournamentName: Yup.string().required('این فیلد الزامی است'),
    describe: Yup.string().required('این فیلد الزامی است').min(10 , 'حداقل 10 کاراکتر').max(499,'حداکثر 499 کاراکتر'),
    avgRange: Yup.number().required('این فیلد الزامی است').min(19, 'حداقل 19 امتیاز').max(254 , 'حداکثر 254 امتیاز'),
    startDate: Yup.date().required('تاریخ الزامی است'),
    endDate: Yup.date().required('تاریخ الزامی است'),
    active: Yup.boolean(),
  });

  
  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateTour(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getBulding');
    }
  });

  const handleSubmit = (values) => {
    values.active = values.active === 'true';
    updateBuildding.mutate(values);
    console.log(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button  style={{marginTop: '2px', padding:'5px 5px', fontSize:'10px'}} onClick={() => setShow(true)} color="primary">{title}</Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  تورنومنت' : 'افزودن تورنومنت '} </h1>
            <p>اطلاعات تورنومنت را وارد کنید</p>
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
                  <Label for="tournamentName">نام تورنومنت <span className="text-danger">*</span></Label>
                  <Input
                    id="tournamentName"
                    name="tournamentName"
                    value={values.tournamentName}
                    onChange={handleChange}
                    invalid={touched.tournamentName && !!errors.tournamentName}
                  />
                  {touched.tournamentName && errors.tournamentName && <FormFeedback>{errors.tournamentName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="describe">توضیحات تورنومنت <span className="text-danger">*</span></Label>
                  <Input
                    id="describe"
                    name="describe"
                    value={values.describe}
                    onChange={handleChange}
                    invalid={touched.describe && !!errors.describe}
                  />
                  {touched.describe && errors.describe && <FormFeedback>{errors.describe}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="avgRange">avgRange  <span className="text-danger">*</span></Label>
                  <Input
                    id="avgRange"
                    name="avgRange"
                    type='number'
                    value={values.avgRange}
                    onChange={handleChange}
                    invalid={touched.avgRange && !!errors.avgRange}
                  />
                  {touched.avgRange && errors.avgRange && <FormFeedback>{errors.avgRange}</FormFeedback>}
                </div>

                <Flatpickr
                    name="startDate"
                    id="startDate"
                    style={{ width: '300px' }}
                    className="form-control"
                    value={values.startDate}
                    onChange={(date) => {
                        const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : ''; // 'en-CA' gives YYYY-MM-DD format
                        setFieldValue('startDate', formattedDate);
                    }}
                    options={{
                        dateFormat: "Y-m-d",
                    }}
                    />

                    <Flatpickr
                    name="endDate"
                    id="endDate"
                    style={{ width: '300px' }}
                    className="form-control"
                    value={values.endDate}
                    onChange={(date) => {
                        const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : ''; // 'en-CA' gives YYYY-MM-DD format
                        setFieldValue('endDate', formattedDate);
                    }}
                    options={{
                        dateFormat: "Y-m-d",
                    }}
                    />


                <div className="mb-1 w-40">
                <Label for="active">فعال بودن<span className="text-danger">*</span></Label>
                <FormSelect
                    id="active"
                  style={{ width: '650px' }}
                    name="active"
                    value={values.active}
                    onChange={handleChange}
                    invalid={touched.active && !!errors.active}
                >
                    <option value={true}>فعال</option>
                    <option value={false}>غیرفعال</option>
                </FormSelect>
                {touched.active && errors.active && <FormFeedback>{errors.active}</FormFeedback>}
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

export default EditTour;
