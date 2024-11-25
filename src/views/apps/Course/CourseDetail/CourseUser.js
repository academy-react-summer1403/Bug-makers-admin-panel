// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './column'

// ** Store & Actions
import { getAllData, getData } from '../../user/store/index'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { auto } from '@popperjs/core'
import { useQuery } from '@tanstack/react-query'
import { getCourseUser } from '../../../../@core/api/course/getCourseUser'

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  setSearchTerm,
  currentRole,
  currentPlan,
  currentStatus,
  setCurrentRole,
  setCurrentPlan,
  setCurrentStatus,
  roleOptions,
  selectThemeColors,
  dispatch,
  getData,
  sort,
  sortColumn,
  currentPage
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store.data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    toggleModal(); // Close modal after selecting a role
  };
  const handleClearFilters = () => {
    setSearchTerm("");
  
    setCurrentRole({ value: '', label: 'انتخاب نقش' });
    
    setCurrentStatus({ value: '', label: 'Select Status', number: 0 });
    
    setCurrentPlan({ value: '', label: 'Select Plan' });
  
    dispatch(getData({
      sort,
      sortColumn,
      q: "",  
      page: currentPage,
      perPage: rowsPerPage,
      userRoles: '',  
      status: '',    
      currentPlan: '' ,
    }));
  };
  
};

const CourseUser = ({courseId}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [sort, setSort] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('DESC')
  const [rowsPerPage, setRowsPerPage] = useState(5000)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'انتخاب نقش' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]); // فقط در زمان بارگذاری کامپوننت
  
  useEffect(() => {
    dispatch(getData({
      sort,
      sortColumn,
      q: searchTerm,
      page: currentPage,
      perPage: rowsPerPage,
      userRoles: currentRole.value,
      active: currentStatus.value,
    }));
  }, [dispatch, currentPage, rowsPerPage, searchTerm, sort, sortColumn, currentRole, currentStatus, currentPlan]); // اضافه کردن وابستگی‌ها
  

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'انتخاب نقش' },
    { value: '1', label: 'ادمین' },
    { value: '2', label: 'معلم' },
    { value: '3', label: 'کارمند.ادمین' },
    { value: '4', label: 'دانش آموز' },
    { value: '5', label: 'کمک دوره' },
    { value: '6', label: 'مدیریت مسابقات' },
    { value: '7', label: 'داور' },
    { value: '8', label: 'مربی مسابقات' },
    { value: '9', label: 'پشتیبان' },
  ]

  const handlePagination = page => {
    dispatch(
      getData({
        q: searchTerm,
        RowsOfPage: rowsPerPage,
        PageNumber: page.selected + 1,
        userRoles: currentRole.value,
        active: currentStatus.value,
      })
    )
    setCurrentPage(page.selected + 1)
  }
  

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        userRoles: currentRole.value,
        active: currentStatus.value
      })
    )
  }
  

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        userRoles: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.totalCount / rowsPerPage))
  
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }
  
  
  const {data: getCourseUsers } = useQuery({
    queryKey:['getCourseUsers' , searchTerm],
    queryFn:() => getCourseUser(courseId , searchTerm)
  })
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        userRoles: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
  }

  const customStyles = {
    table: {
      style: {
        minHeight: '300px',
      },
    },
 
  
  };
  return (
    <Fragment>
      <Card className='overflow-hidden 'style={{width:'100%'}}>
        <Input 
            placeholder='جستجو کنید'
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            customStyles={customStyles}
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={getCourseUsers}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                currentRole={currentRole}
                currentPlan={currentPlan}
                currentStatus={currentStatus}
                setCurrentRole={setCurrentRole}
                setCurrentPlan={setCurrentPlan}
                setCurrentStatus={setCurrentStatus}
                roleOptions={roleOptions}
                selectThemeColors={selectThemeColors}
                dispatch={dispatch}
                getData={getData}
                sort={sort}
                sortColumn={sortColumn}
                currentPage={currentPage}
              />
            }
          />
        </div>
      </Card>

    </Fragment>
  )
}

export default CourseUser
