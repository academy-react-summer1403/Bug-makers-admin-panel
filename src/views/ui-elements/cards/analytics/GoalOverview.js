// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'
import { HelpCircle, User } from 'react-feather'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';
import { useQuery } from '@tanstack/react-query'
import { getReportDashboard } from '../../../../@core/api/dashboard/reportStatics/repostStatics'
import { getUser } from '../../../../@core/api/user/getUserById'
import { Toolbar, Tooltip } from '@mui/material'

const GoalOverview = ({percentage , numberChart , color , title ,dataList , title2 , filter}) => {
  // ** State
  const [data, setData] = useState(null)





    return percentage  ? (
      <Card className="shadow-sm border-0 rounded">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <CardTitle tag="h4" className="fw-bold mb-0">درصد {title}</CardTitle>
        </CardHeader>
        <CardBody className="p-0 d-flex justify-content-center align-items-center">
          <Tooltip title={`${percentage}%`} placement="top">
            <div style={{ width: '150px', height: '150px' }}>
              <CircularProgressbar
                value={percentage}
                text={numberChart + '%'}
                strokeWidth={10}
                styles={{
                  path: {
                    stroke: percentage >= 100 ? color : color,  
                    strokeLinecap: 'round',
                  },
                  trail: {
                    stroke: '#black', 
                  },
                  text: {
                    fill: '#333', 
                    fontSize: '22px',
                    fontWeight: 'bold',
                  }
                }}
              />
            </div>
          </Tooltip>
        </CardBody>
        <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-3">
          <CardText className="text-muted mb-0">تعداد کل {title2}</CardText>
          <h3 className="fw-bolder mb-0">{dataList}</h3>
        </Col>
        <Col xs="6" className="py-3">
          <CardText className="text-muted mb-0">تعداد {title2} فیلتر شده</CardText>
          <h3 className="fw-bolder mb-0">{filter}</h3>
        </Col>
      </Row>
        <div style={{height:'50px'}}></div>
      </Card>
    ) : null;
}
export default GoalOverview
