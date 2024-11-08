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
import { UpdateTourGroup } from '../../../@core/api/Tournament/group/updateTourGroup';
import { useSelector } from 'react-redux';
import { getTournoment } from '../../../@core/api/Tournament/getTouronment';

const EditTourGroup = ({ row, title , TourId  , color}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [Tour, setTour] = useState()

    const {data : TourList} = useQuery({
        queryKey:['getTourList'],
        queryFn: getTournoment
    })

  const defaultValue = row ? {
    id: row.id || null,
    groupName: row.groupName || '',
    describe: row.describe || '',
    tournamentId: TourId ,
  } : {
    groupName:  '',
    describe:  '',
    tournamentId: TourId ,
};

  const validationSchema = Yup.object().shape({
    describe: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    groupName: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => UpdateTourGroup(BulldingData, row),
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
      <Button onClick={() => setShow(true)} style={{padding:'5px' , fontSize:'12px'}} color={color}>{title}</Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  گروه' : 'افزودن گروه '}</h1>
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
                  <Label for="groupName">نام گروه  <span className="text-danger">*</span></Label>
                  <Input
                    id="groupName"
                    name="groupName"
                  style={{ width: '300px' }}
                    value={values.groupName}
                    onChange={handleChange}
                    invalid={touched.groupName && !!errors.groupName}
                  />
                  {touched.groupName && errors.groupName && <FormFeedback>{errors.groupName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="describe">توضیحات گروه  <span className="text-danger">*</span></Label>
                  <Input
                    id="describe"
                    name="describe"
                  style={{ width: '300px' }}
                    value={values.describe}
                    onChange={handleChange}
                    invalid={touched.describe && !!errors.describe}
                  />
                  {touched.describe && errors.describe && <FormFeedback>{errors.describe}</FormFeedback>}
                </div>
                {row == undefined ? (
                <Input
                    type='select' 
                    name='tournamentId'
                    style={{width:'620px'}}
                    onChange={(e) => setTour(e.target.value)}
                >
                    {TourList?.map((item) => (
                        <option key={item.id} value={item.id}>{item.tournamentName}</option>
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

export default EditTourGroup;
