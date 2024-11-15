// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

// ** Icons Imports
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'

// ** Icons Imports
import starIcon from '@src/assets/images/icons/star.svg'
import bookIcon from '@src/assets/images/icons/book.svg'
import brushIcon from '@src/assets/images/icons/brush.svg'
import rocketIcon from '@src/assets/images/icons/rocket.svg'
import toolboxIcon from '@src/assets/images/icons/toolbox.svg'
import speakerIcon from '@src/assets/images/icons/speaker.svg'
import parachuteIcon from '@src/assets/images/icons/parachute.svg'
import { useQuery } from '@tanstack/react-query'
import { getCourseListWithPagination } from '../../../../@core/api/course/getCourseListWithPagination'
import { getCourseAllUser } from '../../../../@core/api/course/getAllCByUser'

const CompanyTable = () => {
  // ** vars

  const {data : course} = useQuery({
    queryKey:['getCourseUser'],
    queryFn:getCourseAllUser
  })
  console.log(course?.courseFilterDtos);

  const groupedUser = course?.courseFilterDtos?.reduce((acc , el) => {
    if(el.technologyList){
      const cat = el.technologyList;
      if(cat === "ّفرانت اند"){
        acc.FrontEnd.push(el)
      }
      else if(cat === "ّبک اند"){
        acc.BackEnd.push(el)
      }
      else if(cat === "ّReact"){
        acc.React.push(el)
      }
      else if(cat === "ّNextJs"){
        acc.NextJs.push(el)
      }
    }
    return acc
  } , {FrontEnd : [] , BackEnd : [] , React : []  , NextJs : [] })

  const FrontEnd = groupedUser?.FrontEnd.length / course?.totalCount * 100
  const BackEnd = groupedUser?.BackEnd?.length / course?.totalCount * 100
  const React = groupedUser?.React.length / course?.totalCount * 100
  const NextJs = groupedUser?.NextJs.length / course?.totalCount * 100

  const data = [
    {
      img: toolboxIcon,
      name: 'فرانت اند',
      email: 'meguc@ruj.io',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: groupedUser?.FrontEnd.length,
      time: 'آخرین آپدیت',
      revenue: '891.2',
      sales: FrontEnd
    },
    {
      img: parachuteIcon,
      name: 'بک اند',
      email: 'vecav@hodzi.co.uk',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: groupedUser?.BackEnd.length,
      time: 'آخرین آپدیت',
      revenue: '668.51',
      sales: BackEnd,
      salesUp: true
    },
    {
      img: brushIcon,
      name: 'React',
      email: 'davcilse@is.gov',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: groupedUser?.React.length,
      time: 'آخرین آپدیت',
      revenue: '522.29',
      sales: React,
      salesUp: true
    },
    {
      img: starIcon,
      name: 'nextJs',
      email: 'us@cuhil.gov',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: groupedUser?.NextJs.length,
      time: 'آخرین آپدیت',
      revenue: '291.01',
      sales: NextJs,
      salesUp: true
    },
  ]
  const colorsArr = {
    Technology: 'light-primary',
    Grocery: 'light-success',
    Fashion: 'light-warning'
  }

  const renderData = () => {
    return data.map(col => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      return (
        <tr key={col.name}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <img src={col.img} alt={col.name} />
                </div>
              </div>
              <div>
                <div className='fw-bolder'>{col.name}</div>
              </div>
            </div>
          </td>

          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='fw-bolder mb-25'>{col.views}</span>
              <span className='font-small-2 text-muted'>{col.time}</span>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='fw-bolder me-1'>{col.sales.toFixed(2)}%</span>
              {IconTag}
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>نام دسته بندی</th>
            <th>تعداد این دسته بندی در دوره ها</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
