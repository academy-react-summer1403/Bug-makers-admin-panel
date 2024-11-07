import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateDep } from '../../../@core/api/Department/updateDep';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import { UpdateAssCourse } from '../../../@core/api/assWork/updateAssCourse';
import { getUser } from '../../../@core/api/user/getUserById';

const EditAssCourse = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [Buildding, setBuildding] = useState(1);
  const [userList, setUserList] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchQueryUser, setSearchQueryUser] = useState(''); // State for search query


  const { data: course } = useQuery({
    queryKey: ['getCourse'],
    queryFn: getCourseListWithPagination,
  });
  const { data: user , isLoading } = useQuery({
    queryKey: ['getUser', searchQueryUser],
    queryFn: () => getUser(searchQueryUser)
  });

  const defaultValue = row
    ? {
        id: row.id || null,
        userId: row.userId,
        courseId: Buildding,
      }
    : {
        userId: userList || 2,
        courseId: Buildding || 1,
      };



  const validationSchema = Yup.object().shape({
    courseId: Yup.string().required('این فیلد الزامی است'),
  });

  const updateBuildding = useMutation({
    mutationKey: ['updateBuildding'],
    mutationFn: (BulldingData) => UpdateAssCourse(BulldingData, row),
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
  const filteredCourses = course?.courseDtos?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
//   const filteredUser = user?.courseDtos?.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Button onClick={() => setShow(true)} color="primary">{title}</Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">بروزرسانی ساختمان</h1>
            <p>اطلاعات ساختمان را وارد کنید</p>
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
                name="courseId"
                onChange={(e) => setBuildding(e.target.value)}
                value={row?.courseId}
                >
                {filteredCourses?.map((item) => (
                    <option key={item.courseId} value={item.courseId}>
                    {item.courseId === row?.courseId ? item.title : item.title}
                    </option>
                ))}
                </Input>
                {row === undefined ? (
                <>
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
                        name="userId"
                        onChange={(e) => setUserList(e.target.value)}
                    >
                        {user?.listUser?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.fname + ' ' + item.lname}
                        </option>
                        ))}
                    </Input>
                    )}
                </>
                ) : null }


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
