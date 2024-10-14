// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment-jalaali';
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}
const useDate = (date) => {
  if(!date) return 'تاریخ تولد وجود ندارد';
  return moment(date).format('jYYYY/jMM/jDD'); 
}
// ** Table columns
export const columns = [
  {
    name: 'نام کاربر',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <Link className='fw-bolder' to={`/apps/invoice/preview/${row.id}`}>{`#${row.groupName}`}</Link>
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: '102px',
    sortable: true,
    sortField: 'invoiceStatus',
    selector: row => row.invoiceStatus,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Edit
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>{row.invoiceStatus}</span>
            <br />
            <span className='fw-bold'>Balance:</span> {row.balance}
            <br />
            <span className='fw-bold'>Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },

  {
    name: 'مبلغ پرداخت شده',
    minWidth: '150px',
    selector: row => row.paid,
    cell: row => <span>تومان{row.paid || 0}</span>
  },
  {
    minWidth: '200px',
    name: 'تاریخ پرداخت',
    cell: row => useDate(row.peymentDate)
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send className='text-body cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link className='text-body' to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <Link placement='top' to={`/apps/invoice/preview/${row.courseUserId}`}>
          Preview Invoice
        </Link>

        <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`download-tooltip-${row.id}`}>
          Download Invoice
        </UncontrolledTooltip>
      </div>
    )
  }
]
