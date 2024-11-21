import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateDep } from '../../../@core/api/Department/updateDep';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import { UpdateAssCourse } from '../../../@core/api/assWork/updateAssCourse';
import { getUser } from '../../../@core/api/user/getUserById';
import { getTournoment } from '../../../@core/api/Tournament/getTouronment';
import { UpdateRefere } from '../../../@core/api/Tournament/Refere/updateRefre';
import { Tooltip } from '@mui/material';

const EditAssCourse = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [Buildding, setBuildding] = useState(1);
  const [userList, setUserList] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchQueryUser, setSearchQueryUser] = useState(''); // State for search query


  const { data: tournament } = useQuery({
    queryKey: ['getTouronemt'],
    queryFn: getTournoment,
  });
  const { data: user , isLoading } = useQuery({
    queryKey: ['getUser', searchQueryUser],
    queryFn: () => getUser(searchQueryUser)
  });

  const defaultValue = row
    ? {
        id: '20dd6db9-3831-ef11-b6c9-9b4d470c6650' ,
        userId: row.userId,
        tournamentId: Buildding,
      }
    : {
        userId: Number(userList) || 2,
        tournamentId: Buildding || 1,
      };



  const validationSchema = Yup.object().shape({
    tournamentId: Yup.string().required('این فیلد الزامی است'),
  });

  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateRefere(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getBulding');
    },
  });

  const handleSubmit = (values) => {
    updateBuildding.mutate(values);
    console.log(values);
  };

  // Filter courses based on search query
  const filteredCourses = tournament?.filter((item) =>
    item.tournamentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
//   const filteredUser = user?.courseDtos?.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title='افزودن داور' placement='top'>
        <Button onClick={() => setShow(true)} color="transparent" style={{border:'none'}}>{title}</Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1"> {row ? 'بروزرسانی داور ' : 'افزودن  داور'}</h1>
            <p>اطلاعات داور را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                {/* Search input for filtering courses */}
                <Input
                  type="text"
                  placeholder="جستجو دوره"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '300px' }}
                />

                {/* Dropdown to select courses */}
                <Input
                type="select"
                name="tournamentId"
                onChange={(e) => setBuildding(e.target.value)}
                value={row?.id}
                >
                {filteredCourses?.map((item) => (
                    <option key={item.id} value={item.id}>
                    {item.tournamentName}
                    </option>
                ))}
                </Input>
                    <Input
                    type="text"
                    placeholder="جستجو کاربر"
                    value={searchQueryUser}
                    onChange={(e) => setSearchQueryUser(e.target.value)}
                    style={{ width: '300px' }}
                    />
            
                    <Input
                        type="select"
                        name="userId"
                        onChange={(e) => setUserList(e.target.value)}
                    >
                        {user?.listUser?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.fname + ' ' + item.lname}
                        </option>
                        ))}
                    </Input>



                {/* Submit and Cancel buttons */}
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

export default EditAssCourse;
