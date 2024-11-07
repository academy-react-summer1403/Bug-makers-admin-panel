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

const EditAssWork = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

    const { data : courseAssData } = useQuery({
        queryKey: ['getCourseAss'],
        queryFn: getAssCourse,
      });
  const defaultValue = row ? {
    id: row.id || null,
    worktitle: row.worktitle || '',
    workDescribe: row.workDescribe || '',
    workDate: row.workDate || '',
    assistanceId: courseAss || '',
  } : {
    worktitle: '',
    workDescribe: '',
    workDate: '',
    assistanceId: courseAss
  };

  const validationSchema = Yup.object().shape({
    workDescribe: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    worktitle: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => UpdateAssWork(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getBulding');
    }
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button onClick={() => setShow(true)} color="primary">{title}</Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی تعیین تسک ' : 'افزودن   تسک'} </h1>
            <p>اطلاعات تسک را وارد کنید</p>
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
                  <Label for="worktitle">نام تسک <span className="text-danger">*</span></Label>
                  <Input
                    id="worktitle"
                    name="worktitle"
                  style={{ width: '300px' }}
                    value={values.worktitle}
                    onChange={handleChange}
                    invalid={touched.worktitle && !!errors.worktitle}
                  />
                  {touched.worktitle && errors.worktitle && <FormFeedback>{errors.worktitle}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="workDescribe">توضیحات تسک <span className="text-danger">*</span></Label>
                  <Input
                    id="workDescribe"
                    name="workDescribe"
                  style={{ width: '300px' }}
                    value={values.workDescribe}
                    onChange={handleChange}
                    invalid={touched.workDescribe && !!errors.workDescribe}
                  />
                  {touched.workDescribe && errors.workDescribe && <FormFeedback>{errors.workDescribe}</FormFeedback>}
                </div>

                {/* Fix Flatpickr onChange */}
                <Flatpickr
                  type="date"
                  name="workDate"
                  id="workDate"
                  style={{ width: '300px' }}
                  placeholder="ساعت کاری را انتخاب کنید"
                  className="form-control"
                  value={values.workDate}
                  onChange={(date) => {
                    setFieldValue('workDate', date[0]);
                  }}
                  options={{
                    mode: 'range',
                    dateFormat: "Y-m-d"
                  }}
                />
                <Input
                    type='select' 
                    name='assistanceId'
                    style={{width:'300px'}}
                    onChange={(e) => setCourseAss(e.target.value)}
                >
                    {courseAssData?.map((item) => (
                        <option key={item.id} value={item.id}>{item.courseName}</option>
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

export default EditAssWork;
