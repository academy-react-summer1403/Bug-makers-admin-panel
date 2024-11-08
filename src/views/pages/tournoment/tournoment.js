import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import EditBullding from '../../../components/common/modal/editBullding';
import Active from '../../../components/common/active/active';
import moment from 'moment-jalaali';
import { getTournoment } from '../../../@core/api/Tournament/getTouronment';
import { FormSelect } from 'react-bootstrap';
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

const Tournament = () => {
  const itemsPerPage = 8;

  const { data } = useQuery({
    queryKey: ['getCheckList'],
    queryFn: getTournoment,
  });


  const [isActive, setIsActive] = useState(null)

  const [TourId, setTourId] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  console.log(TourId);

  // group tour 
  const { data : TourGroup , isLoading } = useQuery({
    queryKey: ['getTourGroup' ,TourId],
    queryFn: () => getTourGroup(TourId),
    enabled: !!TourId
  });
  // CheckList tour 
  const { data : CheckList , isLoading : loading } = useQuery({
    queryKey: ['getCheckList' ,TourId],
    queryFn: () => getTourCheckList(TourId),
    enabled: !!TourId
  });

  console.log(data);
  const dispatch = useDispatch()
  useEffect(() => {
    if(TourGroup){
      dispatch(setTourGroup(TourGroup))
    }
  }, [TourGroup])

  useEffect(() => {
    if (data) {
      const result = data.filter((row) => {
        const matchesSearchText = row.tournamentName?.toLowerCase().includes(searchText.toLowerCase())         
        const matchesActiveStatus = isActive === null || row.active === isActive;
        
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
      name: 'نام تورنومنت',
      selector: (row) => row.tournamentName,
    },
    {
      name: ' توضیحات تورنومنت',
      selector: (row) => row.describe,
    },
    {
      name: ' توضیحات تورنومنت',
      selector: (row) => row.active,
      sortable: true,
      cell : row => (
        <Badge color={row.active ? 'success' : 'danger'} >{row.active ? 'فعال' : 'غیر فعال'}</Badge>
      )
    },
    {
      name: 'تاریخ شروع',
      selector: (row) => useDay(row.startDate),
    },
    {
      name: 'تاریخ پایین',
      selector: (row) => useDay(row.endDate),
    },
    {
      name: 'عملیات',
      cell: (row) => (
        <div className='d-flex justify-content-center align-items-center gap-1'>
        <div  className="d-flex justify-content-center align-items-center gap-1">
          <EditTour title={'ویرایش'} row={row} />
        </div>
        <div onClick={() => setTourId(row.id)} className="d-flex justify-content-center align-items-center gap-1">
          <ShowGroupModal isLoading={isLoading} TourId={TourId} group={TourGroup} />
          </div>
        <div onClick={() => setTourId(row.id)} className="d-flex justify-content-center align-items-center gap-1">
          <ShowCheckList isLoading={loading} TourId={TourId} group={CheckList} />
          </div>
          </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3">
        <EditTour title={'افزودن تورنومنت '} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس نام تورنومنت      ..."
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

export default Tournament;
