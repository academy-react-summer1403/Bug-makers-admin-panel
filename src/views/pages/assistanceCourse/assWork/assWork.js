import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { getDep } from '../../../@core/api/Department/getDep';
import EditDep from '../../../components/common/modal/editDep';
import { getAssCourse } from '../../../@core/api/assWork/getAssCourse';
import EditAssCourse from '../../../components/common/modal/editAssCourse';

const AssWork = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getAssC'],
    queryFn: getAssCourse,
  });


  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data.filter((row) =>
        row.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
        row.userId.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        useDay(row.inserDate).toLowerCase().includes(searchText.toLowerCase()) 
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
      name: 'نام دوره',
      width: '400px',
      selector: (row) => row.courseName,
    },
    {
      name: 'تاریخ انتشار',
      width: '400px',
      selector: (row) => useDay(row.inserDate),
    },
    {
      name: 'ایدی کاربر ',
      width: '150px',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-1">
          <EditAssCourse title={'ویرایش'} row={row} />
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <EditAssCourse title={'افزودن منتور'} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام دوره  تاریخ انتشار یا آیدی کاربر..."
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

export default AssWork;
