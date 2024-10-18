// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import Product from '../../details'
import { object } from 'yup'

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

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Social Links</h5>
        <small>Enter Your Social Links.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Product 
            // title={data?.Title}
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
