import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
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

const Term = () => {
  const itemsPerPage = 8;

  const { data , isLoading : dataLoading } = useQuery({
    queryKey: ['getTerm'],
    queryFn: getTerm,
  });


  const [isActive, setIsActive] = useState(null)

  const [TourId, setTourId] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    if (data) {
      const result = data.filter((row) => {
        const matchesSearchText = row.termName?.toLowerCase().includes(searchText.toLowerCase())         
        const matchesActiveStatus = isActive === null || row.expire === isActive;
        
        return matchesSearchText && matchesActiveStatus;
      });
      setFilteredData(result);
    }
  }, [searchText, data, isActive]);
  
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }



  
  const columns = [
    {
      name: 'نام ترم',
      selector: (row) => row.termName,
    },
    {
      name: 'نام بخش',
      selector: (row) => row.departmentName,
    },
    {
      name: 'وضعیت',
      selector: (row) => row.expire,
      sortable: true,
      cell : row => (
        <Badge color={row.expire ? 'danger' : 'success'} >{row.expire ? 'منقضی شده' : 'فعال'}</Badge>
      )
    },
    {
      name: 'تاریخ انتشار',
      width:'150px',
      selector: (row) => useDay(row.insertDate),
    },
    {
      name: 'تاریخ شروع',
      width:'150px',
      selector: (row) => useDay(row.startDate),
    },
    {
      name: 'تاریخ پایان',
      width:'150px',
      selector: (row) => useDay(row.endDate),
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
            <EdEditTerm size="sm" row={row} title="ویرایش" />
          </Dropdown.Item>
  
          <Dropdown.Item as="div" className="d-flex justify-content-center align-items-center gap-1">
            <EditTermCloseTime size="sm" row={row} title="ویرایش زمان" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
      <EdEditTerm size='md'  title={<Plus />} />
      <EditTermCloseTime size='md' title={<Calendar />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام ترم      ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      <FormSelect
        value={isActive}
        className='cursor-pointer'
        onChange={(e) => setIsActive(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
      >
        <option className='cursor-pointer' value={null}>همه</option>
        <option  className='cursor-pointer' value={false}>فعال</option>
        <option  className='cursor-pointer' value={true}>منقضی شده</option>
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
            highlightOnHover
          />
        </motion.div>
      </AnimatePresence>
      )}
    </div>
  );
};

export default Term;
