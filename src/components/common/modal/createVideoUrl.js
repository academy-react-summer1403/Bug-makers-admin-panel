import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateCourseGroupName } from '../../../@core/api/video/videoApi';
import toast from 'react-hot-toast';
import { Switch, TextField, Tooltip, MenuItem, Select } from '@mui/material';

const AddVideoToGroup = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();

  const validationSchema = Yup.object().shape({
    videoUrl: Yup.string().required('لطفا URL ویدیو را وارد کنید'),
    title: Yup.string().required('لطفا عنوان ویدیو را وارد کنید'),
    isLock: Yup.boolean().required('وضعیت قفل بودن ویدیو الزامی است'),
    groupId: Yup.string().required('لطفا گروه مورد نظر را انتخاب کنید')
  });

  const addVideo = useMutation({
    mutationKey: ['addVideo'],
    mutationFn: (updatedData) => UpdateCourseGroupName(updatedData, row.id),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getVideo');
      toast.success('ویدیو با موفقیت اضافه شد');
    },
  });

  const handleSubmit = (values) => {
    const videoId = Math.round(Math.random() * 100);

    const newVideo = {
      videoId,
      title: values.title,
      isLock: values.isLock,
      videoUrl: values.videoUrl,
    };

    const updatedValues = {
      courseId: row.courseId,
      groups: row.groups.map(group => {
        if (group.groupId === values.groupId) {
          return { 
            ...group, 
            videos: [...group.videos, newVideo] 
          };
        }
        return group; 
      }),
    };

    addVideo.mutate(updatedValues);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title='افزودن ویدیو' placement='top'>
        <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static">
        <ModalHeader toggle={() => setShow(false)}>اضافه کردن ویدیو به گروه</ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <Formik
            initialValues={{ groupId: row.groups[0].groupId, title: '', isLock: false, videoUrl: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="mb-1">
                  <Label for="groupId">گروه ویدیو<span className="text-danger">*</span></Label>
                  <Select
                    labelId="groupId"
                    id="groupId"
                    value={values.groupId}
                    onChange={handleChange}
                    name="groupId"
                    fullWidth
                    error={touched.groupId && !!errors.groupId}
                  >
                    {row.groups.map(group => (
                      <MenuItem key={group.groupId} value={group.groupId}>
                        {group.groupName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.groupId && errors.groupId && <FormFeedback>{errors.groupId}</FormFeedback>}
                </div>

                <div className="mb-1">
                  <Label for="title">عنوان ویدیو<span className="text-danger">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    invalid={touched.title && !!errors.title}
                  />
                  {touched.title && errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </div>

                <div className="mb-1">
                  <Label for="videoUrl">URL ویدیو<span className="text-danger">*</span></Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={values.videoUrl}
                    onChange={handleChange}
                    invalid={touched.videoUrl && !!errors.videoUrl}
                  />
                  {touched.videoUrl && errors.videoUrl && <FormFeedback>{errors.videoUrl}</FormFeedback>}
                </div>

                <div className="mb-1">
                  <Label for="isLock">ویدیو قفل است؟</Label>
                  <Switch
                    id="isLock"
                    name="isLock"
                    checked={values.isLock}
                    onChange={(e) => setFieldValue('isLock', e.target.checked)}
                  />
                </div>

                <Button type="submit" color="primary">افزودن ویدیو</Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(false)}>انصراف</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddVideoToGroup;
