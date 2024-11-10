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
import { UpdateCheckListTour } from '../../../@core/api/Tournament/TourCheckList/updateCheckList';

const EditTourCheckList = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

    const { data : courseAssData } = useQuery({
        queryKey: ['getCourseAss'],
        queryFn: getAssCourse,
      });
  const defaultValue = row ? {
    id: row.id || null,
    scoreNumber: row.scoreNumber || '',
    checkListId: row.checkListId || '',
    tournamentId: row.tournamentId || '',
  } : {
    scoreNumber: '',
    groupLink: '',
    courseId: courseAss,
};

  const validationSchema = Yup.object().shape({
    scoreNumber: Yup.number().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateCheckListTour'],
    mutationFn: (BulldingData) => UpdateCheckListTour(BulldingData, row),
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
      <Button style={{padding:'5px' , fontSize:'12px'}} onClick={() => setShow(true)} color="primary">{title}</Button>
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
                  <Label for="scoreNumber">امتیاز<span className="text-danger">*</span></Label>
                  <Input
                    id="scoreNumber"
                    name="scoreNumber"
                    type='number'
                  style={{ width: '300px' }}
                    value={values.scoreNumber}
                    onChange={handleChange}
                    invalid={touched.scoreNumber && !!errors.scoreNumber}
                  />
                  {touched.scoreNumber && errors.scoreNumber && <FormFeedback>{errors.scoreNumber}</FormFeedback>}
                </div>
                {row == undefined ? (
                <Input
                    type='select' 
                    name='courseId'
                    style={{width:'620px'}}
                    onChange={(e) => setCourseAss(e.target.value)}
                >
                    {courseAssData?.map((item) => (
                        <option key={item.id} value={item.id}>{item.courseName}</option>
                    ))}
                </Input>
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

export default EditTourCheckList;
