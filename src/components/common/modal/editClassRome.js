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

const EditClassRome = ({ row, title }) => {
    const [show, setShow] = useState(false);
    const query = useQueryClient();
    const [buldingState, setBuldingState] = useState(row?.buildingId)

    const { data : buldingData } = useQuery({
        queryKey: ['getBuilding'],
        queryFn: getBuilding,
      });
  const defaultValue = row ? {
    id: row.id || null,
    classRoomName: row.classRoomName || '',
    capacity: row.capacity || '',
    buildingId: Number(buldingState) || '',
  } : {
    classRoomName: '',
    capacity: '',
    buildingId: Number(buldingState)
  };

  const validationSchema = Yup.object().shape({
    capacity: Yup.number().required('این فیلد الزامی است'),
    classRoomName: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    buildingId : Yup.number().required('این فیلد الزامی است')
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateClass'],
    mutationFn: (BulldingData) => UpdateClassRome(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getClass');
    }
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
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
            <h1 className="mb-1">{row ? 'بروزرسانی کلاس  ' : 'افزودن کلاس'} </h1>
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
                  <Label for="classRoomName">نام کلاس <span className="text-danger">*</span></Label>
                  <Input
                    id="classRoomName"
                    name="classRoomName"
                  style={{ width: '300px' }}
                    value={values.classRoomName}
                    onChange={handleChange}
                    invalid={touched.classRoomName && !!errors.classRoomName}
                  />
                  {touched.classRoomName && errors.classRoomName && <FormFeedback>{errors.classRoomName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="capacity"> ظرفیت کلاس<span className="text-danger">*</span></Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type='number'
                    style={{ width: '300px' }}
                    value={values.capacity}
                    onChange={handleChange}
                    invalid={touched.capacity && !!errors.capacity}
                  />
                  {touched.capacity && errors.capacity && <FormFeedback>{errors.capacity}</FormFeedback>}
                </div>


                <Input
                    type='select' 
                    name='buildingId'
                    style={{width:'620px'}}
                    value={buldingState}
                    onChange={(e) => setBuldingState(e.target.value)}
                >
                    <option>لطفا انتخاب کنید</option>
                    {buldingData?.map((item) => (
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

export default EditClassRome;
