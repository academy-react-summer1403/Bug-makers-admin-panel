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
import { UpdateNotifType } from '../../../@core/api/Notif/notifType/createNotifType';

const EditNotifType = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

    const { data : courseAssData } = useQuery({
        queryKey: ['getCourseAss'],
        queryFn: getAssCourse,
      });
  const defaultValue = row ? {
    id: row.id || null,
    title: row.title || '',
    describe: row.describe || '',
  } : {
    title: '',
    describe: '',
  };

  const validationSchema = Yup.object().shape({
    describe: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    title: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['UpdateNotifType'],
    mutationFn: (BulldingData) => UpdateNotifType(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getNotifTypes');
    }
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
    <Tooltip title='افزودن تایپ اعلان' placement='top' >

      <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
    </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی نوع اعلان ' : 'افزودن   نوع اعلان'} </h1>
            <p>اطلاعات اعلان را وارد کنید</p>
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
                  <Label for="title">عنوان نوع اعلان <span className="text-danger">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                  style={{ width: '300px' }}
                    value={values.title}
                    onChange={handleChange}
                    invalid={touched.title && !!errors.title}
                  />
                  {touched.title && errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="describe">توضیحات نوع اعلان <span className="text-danger">*</span></Label>
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

export default EditNotifType;
