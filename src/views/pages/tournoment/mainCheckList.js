import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import moment from 'moment-jalaali';
import { getMainCheckList } from '../../../@core/api/Tournament/checkList/mainCheckList';
import { Dropdown, FormSelect } from 'react-bootstrap';
import EditTour from '../../../components/common/modal/editTour';
import EditCheckList from '../../../components/common/modal/editCheckList';
import { Menu, Plus } from 'react-feather';
import { Skeleton } from '@mui/material';

const MainCheckList = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getCheckList'],
    queryFn: getMainCheckList,
  });

  const [isActive, setIsActive] = useState(null)


  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data.filter((row) => {
        const matchesSearchText = row.title?.toLowerCase().includes(searchText.toLowerCase())         
        
        return matchesSearchText ;
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
      name: ' آیدی چک لیست',
      selector: (row) => row.id,
    },
    {
      name: ' نام چک لیست',
      selector: (row) => row.title,
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-basic">
            <Menu />
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item href="#" >
            <EditCheckList title={'ویرایش'} row={row} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <EditCheckList title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام تورنومنت      ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>

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
            noDataComponent={
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
            }
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[8, 15, 30]}
            responsive
            highlightOnHover
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainCheckList;
