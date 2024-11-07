// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { getReportDashboard } from '../../../../@core/api/dashboard/reportStatics/repostStatics'
import { getTeacherList } from '../../../../@core/api/course/TeacherList'

const StatsCard = ({ cols }) => {

  const {data : report} = useQuery({
    queryKey:['getReport'],
    queryFn:getReportDashboard
})
  const {data : teacher} = useQuery({
    queryKey:['getTeacher'],
    queryFn:getTeacherList
})

  const data = [
    {
      title: report?.allReserve,
      subtitle: 'تعداد رزرو ها',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: report?.allUser,
      subtitle: 'تعداد کاربر ها',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: report?.deactiveUsers,
      subtitle: 'کاربر های غیرفعال',
      color: 'light-danger',
      icon: <User size={24} />
    },

    {
      title: teacher?.length,
      subtitle: 'تعداد مدرسین',
      color: 'light-success',
      icon: <DollarSign size={24} />
    },
    {
      title: report?.allReserveAccept,
      subtitle: ' رزرو های تاییده شده',
      color: 'light-success',
      icon: <DollarSign size={24} />
    },
    {
      title: report?.inCompeletUserCount,
      subtitle: 'پروفایل تکیمل شده',
      color: 'light-success',
      icon: <DollarSign size={24} />
    },
    {
      title: report?.allPaymentCost,
      subtitle: 'پرداختی ها',
      color: 'light-danger',
      icon: <Box size={24} />
    },
  ]


  	
// allPaymentCost	"26,709,475,150"
// allReserve	"266"
// allReserveAccept	"145"
// allReserveNotAccept	"121"
// allUser	"339"
// deactiveUsers	"10"
// inCompeletUserCount	"223"
// activeUserPercent	"97.05014749262537"
// interActiveUserPercent	"2.949852507374631"
// reserveAcceptPercent	"54.51127819548872"
// reserveNotAcceptPercent	"45.48872180451128"
  console.log(report);

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center justify-content-center ' style={{flexFlow:'row wrap', gap:'20px'}}>
            <div className='my-auto d-flex justify-content-center align-items-center gap-1 '>
            <Avatar color={item.color} icon={item.icon}  />
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics ' >
      <CardHeader>
        <CardTitle tag='h4'>آمار کلی سایت</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>آخرین آپدیت</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
