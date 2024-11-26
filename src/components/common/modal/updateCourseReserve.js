import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCategoryBlog, getCategoryListBlog, updateCategoryBlog } from '../../../@core/api/blog/Category';
import { getCategoryId } from '../../../@core/api/blog/Category'; 
import { getCourseReserveWithId } from '../../../@core/api/reserve/getReserveWithId';
import { FormSelect } from 'react-bootstrap';
import { getCourseDetail } from '../../../@core/api/course/courseDetail';
import { getGroup } from '../../../@core/api/course/getGroup';
import { ThreeDots } from 'react-loader-spinner';
import ReactSelect from 'react-select';
import { acceptReserve } from '../../../@core/api/reserve/acceptReserve';
import { error } from 'jquery';
import toast from 'react-hot-toast';


const UpdateCourseReserve = ({selected , studentId}) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  const [SelectId, setSelectId] = useState()
  const [courseData, setCourseData] = useState([])
  const [teacherId, setTeacherId] = useState()
  const [setGroupId, setSetGroupId] = useState()
  const [groupIdState, setGroupIdState] = useState()
  console.log(groupIdState);
  const handleModal = () => {
    setSelectId(selected)
    setShow(true)
  }
  const queryClient = useQueryClient()
  const {data : course } = useQuery({
    queryKey:['getCourse'],
    queryFn:() => getCourseDetail(SelectId),
    enabled: !!SelectId,
  })

  useEffect(() => {
    if(course){
      setCourseData(course)
      setTeacherId(course?.teacherId)
    }
  }, [course])

  const {data : groupData , isLoading } = useQuery({
    queryKey:['getGroup' , SelectId , teacherId ],
  queryFn:() => getGroup(teacherId, SelectId),
    enabled: !!SelectId && !!teacherId,
  })

  useEffect(() => {
    if (groupData && groupData.length > 0) {
      setGroupIdState(groupData[0].groupId);
    }
  }, [groupData]);  
    const mutation = useMutation({
      mutationKey: ['acceptReserve'],
      mutationFn: (reserveData) => acceptReserve(reserveData),
      onSuccess:() => {
        queryClient.invalidateQueries('courseReserve')
      },
      onError:(error) => {
        toast.error(error.response.data.ErrorMessage)
      }
    })
  const handleSubmit = (values) => {
    setShow(false)
    console.log(values);
    mutation.mutate(values)
  }


  return (
    <div>
      <Button
        onClick={handleModal}
        color='transparent'
        style={{border:'none'}}
      >
        تایید رزرو
      </Button>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
        style={{ width: '500px' }}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>گروه رزرو رو انتخاب کنید</ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
              <Formik
                initialValues={{
                  courseId: selected,
                  courseGroupId : groupIdState || '',
                  studentId : studentId
                }}
                // validationSchema={validationSchema2}
                onSubmit={handleSubmit}
                enableReinitialize={true} 
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    {isLoading ? (
                      <div className='d-flex justify-content-center'>
                      <ThreeDots color='blue' />
                      </div>
                   ) : (
                    <select
                      className='w-100 '
                      value={groupIdState}
                      onChange={(e) => setGroupIdState(Number(e.target.value))}
                    >
                  {groupData?.length > 0 ? (
                    groupData.map((item) => (
                      <option key={item.groupId} value={item.groupId}>
                        {item.groupName}
                      </option>
                    ))
                  ) : (
                    <option disabled>گروهی برای این دوره ثبت نشد</option>
                  )}

                   </select>
                   )}
                    <Button style={{marginTop:'50px'}} color="primary" type="submit">تایید رزرو</Button>
                  </Form>
                )}
              </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateCourseReserve;
