import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Button } from 'reactstrap';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { getDep } from '../../../@core/api/Department/getDep';
import EditDep from '../../../components/common/modal/editDep';
import { getAssCourse } from '../../../@core/api/assWork/getAssCourse';
import EditAssCourse from '../../../components/common/modal/editAssCourse';
import { getAssWork } from '../../../@core/api/assWork/assWorkPage/getAssWork';
import EditAssWork from '../../../components/common/modal/editAssWork';
import { Dropdown } from 'react-bootstrap';
import { Menu, Plus } from 'react-feather';
import { Skeleton, Tooltip } from '@mui/material';
import { getNotifType } from '../../../@core/api/Notif/notifType/getNotifType';
import EditNotifType from '../../../components/common/modal/editNotifType';
import { deleteNotifType } from '../../../@core/api/Notif/notifType/deleteNotifType';
import { getAllWallet } from '../../../@core/api/wallet/getAllWallet';
import EditWallet from '../../../components/common/modal/editWallet';
import { DeleteWallet } from '../../../@core/api/wallet/deleteWallet';
import { getAllTransaction } from '../../../@core/api/wallet/Transaction/getAllTransaction';
import { DeleteTransaction } from '../../../@core/api/wallet/Transaction/deleteTransaction';

const Transaction = () => {
  const itemsPerPage = 8;
    const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['getTransaction'],
    queryFn: getAllTransaction,
  });

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      const result = data?.data.filter((row) =>
        row.Serial?.includes(searchText.toLowerCase())       );
      setFilteredData(result);
    }
  }, [searchText, data]);
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const deleteTransactionById = useMutation({
    mutationKey:['deleteTransactionData'],
    mutationFn: (data) => DeleteTransaction(data),
    onSuccess: () => {
        queryClient.invalidateQueries('getTransaction')   
    }
  })

  const columns = [
    {
      name: 'شناسه پرداخت',
      selector: (row) => row.id,
      cell : row => (
        <Tooltip title={row.id} placement='top-end' >
            <span
                style={{
                    width:'150px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis'
                }}
            >{row.id}</span>
        </Tooltip>
      )
    },
    {
      name: 'عنوان تراکنش',
      selector: (row) => row.Title,
    },
    {
      name: 'مبلغ پرداختی',
      selector: (row) => row.Cost,
    },
    {
      name: 'سریال پرداختی',
      selector: (row) => row.Serial,
    },
    {
      name: 'تاریخ پرداختی',
      selector: (row) => useDay(row.date),
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
            <Dropdown.Item >
              <Button color='transparent' style={{textAlign:'center' , border:'none'}} onClick={() => deleteTransactionById.mutate(row.id)}>حذف تراکنش </Button>
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
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس سریال پرداخت ..."
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

export default Transaction;
