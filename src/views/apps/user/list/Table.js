// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store'
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

  const handleRoleChange = (e) => {
    const selectedRole = roleOptions.find(role => role.value === e.target.value);
    setCurrentRole(selectedRole);
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
  
  return (
<div className="invoice-list-table-header  w-100 me-1 ms-50 align-items-center mt-2 mb-75" >
  <Row style={{justifyContent : 'end' , alignItems : 'center' , display : 'flex' , height:'100px'}}>
  <select
          className="form-control "
          value={currentRole ? currentRole.value : ''}
          onChange={handleRoleChange}
          style={{ width: '200px', position: 'absolute', right: '20px' }}
        >
          <option className='Opt' value="" disabled>
            انتخاب نقش
          </option>
          {roleOptions.map((role) => (
            <option key={role.value} className='Opt' value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        {/* Remove All Filters Button */}
        <Button
          style={{position : 'absolute', top : '0' , right : 0}}
          color='primary'
          onClick={handleClearFilters}
        >
          حذف فیلتر ها
        </Button>
    <Col
      xl="6"
      className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
    >
      <div className="d-flex align-items-center ">
        <label style={{marginRight : '20px' }} htmlFor="search-invoice">
          Search:
        </label>
        <Input
          id="search-invoice"
          className="ms-2 "
          style={{width: '200px' , marginLeft : '20px'}}
          type="text"
          value={searchTerm}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center justify-content-center table-header-actions">
        <UncontrolledDropdown className="me-1">
          <DropdownToggle color="secondary" caret outline>
            <Share className="font-small-4 me-50" />
            <span className="align-middle">خروجی</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="w-100" onClick={() => downloadCSV(store.data)}>
              <FileText className="font-small-4 me-50" />
              <span className="align-middle">CSV</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Button className="add-new-user me-3   " style={{width: '150px'}} color="primary" onClick={toggleSidebar}>
          اضافه کردن کاربر 
        </Button>
      </div>
    </Col>
  </Row>
</div>

  );
};

const UsersList = () => {
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
  }, [dispatch]); 
  
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
  

  const dataToRender = () => {
    const filters = {
      userRoles: currentRole.value,
      active: currentStatus.value,
      q: searchTerm
    }
  
    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
  
    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage) 
    }
  }
  

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
        minHeight: '200px',
      },
    },
 
  
  };
  return (
    <Fragment>
      <Card className='overflow-hidden'>

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
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
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

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
