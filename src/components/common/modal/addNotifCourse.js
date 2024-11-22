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
import { getCourseGroupId } from '../../../@core/api/course/getCourseWithGroupId';
import { getGroup } from '../../../@core/api/course/getGroup';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import { createNotifCourse } from '../../../@core/api/course/addNotid';

const AddNotifCourse = ({ row, uuid ,teacherId}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [groupState, setGroupState] = useState()
    const [typeId, setTypeId] = useState()

    const { data : group } = useQuery({
        queryKey: ['getCourseGroup' , uuid , teacherId],
        queryFn: () => getGroup(teacherId , uuid),
      });

      const { data } = useQuery({
        queryKey: ['getNotifTypes'],
        queryFn: getNotifType,
      });
  const defaultValue =  {
    title: '',
    describeText:  '',
    notificationIcon:  '',
    courseId: uuid ,
    courseGroupId: Number(groupState) || '',
    notificationTypeId: Number(typeId) || '',
  }

  const validationSchema = Yup.object().shape({
    describeText: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    notificationIcon: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    title: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => createNotifCourse(BulldingData, row),
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
    <Tooltip title='افزودن تسک' placement='top' >

      <Button onClick={() => setShow(true)} className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'>ایجاد اعلان</Button>
    </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن   اعلان </h1>
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
                  <Label for="title">عنوان اعلان <span className="text-danger">*</span></Label>
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
                  <Label for="describeText">توضیحات اعلان <span className="text-danger">*</span></Label>
                  <Input
                    id="describeText"
                    name="describeText"
                  style={{ width: '300px' }}
                    value={values.describeText}
                    onChange={handleChange}
                    invalid={touched.describeText && !!errors.describeText}
                  />
                  {touched.describeText && errors.describeText && <FormFeedback>{errors.describeText}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="notificationIcon">آدرس آیکون  <span className="text-danger">*</span></Label>
                  <Input
                    id="notificationIcon"
                    name="notificationIcon"
                  style={{ width: '300px' }}
                    value={values.notificationIcon}
                    onChange={handleChange}
                    invalid={touched.notificationIcon && !!errors.notificationIcon}
                  />
                  {touched.notificationIcon && errors.notificationIcon && <FormFeedback>{errors.notificationIcon}</FormFeedback>}
                </div>
                <Input
                    type='select' 
                    name='notificationTypeId'
                    style={{width:'300px' , height:'40px' ,marginTop:'22px'}}
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                >
                    {data?.map((item) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </Input>
                <Input
                    type='select' 
                    name='courseGroupId'
                    // style={{width:'300px'}}
                    value={groupState}
                    onChange={(e) => setGroupState(e.target.value)}
                >
                    <option>انتخاب کنید</option>
                    {group?.map((item) => (
                        <option key={item.groupId} value={item.groupId}>{item.groupName}</option>
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

export default AddNotifCourse;
