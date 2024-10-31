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
import { Switch } from '@mui/material'; 

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'
import { getCategoryListBlog } from '../../../../@core/api/blog/Category'
import { useQuery } from '@tanstack/react-query'



const BlogSeo = ({ stepper }) => {

  const course = useSelector((state) => state.CourseDetail.CourseList)

  const defaultValues = {
    GoogleDescribe: '',
    SlideNumber: 1,
    Category: [],
    isSlider: course.isSlider || false,
  }
  // ** Hooks
  const SignupSchema = yup.object().shape({
    GoogleDescribe: yup.string().required('تیتر گوگل الزامیست'),
    SlideNumber: yup.number().required('تیتر الزامیست '),
  })

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const existingData = useSelector((state) => state.create.createList);
  const dispatch = useDispatch();

  const onSubmit = (data) => {

      const combinedData = {
        ...existingData,
        ...data,
      };
      stepper.next()
      dispatch(setCreate(combinedData))


  }
  
  const create = useSelector((state) => state.create.createList)
console.log(create);
  const { data: getDataCreated } = useQuery({
    queryKey: ['getCategoryBlog'],
    queryFn: getCategoryListBlog
})

  const categoryOptions = getDataCreated?.map(category => ({
    value: category.id,
    label: category.categoryName
})) || []
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Personal Info</h5>
        <small>Enter Your Personal Info.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label' for='SlideNumber'>
              ظرفیت
            </Label>
            <Controller
              id='SlideNumber'
              name='SlideNumber'
              control={control}
              render={({ field }) => (
                <Input type='number' placeholder='ظرفیت را وارد کنید' invalid={errors.SlideNumber && true} {...field} />
              )}
            />
            {errors.SlideNumber && <FormFeedback>{errors.SlideNumber.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='GoogleDescribe'>
              توضیحات گوگل
            </Label>
            <Controller
              id='GoogleDescribe'
              name='GoogleDescribe'
              control={control}
              render={({ field }) => <Input placeholder='Doe' invalid={errors.GoogleDescribe && true} {...field} />}
            />
            {errors.GoogleDescribe && <FormFeedback>{errors.GoogleDescribe.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
            <Col md='6' className='mb-1'>
                <Label className='form-label' for='Category'>
                دسته بندی
                </Label>
                <Controller
                name="Category"
                control={control}
                render={({ field }) => (
                <Select
                {...field}
                isMulti
                isClearable={false}
                theme={selectThemeColors}
                options={categoryOptions}
                />
                )}
                />
            </Col>
            <Col md="6">
                <Label for='isSlider'>فعال بودن</Label>
                <div className="d-flex align-items-center">
                <Controller
                    id='isSlider'
                    name="isSlider"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <Switch
                        checked={value}
                        onChange={onChange}
                        color='primary'
                    />
                    )}
                />
                </div>
            </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default BlogSeo
