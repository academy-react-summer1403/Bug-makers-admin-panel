// ** React Imports
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const EditCommentForm = ({ onClick, size, selectedComment }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    commentTitle: Yup.string().required('تایتل کامنت الزامی است'),
    describe: Yup.string().required('متن کامنت الزامی است'),
    courseTitle: Yup.string().required('نام دوره الزامی است')
  });

  // ** Form Submission
  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      commentId: selectedComment.commentId,
      courseId: selectedComment.courseId,
      accept: selectedComment.accept
    };
    // ارسال دیتا برای آپدیت کامنت
    dispatch(updateComment(formattedData));
    setShow(false);
  };

  const defaultValue = {
    fName: selectedComment.userFullName,
    courseTitle: selectedComment.courseTitle,
    commentTitle: selectedComment.commentTitle,
    describe: selectedComment.describe,
    accept: selectedComment.accept ? 'تایید شده' : 'رد شده',
  };

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
                  <Label className='form-label' for='courseTitle'>
                    نام دوره <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='courseTitle'
                    name='courseTitle'
                    placeholder='نام دوره'
                    value={values.courseTitle}
                    onChange={handleChange}
                    invalid={touched.courseTitle && !!errors.courseTitle}
                  />
                  {touched.courseTitle && errors.courseTitle && <FormFeedback>{errors.courseTitle}</FormFeedback>}
                </div>
                <div className='mb-1 w-40'>
                  <Label className='form-label' for='commentTitle'>
                    تایتل کامنت <span className='text-danger'>*</span>
                  </Label>
                  <Input
                    id='commentTitle'
                    name='commentTitle'
                    placeholder='تایتل کامنت'
                    value={values.commentTitle}
                    onChange={handleChange}
                    invalid={touched.commentTitle && !!errors.commentTitle}
                  />
                  {touched.commentTitle && errors.commentTitle && <FormFeedback>{errors.commentTitle}</FormFeedback>}
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
