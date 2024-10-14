// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, Input, Label, Button } from 'reactstrap'

// ** Icons Imports
import { Check, X, Link } from 'react-feather'

import CourseItem from '../../../../components/common/modal/CourseItem'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../store'
import { useSelector } from 'react-redux'

const connections = () => {

  const user = useSelector(state => state.user.selectUser)

  return (
    <Fragment>
      <div style={{ maxWidth: '540px', display: 'flex', flexFlow: 'column wrap', gap: '15px', justifyContent: 'center' }}>
        {user.coursesReseves?.map((item) => (
          <CourseItem
            key={item.reserveId}
            title={item.courseName}
            StudentName={item.studentName}
            reserverDate={item.reserverDate}
            accept={item.accept}
          />
        ))}
      </div>

      {/* reserveId	"9722b8d4-e169-ef11-b6d9-f4b91c39617c"
courseId	"991a9307-133d-ef11-b6ca-c84ec5106ca4"
courseName	"AliNouri24"
studentId	10169
studentName	"طاها رحیمی"
reserverDate	"2024-09-03T14:16:53.917"
accept	false */}
    
  

    </Fragment>
  )
}

export default connections
