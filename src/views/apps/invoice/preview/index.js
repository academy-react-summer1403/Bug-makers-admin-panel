// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursePayment } from '../../../../redux/CoursePayment'

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()

  // ** States
  const [coursePayment, setCoursePayment] = useState([]) // State to hold the payments
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Redux state
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.selectUser) // باید در اینجا useSelector استفاده شود
  const paymentData = useSelector(state => state.payment.selectUser) // دریافت داده‌های پرداخت

  useEffect(() => {
    if (user?.id) {
      dispatch(getCoursePayment(user.id))
    }
  }, [dispatch, user.id])

  useEffect(() => {
    if (paymentData) {
      setCoursePayment(paymentData) // Set the payments when available
    }
  }, [paymentData])

  return (
    <div className='invoice-preview-wrapper'>
      {coursePayment.length > 0 ? (
        <Row className='invoice-preview'>
          <Col xl={9} md={8} sm={12}>
            {/* Assuming PreviewCard can accept coursePayment and handle the display */}
            <PreviewCard data={coursePayment} />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <PreviewActions
              id={id}
              setSendSidebarOpen={setSendSidebarOpen}
              setAddPaymentOpen={setAddPaymentOpen}
            />
          </Col>
        </Row>
      ) : (
        <Alert color='danger'>
          <h4 className='alert-heading'>Payment data not found</h4>
          <div className='alert-body'>
            No payment data found for user id: {id}. Check list of all payments:{' '}
            <Link to='/apps/payment/list'>Payment List</Link>
          </div>
        </Alert>
      )}
    </div>
  )
}

export default InvoicePreview
