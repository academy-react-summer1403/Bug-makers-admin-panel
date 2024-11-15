import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'  // برای کار با تاریخ
import { getCourseListWithPagination } from '../../../../@core/api/course/getCourseListWithPagination'
import 'react-circular-progressbar/dist/styles.css';

// ** Recharts Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { getPayPage } from '../../../../@core/api/coursePay/getPayPage'
import { getCoursePayment } from '../../../../@core/api/coursePay/getCoursePay'
import GoalOverview from './GoalOverview'
import { CircularProgressbar } from 'react-circular-progressbar'

const RevenueReport = props => {
  // ** State
  const [data, setData] = useState(null)
  const [tapSelect, setTapSelect] = useState(false)
  const { data: status } = useQuery({
    queryKey: ['getStatus'],
    queryFn: getCourseListWithPagination
  })
  console.log(tapSelect);
  const [courseIdList, setCourseIdList] = useState([]);
  const [coursePayments, setCoursePayments] = useState([]);

  const [activeTab, setActiveTab] = useState('1') // Default to "1" (Status Tab)

  // ** استفاده از moment برای فرمت تاریخ شمسی
  const useDay = (date) => {
    if (!date) return 'تاریخ وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD');
  };

  // دریافت داده‌های دوره‌ها
  const { data: courses, isLoading: courseLoading, isError: courseError } = useQuery({
    queryKey: ['getCourses'],
    queryFn: getPayPage,
  });

  // ** استخراج courseId‌ها
  useEffect(() => {
    if (courses?.courseFilterDtos) {
      const cId = courses.courseFilterDtos.map((item) => item.courseId);
      setCourseIdList(cId);
    }
  }, [courses]);

  // دریافت پرداخت‌ها بر اساس courseId
  useEffect(() => {
    if (courseIdList.length === 0) return;

    const fetchPayments = async () => {
      try {
        const payments = await Promise.all(
          courseIdList.map((course) => getCoursePayment(course))
        );
        setCoursePayments(payments.flat());
      } catch (error) {
        console.error('خطا در دریافت پرداخت‌ها:', error);
      }
    };

    fetchPayments();
  }, [courseIdList]);

  console.log(coursePayments);
  // ** فیلتر کردن پرداخت‌ها بر اساس تاریخ و ماه
  const countPaymentsByMonth = () => {
    let countData = [];

    // Iterate through all months (Jan to Dec)
    for (let month = 0; month < 12; month++) {
      const monthData = {
        month: new Date(2024, month).toLocaleString('fa-IR', { month: 'long' }),
        payments: 0  
      };

      // فیلتر کردن پرداخت‌ها بر اساس ماه
      coursePayments.forEach((payment) => {
        const paymentDate = new Date(payment.peymentDate);
        const paymentMonth = paymentDate.getMonth();

        // بررسی تطابق ماه
        if (paymentMonth === month) {
          monthData.payments++;
        }
      });

      countData.push(monthData);
    }
    return countData;
  };

  const paymentData = countPaymentsByMonth();

  // ** فیلتر کردن داده‌های وضعیت دوره‌ها
  const countByMonthAndStatus = () => {
    let countData = [];

    for (let month = 0; month < 12; month++) {
      const monthData = {
        month: new Date(2024, month).toLocaleString('fa-IR', { month: 'long' }),
        start: 0,  
        expired: 0,
        ongoing: 0  
      };

      status?.courseDtos?.forEach((el) => {
        const lastUpdate = new Date(el.lastUpdate);
        const lastUpdateMonth = lastUpdate.getMonth();

        if (lastUpdateMonth === month) {
          if (el.statusName === 'شروع ثبت نام') {
            monthData.start++;
          } else if (el.statusName === 'منقضی شده') {
            monthData.expired++;
          } else if (el.statusName === 'درحال برگزاری') {
            monthData.ongoing++;
          }
        }
      });

      countData.push(monthData);
    }
    return countData;
  };

  const revenueData = countByMonthAndStatus();  

  // Budget data for Line Chart
  const filterd1 = status?.courseDtos?.filter((el) => el.statusName === 'شروع ثبت نام') 
  const perecent1 = filterd1?.length / status?.totalCount * 100

  const filterd2 = status?.courseDtos?.filter((el) => el.statusName === 'منقضی شده')
  const perecent2 = filterd2?.length / status?.totalCount * 100

  const filterd3 = status?.courseDtos?.filter((el) => el.statusName === 'درحال برگزاری')
  const perecent3 = filterd3?.length / status?.totalCount * 100

  // payment 

  // Effect to fetch data
  useEffect(() => {
    axios.get('/card/card-analytics/revenue-report').then(res => setData(res.data))
    return () => setData(null)
  }, [])

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
    if(activeTab == 2) setTapSelect(false)
    if(activeTab == 1) setTapSelect(true)
  }

  return data !== null ? (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='8' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>گزارش</CardTitle>
          </div>

          {/* Tabs */}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => toggleTab('1')}
              >
                وضعیت دوره
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => toggleTab('2')}
              >
                پرداختی
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            {/* Tab 1: وضعیت دوره */}
            <TabPane   tabId="1">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#b9b9c3" />
                  <YAxis stroke="#b9b9c3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="start" fill={props.primary} name="شروع ثبت نام" />
                  <Bar dataKey="expired" fill={props.warning} name="منقضی شده" />
                  <Bar dataKey="ongoing" fill="#00d1b2" name="در حال برگزاری" />
                </BarChart>
              </ResponsiveContainer>
            </TabPane>

            {/* Tab 2: پرداختی */}
            <TabPane onClick={() => setTapSelect(true)} tabId="2">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#b9b9c3" />
                  <YAxis stroke="#b9b9c3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="payments" fill={props.primary} name="پرداخت‌ها" />
                </BarChart>
              </ResponsiveContainer>
            </TabPane>
          </TabContent>
        </Col>
        {tapSelect == true ? (
          <Col className='d-flex justify-content-center align-items-center ' >
          <div className='d-flex justify-content-center align-items-center gap-1' style={{flexFlow: 'row wrap'}}>
          <div className='d-flex justify-content-center align-items-center' style={{width:'100px' }} >
        <CircularProgressbar   value='81%' text='81.2%' />
        </div>
        </div>
        </Col>
        ) : (
          <Col className='d-flex justify-content-center align-items-center ' >
          <div className='d-flex justify-content-center align-items-center gap-1' style={{flexFlow: 'row wrap'}}>
          <div className='d-flex justify-content-center align-items-center' style={{width:'100px', flexFlow: 'column wrap' }} >
        <CircularProgressbar   value={perecent1} text={perecent1.toFixed(2) + '%'}  />
        <span>شروع ثبت نام</span>
        </div>

          <div className='d-flex justify-content-center align-items-center' style={{width:'100px' , flexFlow: 'column wrap' }} >
        <CircularProgressbar  value={perecent2} text={perecent2.toFixed(2) + '%'} />
        <span>منقضی شده</span>

        </div>

          <div className='d-flex justify-content-center align-items-center' style={{width:'100px' , flexFlow: 'column wrap'}} >
        <CircularProgressbar  value={perecent3} text={perecent3.toFixed(2) + '%'} />
        <span>در حال برگذاری</span>

        </div>
        </div>
        </Col>

        )} 
      </Row>
    </Card>
  ) : null
}

export default RevenueReport
