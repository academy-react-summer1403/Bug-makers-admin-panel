// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'



const PersonalInfo = ({ stepper }) => {

  const course = useSelector((state) => state.CourseDetail.CourseList)

  const defaultValues = {
    GoogleTitle: '',
    Title: course.title,
    MiniDescribe:'',
    UniqeUrlString :'' || course.keyword
  }
  // ** Hooks
  const SignupSchema = yup.object().shape({
    GoogleTitle: yup.string().required('تیتر گوگل الزامیست'),
    Title: yup.string().required('تیتر الزامیست '),
    MiniDescribe: yup.string().required('توضیح کوتاه الزامیست'),
    UniqeUrlString: yup.string().required('شناسه الزامیست '),
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

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
  
  // const create = useSelector((state) => state.create.createList)

  const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Spain', label: 'Spain' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Australia', label: 'Australia' }
  ]

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ]

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>مشخصات کلی دوره</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Title'>
              تیتر
            </Label>
            <Controller
              id='Title'
              name='Title'
              control={control}
              render={({ field }) => <Input placeholder='John' invalid={errors.Title && true} {...field} />}
            />
            {errors.Title && <FormFeedback>{errors.Title.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='GoogleTitle'>
              تیتر گوگل
            </Label>
            <Controller
              id='GoogleTitle'
              name='GoogleTitle'
              control={control}
              render={({ field }) => <Input placeholder='Doe' invalid={errors.GoogleTitle && true} {...field} />}
            />
            {errors.GoogleTitle && <FormFeedback>{errors.GoogleTitle.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='MiniDescribe'>
              توضیح کوتاه
            </Label>
            <Controller
              id='MiniDescribe'
              name='MiniDescribe'
              control={control}
              render={({ field }) => <Input placeholder='John' invalid={errors.MiniDescribe && true} {...field} />}
            />
            {errors.MiniDescribe && <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Describe'>
              شناسه یکتا 
            </Label>
            <Controller
              id='UniqeUrlString'
              name='UniqeUrlString'
              control={control}
              render={({ field }) => <Input placeholder='Doe' invalid={errors.UniqeUrlString && true} {...field} />}
            />
            {errors.UniqeUrlString && <FormFeedback>{errors.UniqeUrlString.message}</FormFeedback>}
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

export default PersonalInfo
