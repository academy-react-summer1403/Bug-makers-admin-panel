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
import { UpdateTourGroupStu } from '../../../@core/api/Tournament/group/getGroupStu';
import { getTourGroup } from '../../../@core/api/Tournament/group/getGroup';
import { useSelector } from 'react-redux';
import { getUser } from '../../../@core/api/user/getUserById';
import { UpdateTourGroupAvg } from '../../../@core/api/Tournament/group/checkListAvg';

const EditAvgGroup = ({ row, title , data  , color , api ,group}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [searchQueryUser, setSearchQueryUser] = useState(''); // State for search query
    const [userList, setUserList] = useState(1);

  const Group = useSelector((state) => state.Tgroup.TourGroup)

  const defaultValue = {
    groupId: group || null,
    scoreNumber: row.groupId || '',
    tcListId: row.id || '',
    referId: row.referId || '',
  } 

  const validationSchema = Yup.object().shape({
  });

  const { data: user , isLoading } = useQuery({
    queryKey: ['getUserTours', searchQueryUser],
    queryFn: () => getUser(searchQueryUser)
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => UpdateTourGroupAvg(BulldingData, row),
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
                  <Label for="scoreNumber">توضیحات تسک <span className="text-danger">*</span></Label>
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

export default EditAvgGroup;
