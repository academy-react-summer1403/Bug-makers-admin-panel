// ** React Imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import React Query
import axios from 'axios'; // Import Axios
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Card, Input, Label } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import { addGroupCourse } from '../../../@core/api/course/addGroupCourse';
import { FormSelect } from 'react-bootstrap';
import { Tooltip } from '@mui/material';

const AddGroupCourse = ({ onClick, color , courses , id , teacherId , title}) => {
  const courseDetail = useSelector(state => state.CourseDetail.CourseList);
  const dispatch = useDispatch();

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    groupName: Yup.string().required('نام گروه اجباریست'),
    groupCapacity: Yup.number().required('باید عدد باشد').positive().integer(),
  });
  const queryClient = useQueryClient();

  // ** Form Submission with React Query and Axios
  const mutation = useMutation({
    mutationFn: async (data) => addGroupCourse(data),
    onSuccess: () => {
      setShow(false)
      queryClient.invalidateQueries(['getGroup',teacherId ,id]);

    },
  });

  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append('GroupName', data.groupName);
    formData.append('CourseId', data.courseId);
    formData.append('GroupCapacity', data.groupCapacity);
  
    mutation.mutate(formData);
    setShow(false);
  };
  const [show, setShow] = useState(false);

  return (
    <Tooltip title='ساخت گروه' placement='top' >
    <Button
      onClick={() => setShow(true)}
      className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
      color={color}
      style={{border:'none'}}
    >
       {title}
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
        style={{width:'500px'}}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'> ساخت گروه</h1>
          </div>
          <Formik
            initialValues={{
              groupName: '',
              courseId: courseDetail?.courseId || '', 
              groupCapacity: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values }) => (
              <Form className='w-100'>
                    <Col className='d-flex w-100 justify-content-center align-items-start' style={{ flexFlow: 'column wrap' }}>
                        <Col md="6">
                      <Label for='groupName'>نام گروه</Label>
                      <Input
                        type='text'
                        id='groupName'
                        name='groupName'
                        value={values.groupName}
                        onChange={handleChange}
                        style={{width:'300px'}}
                      />
                    </Col>
                      {courseDetail?.courseId ? (
                    <Col md="6">
                      <Label for='courseId'>شناسه دوره</Label>
                      <Input
                        type='text'
                        id='courseId'
                        name='courseId'
                        value={values.courseId}
                        onChange={handleChange}
                        style={{width:'300px'}}
                      />
                    </Col>
                    ) : (
                      <Col md='6'>
                      <Label for='courseId'>شناسه دوره</Label>
                      <FormSelect   onChange={handleChange}  id='courseId' name='courseId' value={values.courseId} style={{width:'300px'}} className=' mt-1'>
                        {courses?.map((item) => (
                          <option key={item.courseId}  value={item.courseId}>{item.title}</option>
                        ))}
                      </FormSelect>
                      </Col>
                    )}
                    <Col md="6">
                      <Label for='groupCapacity'>ظرفیت گروه</Label>
                      <Input
                        type='number'
                        id='groupCapacity'
                        name='groupCapacity'
                        value={values.groupCapacity}
                        onChange={handleChange}
                        style={{width:'300px'}}
                      />
                    </Col>
                  </Col>
                <Row className='mt-3'>
                  <Col md="6">
                    <Button type='submit' style={{ position: 'absolute', bottom: '10px', right: '100px' }} color='primary' disabled={mutation.isLoading}>
                      ارسال
                    </Button>
                  </Col>
                  <Col md="6">
                    <Button type='reset' color='secondary' style={{ position: 'absolute', bottom: '10px', left: '100px' }} outline onClick={() => setShow(false)}>
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Button>
    </Tooltip > 

  );
};

export default AddGroupCourse;
