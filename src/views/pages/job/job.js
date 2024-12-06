import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Button } from 'reactstrap';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { getTournoment } from '../../../@core/api/Tournament/getTouronment';
import { Dropdown, FormSelect } from 'react-bootstrap';
import EditTour from '../../../components/common/modal/editTour';
import ShowReplay from '../../../components/common/modal/showReplay';
import ShowGroupModal from '../../../components/common/modal/showGroupModal';
import { getTourGroup } from '../../../@core/api/Tournament/group/getGroup';
import { useStateManager } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setTourGroup } from '../../../redux/TourGroup';
import { useSelect } from '@nextui-org/react';
import { getTourCheckList } from '../../../@core/api/Tournament/TourCheckList/getCheckList';
import ShowCheckList from '../../../components/common/modal/showCheckList';
import { getTerm } from '../../../@core/api/course/Term/getTerm';
import { ThreeDots } from 'react-loader-spinner';
import EdEditTerm from '../../../components/common/modal/editTerm';
import EditTermCloseTime from '../../../components/common/modal/editTermCloseTime';
import { Calendar, Menu, Plus } from 'react-feather';
import { Skeleton, Tooltip } from '@mui/material';
import { UpdateWork, deleteJobApi, getAllJob } from '../../../@core/api/job/getAllJob';

const Job = () => {
  const itemsPerPage = 8;
  const query = useQueryClient()
  const { data , isLoading : dataLoading } = useQuery({
    queryKey: ['getJob'],
    queryFn: getAllJob,
  });


  const [isActive, setIsActive] = useState(null)

  const [TourId, setTourId] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    if (data) {
      const result = data?.filter((row) => {
        const matchesSearchText = row.jobTitle?.toLowerCase().includes(searchText.toLowerCase())         
        const matchesActiveStatus = isActive === null || row.inWork === isActive;
        
        return matchesSearchText && matchesActiveStatus;
      });
      setFilteredData(result);
    }
  }, [searchText, data, isActive]);
  
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }


  const changeInWork = useMutation({
    mutationKey:['changeWork'],
    mutationFn: (data) => UpdateWork(data),
    onSuccess:() => {
      query.invalidateQueries('getJob')
    }
  })
  const deleteJob = useMutation({
    mutationKey:['deleteJobKey'],
    mutationFn: (id) => deleteJobApi(id),
    onSuccess:() => {
      query.invalidateQueries('getJob')
    }
  })


  const handleToggleInWork = (row) => {
    const updatedRow = { ...row, inWork: !row.inWork };  
    handleChangeState(updatedRow);
  };

  const handleChangeState = (updatedRow) => {
    const formData = new FormData();
    const data = {
      id: updatedRow.id,
      show: updatedRow.inWork
    }
    changeInWork.mutate(data)
    
  }
  const columns = [
    {
      name: 'عنوان شغل',
      selector: (row) => row.jobTitle,
    },
    {
      name: 'درباره شغل',
      selector: (row) => row.aboutJob,
      cell : row => (
        <Tooltip title={row.aboutJob} placement='top-end'>
          <span style={{
            width:'150px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'
          }}>
          {row.aboutJob}
          </span>
        </Tooltip>
      )
    },
    {
      name: 'سایت کمپانی',
      selector: (row) => row.companyWebSite,
      cell : row => (
        <Tooltip title={row.companyWebSite} placement='top-end'>
          <span style={{
            width:'100px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'
          }}>
          {row.companyWebSite}
          </span>
        </Tooltip>
      )
    },
    {
      name: 'لینکدین کمپانی',
      selector: (row) => row.companyLinkdin,
      cell : row => (
        <Tooltip title={row.companyLinkdin} placement='top-end'>
          <span style={{
            width:'100px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'
          }}>
          {row.companyLinkdin}
          </span>
        </Tooltip>
      )
    },
    {
      name: 'نام کمپانی ',
      selector: (row) => row.companyName,
    },
    {
      name: 'نام کمپانی ',
      selector: (row) => useDay(row.workStartDate),
    },
    {
      name: 'نام کمپانی ',
      selector: (row) => useDay(row.workEndDate),
    },
    {
      name: 'وضعیت',
      selector: (row) => row.inWork,
      sortable: true,
      cell : row => (
        <Tooltip title='برای تغییر وضعیت کلیک کنید' placement='top'>
        <Badge className='cursor-pointer' onClick={() => handleToggleInWork(row)} color={row.inWork ? 'success' : 'danger'} >{row.inWork ? 'فعال' : 'غیر فعال'}</Badge>
        </Tooltip>
      )
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <Dropdown className="no-border">
        <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-custom-components">
          <Menu />
        </Dropdown.Toggle>
  
        <Dropdown.Menu className="border-0">
          <Dropdown.Item as="div" className="d-flex justify-content-center align-items-center gap-1">
            <Button color='transparent'  size="sm" onClick={() => deleteJob.mutate(row.id)} >حذف شغل</Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        minHeight: '500px',
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
      <EdEditTerm size='md'  title={<Plus />} />
      <EditTermCloseTime size='md' title={<Calendar />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس عنوان شغل..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      <FormSelect
        value={isActive}
        className='cursor-pointer'
        onChange={(e) => setIsActive(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
      >
        <option className='cursor-pointer' value={null}>همه</option>
        <option  className='cursor-pointer' value={true}>فعال</option>
        <option  className='cursor-pointer' value={false}>غیرفعال</option>
      </FormSelect>

      </div>
        {dataLoading ? (
            <div >
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            <Skeleton animation="wave"  height={50} width={1300} />
            </div> 
        ) : (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DataTable
            columns={columns}
            data={filteredData} 
            pagination
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[8, 15, 30]}
            responsive
            customStyles={customStyles}
            highlightOnHover
          />
        </motion.div>
      </AnimatePresence>
      )}
    </div>
  );
};

export default Job;
