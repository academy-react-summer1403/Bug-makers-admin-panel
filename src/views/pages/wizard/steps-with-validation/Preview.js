// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import Product from '../../details'
import { object } from 'yup'
import { useSelector } from 'react-redux'

const defaultValues = {

}

const Preview = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      alert('submitted' )
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key} url`
          })
        }
      }
    }
  } 

//   Capacity: "100000"
// ​
// Category: Array [ {…} ]
// ​
// ClassId: Object { value: 1, label: "ClassRoom 1" }
// ​
// Cost: "10000"
// ​
// CourseLvlId: Object { value: 2, label: "متوسط" }
// ​
// CoursePrerequisiteId: "xxxc"
// ​
// CourseTypeId: Object { value: 1, label: "حضوری" }
// ​
// Describe: "<p>jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p>"
// ​
// GoogleTitle: "bjkjn"
// ​
// Image: File { name: "Screenshot 2024-02-18 223613.png", lastModified: 1708283173170, size: 5456, … }
// ​
// MiniDescribe: "xxcx"
// ​
// SessionNumber: "10"
// ​
// StartTime: Array [ Date Tue Oct 01 2024 00:00:00 GMT+0330 (Iran Standard Time), Date Fri Oct 04 2024 00:00:00 GMT+0330 (Iran Standard Time) ]
// ​
// TeacherId: Object { value: "محسن-اسفندیاری", label: "محسن-اسفندیاری" }
// ​
// Title: "xlmxx"
// ​
// TremId: Object { value: 2, label: "تابستان 1403" }

const getData = useSelector((state) => state.create.createList)


const getDescribeText = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const describoptions = getDescribeText(getData?.Describe || '');
const currentDate = Date.now();

const imageUrl = getData?.Image ? URL.createObjectURL(getData?.Image) : null;
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
          Description={describoptions || 'N/A'}
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
