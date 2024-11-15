// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import { useQuery } from '@tanstack/react-query'
import { getReportDashboard } from '../../../../@core/api/dashboard/reportStatics/repostStatics'
import { getUser } from '../../../../@core/api/user/getUserById'
import { getCourseListWithPagination } from '../../../../@core/api/course/getCourseListWithPagination'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // call data 
  const {data : report} = useQuery({
    queryKey:['getReport'],
    queryFn:getReportDashboard
})
  const {data : user} = useQuery({
    queryKey:['getUser'],
    queryFn:getUser
})
const { data: course } = useQuery({
  queryKey: ['getCourse'],
  queryFn: getCourseListWithPagination
})


  // user profile 
  const percentage  = Number(report?.inCompeletUserCount) / user?.totalCount * 100
  let number = percentage;
  let numberChart = number.toFixed(1)

  // filter course 
  const activeCourse = course?.courseDtos.filter((el) => el.isActive === true)
  const deActiveCourse = course?.courseDtos.filter((el) => el.isActive === false)

  // active 
  const percentageCourse  = activeCourse?.length / course?.totalCount * 100
  let numberCourse = percentageCourse;
  let numberChartCourse = numberCourse.toFixed(1)

  // deactive 
  const percentageCourseDeactive  = deActiveCourse?.length / course?.totalCount * 100
  let numberCourseDeactive = percentageCourseDeactive;
  let numberChartCourseDeactive = numberCourseDeactive.toFixed(1)
  // ** vars
  const trackBgColor = '#e9ecef'

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row >
      <Col lg='4' md='6' xs='12'>
          <GoalOverview filter={Number(report?.inCompeletUserCount)}  title2='کاربران' dataList={user?.totalCount} percentage={percentage} title='تکمیل پروفایل کاربران' numberChart={numberChart} />
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>  
      </Row>
      <Row className='match-height'>
      <Col lg='4' md='6' xs='12'>
          <GoalOverview filter={activeCourse?.length}  title2='دوره' dataList={course?.totalCount}  percentage={percentageCourse}  title='دوره های فعال' numberChart={numberChartCourse} success={colors.success.main} />
        </Col>
      <Col lg='4' md='6' xs='12'>
          <GoalOverview  filter={deActiveCourse?.length}  title2='دوره' dataList={course?.totalCount} percentage={percentageCourseDeactive}  title='دوره های غیر فعال' numberChart={numberChartCourseDeactive} success={colors.success.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
