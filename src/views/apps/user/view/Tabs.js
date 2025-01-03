// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, Book, BookOpen, Database } from 'react-feather'

// ** User Components
import InvoiceList from './InvoiceList'
import SocialAcc from './socialAccount'
import SecurityTab from './SecurityTab'
import Connections from './Connections'
import BillingPlanTab from './BillingTab'
import UserTimeline from './UserTimeline'
import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'
import { useSelector } from 'react-redux'
import { FaComment, FaLock, FaMoneyBill, FaTelegram } from 'react-icons/fa'
import { PiContactlessPayment } from 'react-icons/pi'

const UserTabs = ({ active, toggleTab }) => {
  const user = useSelector(state => state.user.selectUser)
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <FaComment className='font-medium-3 me-50' />
            <span className='fw-bold'>کامنت</span>
          </NavLink>
        </NavItem>
        <NavItem style={{display : user.isTecher ? 'block' : 'none'}}>
          <NavLink  active={active === '2'} onClick={() => toggleTab('2')}>
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره های این معلم</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Database className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <FaLock className='font-medium-3 me-50' />
            <span className='fw-bold'>اطلاعات امنیتی</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <FaMoneyBill className='font-medium-3 me-50' />
            <span className='fw-bold'>پرداختی ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
            <FaTelegram className='font-medium-3 me-50' />
            <span className='fw-bold'>شبکه های اجتماعی</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
          <UserTimeline />
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='3'>
        <InvoiceList />
        </TabPane>
        <TabPane tabId='4'>
          <Notifications />
        </TabPane>
        <TabPane tabId='5'>
          <Connections />
        </TabPane>
        <TabPane tabId='6'>
          <SocialAcc />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
