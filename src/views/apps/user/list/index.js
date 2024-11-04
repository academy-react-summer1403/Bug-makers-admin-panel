// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Book, Globe } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getLandingReport } from '../../../../@core/api/blog/landing/report'
import { GiTeacher } from "react-icons/gi";
const UsersList = () => {

  const {data } = useQuery({
    queryKey:['getLandingReport'],
    queryFn:getLandingReport
  })
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='تعداد کل کاربران'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data?.studentCount}</h3>} 
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='تعداد کل دوره ها'
            icon={<Book  size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data?.courseCount}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='تعداد کل خبر ها'
            icon={<Globe size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data?.newsCount}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='تعداد معلم ها'
            icon={<GiTeacher size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data?.teacherCount}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList;
