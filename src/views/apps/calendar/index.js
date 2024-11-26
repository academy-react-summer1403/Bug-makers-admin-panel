import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardBody } from 'reactstrap'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination'
import { useNavigate } from 'react-router-dom'

const CalendarComponent = () => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['getCourse'],
    queryFn: getCourseListWithPagination
  })

  useEffect(() => {
    if (data?.courseDtos) {
      const eventsData = data?.courseDtos.map(event => ({
        title: event.title,  // عنوان ایتم
        start: format(new Date(event.lastUpdate), 'yyyy-MM-dd'), 
        end: format(new Date(event.lastUpdate), 'yyyy-MM-dd'),   
        id: event.courseId,  // شناسه منحصر به فرد ایتم
      }))
      setEvents(eventsData)
    }
  }, [data])  

  // تقویم FullCalendar
  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}  
          headerToolbar={{
            start: 'prev,next,today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locale="fa"  // تنظیم زبان فارسی
          editable={true}
          eventClick={(info) => {
            const courseId = info.event.id 
            navigate('/apps/Detail/' + courseId)  
          }}
        />
      </CardBody>
    </Card>
  )
}

export default CalendarComponent
