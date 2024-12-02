import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { getAllJob } from '../../../@core/api/job/getAllJob';
import { getAllExam } from '../../../@core/api/exam/exam';
import CreateExamModal from '../../../components/common/modal/createExamModal';
import { getExamById } from '../../../@core/api/exam/getById';
import ShowTest from '../../../components/common/modal/showTest';
import { deleteExam } from '../../../@core/api/exam/deleteExam';

const Job = () => {
  const itemsPerPage = 8;
  const query = useQueryClient()
  const { data , isLoading : dataLoading } = useQuery({
    queryKey: ['getExam'],
    queryFn: getAllExam,
  });


  const [isActive, setIsActive] = useState(null)
  const [TourId, setTourId] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    if (data) {
      const result = data?.data?.filter((row) => {
        const matchesSearchText = row.title?.toLowerCase().includes(searchText.toLowerCase()) || row.Level?.toLowerCase().includes(searchText.toLowerCase())         
        return matchesSearchText;
      });
      setFilteredData(result);
    }
  }, [searchText, data, isActive]);
  
  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  const deleteExamFun = useMutation({
    mutationKey: ['deleteExamKey'],
    mutationFn: (examId) => deleteExam(examId),
    onSuccess:() => {
      query.invalidateQueries('getExam')
    }
  })

  
  const columns = [
    {
      name: 'عنوان آزمون',
      selector: (row) => row.title ? row.title : 'عنوان وجود ندارد',
    },
    {
      name: 'زمان آزمون',
      selector: (row) => row.time,
    },
    {
      name: 'سطح آزمون',
      selector: (row) => row.Level,
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
            <ShowTest id={row.id} size="sm" >نمایش تست </ShowTest>
          </Dropdown.Item>
  
          <Dropdown.Item as="div" className="d-flex justify-content-center align-items-center gap-1">
            <Button size="sm" onClick={() => deleteExamFun.mutate(row.id)} color='transparent' >حذف آزمون</Button>
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
      <CreateExamModal size='md'  title={<Plus />} />
        <input
          type="search"
          className="form-control"
          placeholder="جستجو بر اساس عنوان شغل و سطح آزمون..."
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
