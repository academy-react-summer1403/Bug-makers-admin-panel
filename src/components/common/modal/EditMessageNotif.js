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
import { Switch, Tooltip } from '@mui/material';
import { UpdateNotifType } from '../../../@core/api/Notif/notifType/createNotifType';
import { UpdateNotificationMessage } from '../../../@core/api/Notif/NotifMessageList/createNotifMessage';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';

const EditMessageNotif = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()
    const [archiveState, setArchiveState] = useState(row?.inArchive)
    const [typeID, setTypeID] = useState(1)

    const { data } = useQuery({
        queryKey: ['getNotifTypes'],
        queryFn: getNotifType,
      });

    const defaultValue = row ? {
    id: row.id || null,
    title: row.title || '',
    describeText: row.describeText || '',
    notificationTypeId: row.notificationTypeId,
    notificationIcon: row.notificationIcon,
    inArchive: Boolean(archiveState)
  } : {
    title: '',
    describeText: '',
    notificationTypeId : typeID,
    notificationIcon: '',
  };

  const validationSchema = Yup.object().shape({
    describeText: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    title: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    notificationIcon: Yup.string().required('این فیلد الزامی است').min(10,'حداقل 10 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['UpdateNotifMessage'],
    mutationFn: (BulldingData) => UpdateNotificationMessage(BulldingData, row),
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
    <Tooltip title='افزودن پیام اعلان' placement='top' >

      <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
    </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  پیام اعلان ' : 'افزودن   پیام اعلان'} </h1>
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
                  <Label for="title">عنوان پیام اعلان <span className="text-danger">*</span></Label>
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
                  <Label for="describeText">توضیحات پیام اعلان <span className="text-danger">*</span></Label>
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
                  <Label for="notificationIcon">آدرس آیکون<span className="text-danger">*</span></Label>
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
                <div style={{width:'300px'}} className="mb-1 w-40">
                  <Label for="inArchive">وضعیت آرشیو</Label>
                  <Input
                    type="select"
                    name="inArchive"
                    id="inArchive"
                    value={archiveState}
                    onChange={(e) => setArchiveState(e.target.value)}
                  >
                    <option value={true}>آرشیو شده</option>
                    <option value={false}>آرشیو نشده</option>
                  </Input>
                </div>
                {row == null ? (
                    <div style={{width:'620px'}} className="mb-1 w-40">
                        <Label for="notificationTypeId">نام تایپ اعلان</Label>
                        <Input
                            type="select"
                            name="notificationTypeId"
                            id="notificationTypeId"
                            value={typeID}
                            onChange={(e) => setTypeID(e.target.value)}
                            >
                            {data?.map((item , index) => (
                                <option key={index} value={item.createByInfo}>{item.title}</option>
                            ))}
                        </Input>
                    </div>
                ) : null}
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

export default EditMessageNotif;
