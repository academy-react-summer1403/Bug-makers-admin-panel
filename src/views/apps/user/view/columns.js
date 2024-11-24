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
import { Tooltip } from '@mui/material';

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
    name: 'نام گروه',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <Link className='fw-bolder' to={`/apps/invoice/preview/${row.paymentId}`}>{`#${row.groupName}`}</Link>
  },

  {
    name: 'مبلغ پرداخت شده',
    minWidth: '150px',
    selector: row => row.paid,
    cell: row => <span>{row.paid || 0}</span>
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


        <Tooltip title='نمایش جزییبات' placement='top' >
          <Link className='text-body' to={`/apps/invoice/preview/${row.paymentId}`} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
        </Tooltip>
      </div>
    )
  }
]
