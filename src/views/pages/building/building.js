import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import { getBuilding } from '../../../@core/api/building/building';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { Dropdown } from 'react-bootstrap';
import { Menu, Plus } from 'react-feather';
import { Skeleton } from '@mui/material';

const Bullding = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getBuilding'],
    queryFn: getBuilding,
  });

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data.filter((row) =>
        row.buildingName?.toLowerCase().includes(searchText.toLowerCase()) ||
        useDay(row.workDate).toLowerCase().includes(searchText.toLowerCase()) ||
        row.floor?.toString().includes(searchText) 
      );
      setFilteredData(result);
    }
  }, [searchText, data]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  const columns = [
    {
      name: 'نام ساختمان',
      width: '400px',
      selector: (row) => row.buildingName,
    },
    {
      name: 'ساعت کاری',
      width: '400px',
      selector: (row) => useDay(row.workDate),
    },
    {
      name: 'مساحت',
      width: '150px',
      selector: (row) => row.floor,
      sortable: true,
    },
    {
      name: 'وضعیت',
      width: '150px',
      selector: (row) => row.active,
      sortable: true,
      cell: (row) => (
        <Badge color={row.active ? 'success' : 'warning'}>
          {row.active ? 'فعال' : 'غیر فعال'}
        </Badge>
      ),
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <Dropdown className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-custom-components">
          <Menu />
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <EditBullding title={'ویرایش'} row={row} />
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <Active
              isActive={row.active}
              id={row.id}
              api="/Building/Active"
              method="put"
              styled={{
                minWidth: '50px',
                cursor: 'pointer',
                padding: '10px',
                marginRight: '10px',
              }}
              text={row.active === true ? 'غیر فعال' : 'غیرفعال'}
              text2={row.active === true ? 'فعال' : 'فعال'}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <EditBullding title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام ساختمان، ساعت کاری یا مساحت..."
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

export default Bullding;
