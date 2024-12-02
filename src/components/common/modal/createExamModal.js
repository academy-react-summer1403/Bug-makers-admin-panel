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
import { UpdateSocialGroup } from '../../../@core/api/socialGroup/updateSocialGroup';
import { Tooltip } from '@mui/material';
import { createExam } from '../../../@core/api/exam/createExam';

const CreateExamModal = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

  const defaultValue =  {
    title:  '',
    time: '',
    Level: '',
  } 

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('این فیلد الزامی است'),
  });

  const createExamFun = useMutation({
    mutationKey: ['examCreate'],
    mutationFn: (BulldingData) => createExam(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getExam');
    }
  });

  const handleSubmit = (values) => {
    createExamFun.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip placement='top' title='افزودن آزمون ' >
      <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن آزمون</h1>
            <p>اطلاعات گروه را وارد کنید</p>
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
                  <Label for="title">عنوان آزمون<span className="text-danger">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    style={{ width: '650px' }}
                    value={values.title}
                    onChange={handleChange}
                    invalid={touched.title && !!errors.title}
                  />
                  {touched.title && errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="time" > تایم آزمون به دقیقه<span className="text-danger">*</span></Label>
                  <Input
                    id="time"
                    name="time"
                    style={{ width: '650px' }}
                    value={values.time}
                    onChange={handleChange}
                    invalid={touched.time && !!errors.time}
                  />
                  {touched.time && errors.time && <FormFeedback>{errors.time}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="Level">سطح آزمون<span className="text-danger">*</span></Label>
                  <Input
                    id="Level"
                    name="Level"
                  style={{ width: '650px' }}
                    value={values.Level}
                    onChange={handleChange}
                    invalid={touched.Level && !!errors.Level}
                  />
                  {touched.Level && errors.Level && <FormFeedback>{errors.Level}</FormFeedback>}
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

export default CreateExamModal;
