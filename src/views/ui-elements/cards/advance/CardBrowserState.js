// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Icons Imports
import supportIcon from '@src/assets/images/iconDash/support.png'
import admin from '@src/assets/images/iconDash/referee.png'
import refereeIcon from '@src/assets/images/iconDash/admin.png'
import EmployeeIcon from '@src/assets/images/iconDash/Employee.png'
import teacherIcon from '@src/assets/images/iconDash/teacher.png'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../../../@core/api/user/getUserById'
import { getTeacherList } from '../../../../@core/api/course/TeacherList'

const CardBrowserState = ({ colors, trackBgColor }) => {

  const date =  new Date().toLocaleString('fa-IR')


const {data : user} = useQuery({
  queryKey:['getUser'],
  queryFn:getUser
})

const {data : teacher} = useQuery({
  queryKey:['getTeacher'],
  queryFn:getTeacherList
})

  const groupedUser = user?.listUser?.reduce((acc , el) => {
    if(el.userRoles){
      const role = el.userRoles.trim();
      if(role === 'Administrator'){
        acc.Admin.push(el)
      }
      else if(role === 'Teacher'){
        acc.Teacher.push(el)
      }
      else if(role === 'Employee.Admin'){
        acc.Employee.push(el)
      }
      else if(role === "Referee"){
        acc.Referee.push(el)
      }
      else if(role === "Support"){
        acc.Support.push(el)
      }
    }
    return acc
  } , {Admin : [] , Teacher : [] , Employee : []  , Referee : [] , Support : []})
  const AdminCount = groupedUser?.Admin.length / user?.totalCount * 100
  const TeacherCount = teacher?.length / user?.totalCount * 100
  const EmployeeCount = groupedUser?.Employee.length / user?.totalCount * 100
  const RefereeCount = groupedUser?.Referee.length / user?.totalCount * 100
  const SupportCount = groupedUser?.Support.length / user?.totalCount * 100

  console.log(TeacherCount);
  const statesArr = [
    {
      avatar: admin,
      title: 'ادمین' + '--' + groupedUser?.Admin.length + ' ' + 'کاربر',
      value: AdminCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [AdminCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: teacherIcon,
      title: 'مدرس' + '--' + teacher?.length + ' ' + 'کاربر',
      value:  TeacherCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [TeacherCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: EmployeeIcon,
      title: 'کارمند ادمین' + '--' + groupedUser?.Employee.length + ' ' + 'کاربر',
      value: EmployeeCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [EmployeeCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: refereeIcon,
      title: 'داور' + '--' + groupedUser?.Referee.length + ' ' + 'کاربر',
      value: RefereeCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [RefereeCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: supportIcon,
      title: 'پشتیبان' + '--' + groupedUser?.Support.length + ' ' + 'کاربر',
      value: SupportCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [SupportCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }
  ]

  const renderStates = () => {
    return statesArr.map(state => {
      return (
        <div key={state.title} className='browser-states'>
          <div className='d-flex'>
            <img className='rounded me-1' src={state.avatar} height='30' alt={state.title} />
            <h6 className='align-self-center mb-0'>{state.title}</h6>
          </div>
          <div className='d-flex align-items-center'>
            <div className='fw-bold text-body-heading me-1'>{state.value}</div>
            <Chart
              options={state.chart.options}
              series={state.chart.series}
              type={state.chart.type}
              height={state.chart.height}
              width={state.chart.width}
            />
          </div>
        </div>
      )
    })
  }


  return (
    <Card className='card-browser-states'>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>کاربران سایت</CardTitle>
          <CardText className='font-small-2'>{user?.totalCount + ' ' + 'کاربر تا به ' + ' ' + date } </CardText>
        </div>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  )
}

export default CardBrowserState
