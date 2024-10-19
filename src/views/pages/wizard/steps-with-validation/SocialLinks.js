// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form } from 'reactstrap'
import { setCreate } from '../../../../redux/CreateCourse'

const defaultValues = {
  Describe: ''
}

const SocialLinks = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const existingData = useSelector((state) => state.create.createList);
  console.log(existingData);
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
        <h5 className='mb-0'>Social Links</h5>
        <small>Enter Your Social Links.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} style={{minHeight:'250px'}}>
            <Label for='Describe'>Description</Label>
            <Controller
              name='Describe'
              control={control}
              rules={{
                required: 'توضیحات الزامیست',
                minLength: {
                  value: 25,
                  message: 'حداقل کاراکتر 25 است'
                },
                maxLength: {
                  value: 300,
                  message: 'حداکثر کاراکتر 300 است'
                }
              }}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  style={{minHeight:'200px'}}
                  onChange={(content, delta, source, editor) => {
                    field.onChange(content) 
                  }}
                />
              )}
            />
            {errors.Describe && <span className='text-danger'>{errors.Describe.message}</span>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-submit'>
            Next
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default SocialLinks
