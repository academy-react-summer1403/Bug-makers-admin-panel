// ** React Imports
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UpdateComment } from '../../../@core/api/blog/updateComment';
// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap';

// ** Third Party Components
import { Edit } from 'react-feather';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import { useMutation } from '@tanstack/react-query';

const EditCommentForm = ({ onClick, size, selectedComment , newsId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('تایتل کامنت الزامی است'),
    describe: Yup.string().required('متن کامنت الزامی است'),
    title: Yup.string().required('نام دوره الزامی است')
  });

  const updateComment = useMutation({
    mutationKey:['updateComment'],
    mutationFn: (data) => UpdateComment(data)
  })
  // ** Form Submission
  const handleSubmit = (data) => {
    // const formattedData = {
    //   ...data,
    //   commentId: selectedComment.commentId,
    //   courseId: selectedComment.courseId,
    //   accept: selectedComment.accept
    // };
    updateComment.mutate(data)
    setShow(false);
  };

console.log(newsId);
  const defaultValue = {
    id: selectedComment.id,
    newsId: newsId,
    title: selectedComment.title,
    describe: selectedComment.describe,
    accept: selectedComment.accept ? true : false,
  }; 
  // const defaultValue = {
  //   id: selectedComment.id,
  //   newsId: newsId
  //   fName: selectedComment.autor,
  //   courseTitle: selectedComment.title,
  //   commentTitle: selectedComment.title,
  //   describe: selectedComment.describe,
  //   accept: selectedComment.accept ? true : false,
  // }; 
  
  
  


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Edit size={size} className='cursor-pointer' style={{ marginTop: '2px' }} onClick={() => setShow(true)} />
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'>آپدیت کامنت</h1>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' , minHeight:'200px' }}>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='fName'>
                    نام <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='fName'
                    name='fName'
                    placeholder='نام'
                    value={values.fName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='title'>
                    نام دوره <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='title'
                    name='title'
                    placeholder='نام دوره'
                    value={values.title}
                    onChange={handleChange}
                    invalid={touched.title && !!errors.title}
                  />
                  {touched.title && errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='describe'>
                    متن کامنت <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='describe'
                    name='describe'
                    placeholder='متن کامنت'
                    value={values.describe}
                    onChange={handleChange}
                    invalid={touched.describe && !!errors.describe}
                  />
                  {touched.describe && errors.describe && <FormFeedback>{errors.describe}</FormFeedback>}
                </div>
                <div style={{width:'230px'}}>
                <Label className='form-label' for='accept'>
                    وضعیت کامنت <span className='text-danger'>اختیاری</span>
                  </Label>
                  <Input
                    type='select'
                    id='accept'
                    name='accept'
                    value={values.accept}
                    onChange={(e) => {
                      const value = e.target.value === 'true';
                      handleChange({ target: { name: 'accept', value } });
                    }}
                    invalid={touched.accept && !!errors.accept}
                  >
                    <option value='true'>فعال</option>
                    <option value='false'>رد شده</option>
                  </Input>

                  {touched.accept && errors.accept && <FormFeedback>{errors.accept}</FormFeedback>}
                </div>
                <Button type='submit' className='me-1' color='primary' style={{ position: 'absolute', bottom: '10px', right: '100px' }}>
                  ارسال
                </Button>
                <Button type='reset' color='secondary' style={{ position: 'absolute', bottom: '10px', left: '100px' }} outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditCommentForm;
