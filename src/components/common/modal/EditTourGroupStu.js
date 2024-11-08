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

const EditTourGroupStu = ({ row, title , data  , color , api}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
    const [group, setGroup] = useState()
    const [searchQueryUser, setSearchQueryUser] = useState(''); // State for search query
    const [userList, setUserList] = useState(1);

  const Group = useSelector((state) => state.Tgroup.TourGroup)

  const defaultValue = row ? {
    id: row.id || null,
    groupId: row.groupId || '',
    studentId: row.studentId || '',
  } : {
    groupId:  Number(group),
    ...(api?.name === 'UpdateTourGroupMentor' ? { userId: Number(userList) } : { studentId: Number(userList) }),
};
console.log(api?.name);

  const validationSchema = Yup.object().shape({
  });

  const { data: user , isLoading } = useQuery({
    queryKey: ['getUserTours', searchQueryUser],
    queryFn: () => getUser(searchQueryUser)
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => api(BulldingData, row),
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
                 <Input
                    type="text"
                    placeholder="جستجو کاربر"
                    value={searchQueryUser}
                    onChange={(e) => setSearchQueryUser(e.target.value)}
                    style={{ width: '300px' }}
                    />
                    {/* Dropdown to select courses */}
                    {isLoading ? (
                    <Input
                        type="select"
                        value={values.courseId} 
                        disabled={isLoading}
                    >
                        <option>در حال بارگذاری</option>
                    </Input>
                    ) : (
                    <Input
                        type="select"
                        name="studentId"
                        onChange={(e) => setUserList(e.target.value)}
                    >
                        {user?.listUser?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.fname + ' ' + item.lname}
                        </option>
                        ))}
                    </Input>
                    )}
                <Input
                    type='select' 
                    name='groupId'
                    style={{width:'620px'}}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    {Group?.map((item) => (
                        <option key={item.id} value={item.id}>{item.groupName}</option>
                    ))}
                    {touched.groupId && errors.groupId && <FormFeedback>{errors.groupId}</FormFeedback>}
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

export default EditTourGroupStu;
