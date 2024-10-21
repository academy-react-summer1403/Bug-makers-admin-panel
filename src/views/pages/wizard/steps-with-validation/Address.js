// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import PickerRange from '../PickerRange'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'


const Address = ({ stepper , onSaveData }) => {
  const [picker, setPicker] = useState(new Date())
  
  const course = useSelector((state) => state.CourseDetail.CourseList)

  const defaultValues = {
    SessionNumber: '',
    Capacity: '',
    Cost: course.cost || '',
    StartTime: course.startTime + course.endTime || '',
  }
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const existingData = useSelector((state) => state.create.createList);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (Object.values(data).every(field => field.length > 0)) {

      const combinedData = {
        ...existingData,
        ...data,
      };
      stepper.next()
      dispatch(setCreate(combinedData))

    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }


  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Address</h5>
        <small>Enter Your Address.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Capacity'>
              ظرفیت
            </Label>
            <Controller
              id='Capacity'
              name='Capacity'
              control={control}
              render={({ field }) => (
                <Input type='number' placeholder='ظرفیت را وارد کنید' invalid={errors.Capacity && true} {...field} />
              )}
            />
            {errors.Capacity && <FormFeedback>{errors.Capacity.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Cost'>
              قیمت
            </Label>
            <Controller
              id='Cost'
              name='Cost'
              control={control}
              render={({ field }) => (
                <Input type='number' placeholder='قیمت را وارد کنید' value={course.cost} invalid={errors.Cost && true} {...field} />
              )}
            />
            {errors.Cost && <FormFeedback>{errors.Cost.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='SessionNumber'>
              تعداد جلسات
            </Label>
            <Controller
              id='SessionNumber'
              name='SessionNumber'
              control={control}
              render={({ field }) => (
                <Input type='number' placeholder='تعداد جلسات را وارد کنید' invalid={errors.SessionNumber && true} {...field} />
              )}
            />
            {errors.SessionNumber && <FormFeedback>{errors.SessionNumber.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='StartTime'>
              تاریخ شروع و پایان
            </Label>
            <Controller
              name='StartTime'
              control={control}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  type='date'
                  className='form-control'
                  onChange={(date) => field.onChange(date)} 
                  options={{
                    mode: 'range',
                    dateFormat: "Y-m-d"
                  }}
                />
              )}
            />
            {errors.StartTime && <FormFeedback>{errors.StartTime.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
