// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Skeleton Import
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** React Transition Group Import for Animation
import { CSSTransition } from 'react-transition-group'

const UserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.users)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get user on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  // ** Loader state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state for user data
    if (store.selectedUser !== null && store.selectedUser !== undefined) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [store.selectedUser])

  // Inline CSS for animation (CSS-in-JS)
  const fadeInStyles = {
    opacity: 0,
    transform: 'scale(0.95)',
    transition: 'opacity 500ms, transform 500ms',
  }

  const fadeInActiveStyles = {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 500ms, transform 500ms',
  }

  return (
    <div className='app-user-view'>
      <Row>
        {/* Left side (User Info & Plan Card) */}
        <Col xl='4' lg='5'>
          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton height={200} width={200} />
            </div>
          </CSSTransition>

          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton height={100} width='100%' className='my-2' />
            </div>
          </CSSTransition>

          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton height={40} width='60%' className='my-2' />
            </div>
          </CSSTransition>
        </Col>

        {/* Right side (Tabs and Content) */}
        <Col xl='8' lg='7'>
          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton count={3} height={50} className='my-3' />
            </div>
          </CSSTransition>

          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton count={5} height={40} className='my-3' />
            </div>
          </CSSTransition>

          <CSSTransition
            in={loading}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div style={loading ? fadeInStyles : fadeInActiveStyles}>
              <Skeleton count={6} height={300} className='my-4' />
            </div>
          </CSSTransition>
        </Col>
      </Row>

      {/* Show content after loading */}
      {!loading && store.selectedUser ? (
        <Row>
          <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard selectedUser={store.selectedUser} />
            <PlanCard />
          </Col>
          <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      ) : (
        <Alert color='danger'>
          <h4 className='alert-heading'>کاربر پیدا نشد</h4>
          <div className='alert-body'>
            User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
          </div>
        </Alert>
      )}
    </div>
  )
}

export default UserView
