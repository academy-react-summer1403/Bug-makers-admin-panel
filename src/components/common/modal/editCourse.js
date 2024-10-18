// ** React Imports
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../../views/apps/user/store/index';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-jalaali';
import axiosInstance from '../../../@core/interceptor/interceptor';
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

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';

const EditCourse = ({ onClick, size }) => {
  const user = useSelector(state => state.CourseDetail.CourseList);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان الزامی است'),
    describe: Yup.string().required('توضیحات الزامی است'),
    miniDescribe: Yup.string().required('توضیحات مختصر الزامی است'),
    capacity: Yup.number().required('ظرفیت الزامی است'),
    courseTypeId: Yup.number().required('نوع دوره الزامی است'),
    sessionNumber: Yup.string().required('شماره جلسه الزامی است'),
    currentCoursePaymentNumber: Yup.number().required('شماره پرداخت دوره الزامی است'),
    tremId: Yup.number().required('تعداد ترم الزامی است'),
    classId: Yup.number().required('شناسه کلاس الزامی است'),
    courseLvlId: Yup.number().required('شناسه سطح دوره الزامی است'),
    teacherId: Yup.number().required('شناسه معلم الزامی است'),
    cost: Yup.number().required('هزینه الزامی است'),
    uniqueUrlString: Yup.string().required('آدرس یکتا الزامی است'),
    startTime: Yup.date().required('زمان شروع الزامی است'),
    endTime: Yup.date().required('زمان پایان الزامی است').min(Yup.ref('startTime'), 'زمان پایان باید بعد از زمان شروع باشد'),
    googleSchema: Yup.string(),
    googleTitle: Yup.string(),
    coursePrerequisiteId: Yup.string(),
    shortLink: Yup.string(),
    thumbImageAddress: Yup.string(),
    imageAddress: Yup.string(),
  });

  // ** Form Submission
  const handleSubmit = async (data) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axiosInstance.put(`/Course/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Default Values from API
  const defaultValue = {
    title: user.title || '',
    describe: user.describe || '',
    miniDescribe: user.MiniDescribe || '',
    capacity: user.Capacity || 0,
    courseTypeId: user.CourseTypeId || 0,
    sessionNumber: user.SessionNumber || '',
    currentCoursePaymentNumber: user.CurrentCoursePaymentNumber || 0,
    tremId: user.TremId || 0,
    classId: user.ClassId || 0,
    courseLvlId: user.CourseLvlId || 0,
    teacherId: user.TeacherId || 0,
    cost: user.cost || 0.0,
    uniqueUrlString: user.UniqueUrlString || '',
    image: user.Image || '',
    startTime: user.startTime || '',
    endTime: user.endTime || '',
    googleSchema: user.GoogleSchema || '',
    googleTitle: user.GoogleTitle || '',
    coursePrerequisiteId: user.CoursePrerequisiteId || '',
    shortLink: user.ShortLink || '',
    thumbImageAddress: user.ThumbImageAddress || '',
    imageAddress: user.ImageAddress || '',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        gap: '6px',
        alignItems: 'center'
      }}
      onClick={onClick}
    >
      <Button onClick={() => setShow(true)} color="primary" style={{ marginTop: '2px' }}>
        ویرایش دوره
      </Button>
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
            <h1 className='mb-1'>آپدیت اطلاعات دوره</h1>
            <p>اطلاعات دوره</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Fields for course details */}
                {Object.keys(defaultValue).map((key) => (
                  <div key={key} className='mb-1'>
                    <Label className='form-label' for={key}>
                      {key} <span className='text-danger'>*</span>
                    </Label>
                    {key === 'image' ? (
                      <Input
                        type='file'
                        id={key}
                        name={key}
                        onChange={(e) => {
                          setImageFile(e.currentTarget.files[0]);
                        }}
                      />
                    ) : (
                      <Input
                        id={key}
                        name={key}
                        placeholder={key}
                        value={values[key]}
                        onChange={handleChange}
                        invalid={touched[key] && !!errors[key]}
                      />
                    )}
                    {touched[key] && errors[key] && <FormFeedback>{errors[key]}</FormFeedback>}
                  </div>
                ))}
                <Button type='submit' className='me-1' color='primary'>
                  ارسال
                </Button>
                <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
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

export default EditCourse;
