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
import { createTest } from '../../../@core/api/exam/createTest';
import { UpdateCourseGroupName } from '../../../@core/api/video/videoApi';
import toast from 'react-hot-toast';

const CreateCourseVideoGroup = ({row ,  title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

    console.log(row);
    console.log(row?.groups);
  const defaultValue =  {
    courseId: row.courseId,
    groups : [
        {
            groupId : Math.random() * 100,
            groupName: '',
            videos:[]
        }
    ]
  } 

  const validationSchema = Yup.object().shape({
    groupName: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
  });

  const createGroup = useMutation({
    mutationKey: ['createGroup'],
    mutationFn: (BulldingData) => UpdateCourseGroupName(BulldingData , row.id),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getVideo');
      toast.success('گروه اضافه شد')
    }
  });


  const handleSubmit = (values) => {
    const updatedValues = {
      courseId : row.courseId,
      groups: [
        ...row.groups,  
        ...values.groups.map(group => ({
          groupId: Math.round(Math.random() * 100),
          groupName: values.groupName,
          videos: [],
        })),
      ],
    };

    createGroup.mutate(updatedValues);
    setShow(false);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip placement='top' title='افزودن گروه ' >
      <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن گروه دوره</h1>
            <p>اطلاعات گروه دوره را وارد کنید</p>
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
                  <Label for="groupName">نام گروه<span className="text-danger">*</span></Label>
                  <Input
                    id="groupName"
                    name="groupName"
                    style={{ width: '650px' }}
                    value={values.groupName}
                    onChange={handleChange}
                    invalid={touched.groupName && !!errors.groupName}
                  />
                  {touched.groupName && errors.groupName && <FormFeedback>{errors.groupName}</FormFeedback>}
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

export default CreateCourseVideoGroup;
