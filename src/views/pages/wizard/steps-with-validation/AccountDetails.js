// ** React Imports
import { Fragment } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useSelector } from 'react-redux'

const defaultValues = {
  Image: '',
}

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    Image: yup.mixed().required('عکس دوره الزامیست'),
    })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
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
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Image'>
              Image
            </Label>
            <Controller
              id='Image'
              name='Image'
              control={control}
              render={({ field }) => <Input placeholder='نام دوره' type='file'  invalid={errors.Image && true} {...field} />}
            />
            {errors.Image && <FormFeedback>{errors.Image.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
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

export default AccountDetails
