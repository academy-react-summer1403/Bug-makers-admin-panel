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

const CreateTest = ({ id, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

  const defaultValue =  {
    examId: id,
    question:  '',
    Correct: '',
    op1: '',
    op2: '',
    op3: '',
    op4: '',
  } 

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
    Correct: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
    op1: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
    op2: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
    op3: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
    op4: Yup.string().required('این فیلد الزامی است').min(3 , 'حداقل 3 کاراکتر'),
  });

  const createTestFun = useMutation({
    mutationKey: ['TestCreate'],
    mutationFn: (BulldingData) => createTest(BulldingData),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getByIdList');
    }
  });

  const handleSubmit = (values) => {
    createTestFun.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip placement='top' title='افزودن تست ' >
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
                  <Label for="question">سوال تست<span className="text-danger">*</span></Label>
                  <Input
                    id="question"
                    name="question"
                    style={{ width: '650px' }}
                    value={values.question}
                    onChange={handleChange}
                    invalid={touched.question && !!errors.question}
                  />
                  {touched.question && errors.question && <FormFeedback>{errors.question}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="Correct" >پاسخ صحیح<span className="text-danger">*</span></Label>
                  <Input
                    id="Correct"
                    name="Correct"
                    style={{ width: '650px' }}
                    value={values.Correct}
                    onChange={handleChange}
                    invalid={touched.Correct && !!errors.Correct}
                  />
                  {touched.Correct && errors.Correct && <FormFeedback>{errors.Correct}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="op1"> سوال اول<span className="text-danger">*</span></Label>
                  <Input
                    id="op1"
                    name="op1"
                  style={{ width: '300px' }}
                    value={values.op1}
                    onChange={handleChange}
                    invalid={touched.op1 && !!errors.op1}
                  />
                  {touched.op1 && errors.op1 && <FormFeedback>{errors.op1}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="op2"> سوال دوم<span className="text-danger">*</span></Label>
                  <Input
                    id="op2"
                    name="op2"
                  style={{ width: '300px' }}
                    value={values.op2}
                    onChange={handleChange}
                    invalid={touched.op2 && !!errors.op2}
                  />
                  {touched.op2 && errors.op2 && <FormFeedback>{errors.op2}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="op3"> سوال سوم<span className="text-danger">*</span></Label>
                  <Input
                    id="op3"
                    name="op3"
                  style={{ width: '300px' }}
                    value={values.op3}
                    onChange={handleChange}
                    invalid={touched.op3 && !!errors.op3}
                  />
                  {touched.op3 && errors.op3 && <FormFeedback>{errors.op3}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="op4"> سوال چهارم<span className="text-danger">*</span></Label>
                  <Input
                    id="op4"
                    name="op4"
                  style={{ width: '300px' }}
                    value={values.op4}
                    onChange={handleChange}
                    invalid={touched.op4 && !!errors.op4}
                  />
                  {touched.op4 && errors.op4 && <FormFeedback>{errors.op4}</FormFeedback>}
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

export default CreateTest;
