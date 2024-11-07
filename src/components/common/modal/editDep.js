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

const EditDep = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [Buildding, setBuildding] = useState(1)
  const defaultValue = row ? {
    id: row.id || null,
    depName: row.depName,
    buildingId: Number(Buildding) || 1,
  } : {
    depName: '',
    buildingId: Number(Buildding),
  };

  const { data : buldingId } = useQuery({
    queryKey: ['getBuilding'],
    queryFn: getBuilding,
  });


  const validationSchema = Yup.object().shape({
    depName: Yup.string().required('این فیلد الزامی است'),
  });

  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateDep(BulldingData, row),
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
                  <Label for="depName">نام بخش <span className="text-danger">*</span></Label>
                  <Input
                    id="depName"
                    name="depName"
                    style={{width: '680px'}}
                    value={values.depName}
                    onChange={handleChange}
                    invalid={touched.depName && !!errors.depName}
                  />
                  {touched.depName && errors.depName && <FormFeedback>{errors.depName}</FormFeedback>}
                </div>
                <Input
                    type='select' 
                    name='buildingId'
                    onChange={(e) => setBuildding(e.target.value)}
                >
                    {buldingId?.map((item) => (
                        <option key={item.id} value={item.id}>{item.buildingName}</option>
                    ))}
                </Input>
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

export default EditDep;
