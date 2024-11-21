import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import moment from 'moment-jalaali';
import { Dropdown, FormSelect } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import EdEditTerm from '../../../components/common/modal/editTerm';
import EditTermCloseTime from '../../../components/common/modal/editTermCloseTime';
import { getTech } from '../../../@core/api/course/Tech/getTech';
import EditCourseTech from '../../../components/common/modal/EditCourseTech';
import { Menu, Plus } from 'react-feather';
import { Skeleton } from '@mui/material';

const Tech = () => {
  const itemsPerPage = 8;

  const { data , isLoading : dataLoading } = useQuery({
    queryKey: ['getCourseTech'],
    queryFn: getTech,
  });


  const [isActive, setIsActive] = useState(null)

  const [TourId, setTourId] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    if (data) {
      const result = data.filter((row) => {
        const matchesSearchText = row.techName?.toLowerCase().includes(searchText.toLowerCase())         
        
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
      name: 'نام دسته بندی',
      selector: (row) => row.techName,
    },
    {
      name: 'توضیحات دسته بندی',
      selector: (row) => row.describe,
    },
    {
      name: 'آیکون دسته بندی',
      selector: (row) => row.iconAddress,
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle style={{whiteSpace:'nowrap' , border:'none'}} variant="transparent" size="sm" id="dropdown-custom-components">
            <Menu /> 
.          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" >
              <EditCourseTech size='sm' row={row} title='ویرایش' />
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
      <EditCourseTech size='md'  title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام دسته بندی      ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

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

export default Tech;
