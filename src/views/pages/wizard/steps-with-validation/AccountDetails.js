// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'



const AccountDetails = ({ stepper }) => {
  const [preview, setPreview] = useState(null)

  const course = useSelector((state) => state.CourseDetail.CourseList)
  const defaultValues = {
    Image: course.imageAddress ? course.imageAddress : '' || course.currentImageAddressTumb ? course.currentImageAddressTumb : '',
  }

  const SignupSchema = yup.object().shape({
    Image: yup.mixed().required('عکس دوره الزامیست'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      stepper.next()
      dispatch(setCreate(data))
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>عکس دوره</h5>
        <small className='text-muted'>عکس دوره خود را انتخاب کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1  w-100'>
            <Label className='form-label' for='Image'>
              Image
            </Label>
            <Controller
            id='Image'
            name='Image'
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                type='file'
                invalid={!!errors.Image}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    onChange(file);
                    setPreview(URL.createObjectURL(file));
                  } else {
                    onChange(null);
                    setPreview(course.imageAddress ? course.imageAddress : null || course.currentImageAddressTumb ? course.currentImageAddressTumb : null); 
                  }
                }}
                onBlur={onBlur}
                innerRef={ref}
              />
            )}
          />
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '80%', margin: 'auto', display: 'block', marginTop: '10px' }} />
          ) : course.imageAddress || course.currentImageAddressTumb ? (
            <img src={course.imageAddress || course.currentImageAddressTumb} alt="Preview" style={{ width: '80%', margin: 'auto', display: 'block', marginTop: '10px' }} />
          ) : null}

          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
