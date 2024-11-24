// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'
import moment from 'moment-jalaali';

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Store & Actions
import { getData } from '../store/index'
import { useDispatch, useSelector } from 'react-redux'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getCoursePayment } from '../../../../redux/CoursePayment'

const InvoiceList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.user.selectUser)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(6)
  const [currentPage] = useState(1)
  const [statusValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    )
  }, [dispatch])


  const [coursePayment, setCoursePayment] = useState([]) // State to hold the comments
  const course = useSelector(state => state.payment.selectUser)
  const user = useSelector(state => state.user.selectUser)

  useEffect(() => {
    const id = user.id;
    if (id) {
      dispatch(getCoursePayment(id))
    }
  }, [dispatch, user.id])

  useEffect(() => {
    if (course) {
      setCoursePayment(course) // Set the comments when available
    }
  }, [course])

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.length > 0) {
      return store.data.slice(0, rowsPerPage)
    } else if (store.length === 0 && isFiltered) {
      return []
    } else {
      return store.totalCount.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }
  

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>Invoices</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='secondary' outline caret>
              <ExternalLink className='font-small-4 me-50' />
              <span>Export</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className='w-100'>
                <Printer className='font-small-4 me-50' />
                <span>Print</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <FileText className='font-small-4 me-50' />
                <span>CSV</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <File className='font-small-4 me-50' />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Clipboard className='font-small-4 me-50' />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Copy className='font-small-4 me-50' />
                <span>Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            className='react-dataTable'
            onSort={handleSort}
            data={coursePayment}
            sortIcon={<ChevronDown />}
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList
