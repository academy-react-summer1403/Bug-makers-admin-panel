// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment-jalaali';

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import Product from '../../details'
import { object } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { updateCourse } from '../../../../@core/api/course/updateCourse'
import { useNavigate } from 'react-router-dom';
import { updateBlog } from '../../../../@core/api/blog/updateCourse';
import { setCreate } from '../../../../redux/CreateCourse';
import { setCourseListDetail } from '../../../../redux/Course';
import { AddBlog } from '../../../../@core/api/blog/addBlog';
import { addCategory } from '../../../../@core/api/course/addCategroy';
import { htmlToText } from 'html-to-text';
const defaultValues = {

}

const Preview = ({ stepper , setCat }) => {


  const [addBlog, setAddBlog] = useState(true)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  
  const course = useSelector((state) => state.CourseDetail.CourseList)
  console.log(course);
  const getData = useSelector((state) => state.create.createList)
  console.log(getData);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const textObject = htmlToText(getData?.Describe, {
    wordwrap: 130
  });
  const mutation = useMutation({
    
    
    mutationFn: (formData) => {
      if (course.courseId || window.location.pathname === '/apps/Course/AddCourse') {
        return updateCourse(formData, course);
      }  if (course.id) {
        return updateBlog(formData, course);
      }
      else if(window.location.pathname === '/apps/blog/AddBlog'){
        return AddBlog(formData, course);
      }
    },
    onSuccess: (data) => {
      stepper.next()
      setCat(data.id)
      if(course.courseId){
        setTimeout(() => {
          dispatch(setCourseListDetail([]))
        }, 3000);
        return navigate('/apps/Course');
      } else if(course.id){
        setTimeout(() => {
          dispatch(setCourseListDetail([]))
        }, 3000);
        return navigate('/apps/blog');
      } else if(window.location.pathname === '/apps/blog/AddBlog'){
        setTimeout(() => {
          dispatch(setCourseListDetail([]))
        }, 3000);
        return navigate('/apps/blog');
      }

    },
    onError: (error) => {
      console.error(error);
    }
  });
  

    // use date 
    const useDate = (date) => {
      if(!date) return 'تاریخ  وجود ندارد';
      return moment(date).format('jYYYY/jMM/jDD'); 
    }
    const onSubmit = (data) => {
      if (Object.values(data).every(field => field.length > 0)) {
        const formData = new FormData();
  
        if (course.courseId || window.location.pathname === '/apps/Course/AddCourse') {
          if(course.courseId){
          formData.append('Id', course.courseId);
          }
          formData.append('Title', getData.Title || '');
          formData.append('Describe', getData.Describe || '');
          formData.append('MiniDescribe', getData.MiniDescribe || '');
          formData.append('Capacity', Number(getData.Capacity) || 0);
          formData.append('CourseTypeId', Number(getData.CourseTypeId.value) || 0);
          formData.append('SessionNumber', getData.SessionNumber || '');
          formData.append('CurrentCoursePaymentNumber', 0);
          formData.append('TremId', Number(getData.TremId.value) || 0);
          formData.append('ClassId', Number(getData.ClassId.value) || 0);
          formData.append('CourseLvlId', Number(getData.CourseLvlId.value) || 0);
          formData.append('TeacherId', Number(getData.TeacherId.value) || 0);
          formData.append('Cost', Number(getData.Cost) || 0);
          formData.append('UniqeUrlString', getData.UniqeUrlString || '');
          formData.append('Image', getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl);
          formData.append('StartTime', new Date(getData.StartTime[0]).toISOString());
          formData.append('EndTime', new Date(getData.StartTime[1]).toISOString());
          formData.append('GoogleSchema', null);
          formData.append('GoogleTitle', getData.GoogleTitle || '');
          if (course.courseId) {
            formData.append('CoursePrerequisiteId', course.courseId || 0);
          }
          formData.append('ShortLink', null);
          formData.append('TumbImageAddress', getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl);
          formData.append('ImageAddress', getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl);
        } 
        else if (course.id) {
          if(course.id){
          formData.append('Id', course.id);
          }
          if(course.id){
          formData.append('SlideNumber', getData.SlideNumber || 1);
          }
          if(course.id){
          formData.append('CurrentImageAddress', getData.imageUrl || '');
          }
          if(course.id){
          formData.append('CurrentImageAddressTumb', getData.imageUrl || '');
          }
          if(course.id){
          formData.append('Active', getData.active || true);
          }
          formData.append('Title', getData.Title || '');
          formData.append('GoogleTitle', getData.GoogleTitle || '');
          formData.append('GoogleDescribe', getData.GoogleDescribe || '');
          formData.append('MiniDescribe', getData.MiniDescribe || '');
          formData.append('Describe', getData.Describe || '');
          formData.append('Keyword', getData.UniqeUrlString || '');
          formData.append('IsSlider', getData.isSlider || true);
          formData.append('NewsCatregoryId', getData.Category[0].value || 1);
          formData.append('Image', getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl);
        } else if(window.location.pathname === '/apps/blog/AddBlog'){
          formData.append('Title', getData.Title || '');
          formData.append('GoogleTitle', getData.GoogleTitle || '');
          formData.append('GoogleDescribe', getData.GoogleDescribe || '');
          formData.append('MiniDescribe', getData.MiniDescribe || '');
          formData.append('Describe', getData.Describe || '');
          formData.append('Keyword', getData.UniqeUrlString || '');
          formData.append('IsSlider', getData.isSlider || true);
          formData.append('NewsCatregoryId', getData.Category[0].value || 1);
          formData.append('Image', getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl);
        }
  
        mutation.mutate(formData);
      } else {
        for (const key in data) {
          if (data[key].length === 0) {
            setError(key, {
              type: 'manual',
              message: `Please enter a valid ${key} url`
            });
          }
        }
      }
    };
  const getDescribeText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  const describoptions = getDescribeText(getData?.Describe || '');
  const currentDate = Date.now();

  const imageUrl = getData?.imageUrl instanceof File ? URL.createObjectURL(getData?.imageUrl) : getData?.imageUrl

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Social Links</h5>
        <small>Enter Your Social Links.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Product 
          courseClassRoomName={getData?.ClassId?.label || 'N/A'}
          cost={getData?.Cost || 'N/A'}
          courseLevelName={getData?.CourseLvlId?.label || 'N/A'}
          courseTypeName={getData?.CourseTypeId?.label || 'N/A'}
          Description={getData?.Describe || 'N/A'}
          Date={currentDate || 'N/A'}
          startTime={getData?.StartTime?.[0] || 'N/A'}
          endTime={getData?.StartTime?.[1] || 'N/A'}
          teacherName={getData?.TeacherId?.label || 'N/A'}
          title={getData?.Title || 'N/A'}
          Image={imageUrl || 'N/A'}
        />
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='success' className='btn-submit'>
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Preview
