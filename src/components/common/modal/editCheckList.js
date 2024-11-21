import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateBuildding } from '../../../@core/api/building/updateBuildding';
import Map from '../map/map'; // Import Map component
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr';
import { UpdateDep } from '../../../@core/api/Department/updateDep';
import { getBuilding } from '../../../@core/api/building/building';
import { UpdateCheckList } from '../../../@core/api/Tournament/checkList/updateCheckList';
import { Tooltip } from '@mui/material';

const EditCheckList = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [Buildding, setBuildding] = useState(1)
  const defaultValue = row ? {
    id: row.id || null,
    title: row.title,
  } : {
    title: '',
  };

  const { data : buldingId } = useQuery({
    queryKey: ['getBuilding'],
    queryFn: getBuilding,
  });


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('این فیلد الزامی است'),
  });

  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateCheckList(BulldingData, row),
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
      <Tooltip placement='top' title='افزودن چک لیست'>
        <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  چک لیست' : 'افزودن چک لیست '}</h1>
            <p>اطلاعات چک لیست را وارد کنید</p>
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
                  <Label for="title">نام چک لیست <span className="text-danger">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    style={{width: '680px'}}
                    value={values.title}
                    onChange={handleChange}
                    invalid={touched.title && !!errors.title}
                  />
                  {touched.title && errors.title && <FormFeedback>{errors.title}</FormFeedback>}
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

export default EditCheckList;
