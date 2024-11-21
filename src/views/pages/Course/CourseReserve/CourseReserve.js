import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBox from '../../../../components/common/modal/SearchBox/SearchBox';
import DataTable from 'react-data-table-component';
import { ThreeDots } from 'react-loader-spinner';
import { motion, AnimatePresence } from 'framer-motion'; 
import moment from 'moment-jalaali';
import { Menu, X } from 'react-feather';
import { deleteCourseReserve, getCourseReserve } from '../../../../@core/api/course/courseReserve';
import { Badge, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import UpdateCourseReserve from '../../../../components/common/modal/updateCourseReserve';
import { Dropdown } from 'react-bootstrap';

const CourseReserve = () => {
    const [queryValue, setQueryValue] = useState('');
    const [queryValueStudent, setQueryValueStudent] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const { data, isLoading, error } = useQuery({
    queryKey: ['courseReserve'],
    queryFn: getCourseReserve,
    keepPreviousData: true,
  });


  const queryClient = useQueryClient();

//   delete reserve 
    const deleteReserve = useMutation({
        mutationKey:['deleteReserved'],
        mutationFn: (id) => deleteCourseReserve(id),
        onSuccess: () => {
          queryClient.invalidateQueries('courseReserve')
        }
    })

    const handleDelete = (row) => {
        Swal.fire({
          title: 'از حذف این رزرو مطمئنی؟',
          text: "این عمل غیرقابل بازگشت است!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'بله، حذف کن!',
          cancelButtonText: 'خیر، انصراف',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteReserve.mutate(row.reserveId)
          }
        });
      }

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter(item => 
        item.courseName.toLowerCase().includes(queryValue.toLowerCase()) &&
        item.studentName?.toLowerCase().includes(queryValueStudent.toLocaleLowerCase())
      ));
    }
  }, [data, queryValue , queryValueStudent]);

  const handleSearch = (e) => setQueryValue(e.target.value);
  const handleSearchStudent = (e) => setQueryValueStudent(e.target.value);

  const handleRemoveFilter = () => {
    setQueryValue('');
    setQueryValueStudent('');
  };

  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  const itemsPerPage = 8;



  const columns = [
    {
      name: 'نام رزرو کننده',
      selector: row => row.studentName,
      sortable: true,
    },
    {
      name: 'نام دوره',
      selector: row => row.courseName,
      sortable: true,
    },
    {
      name: 'تاریخ رزرو',
      selector: row => useDay(row.reserverDate),
      sortable: true,
    },
    {
      name: 'وضعیت رزرو',
      selector: row => row.accept,
      sortable: true,
      cell: row =>{ 
        return(
            <Badge color={row.accept ? 'success' : 'warning'} >{row.accept ? 'تایید شده' : 'در انتظار تایید'}</Badge>
        )}   
    },
    {
      name: 'عملیات',
      cell: row => (
        <Dropdown>
        <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-custom-components">
          <Menu />
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item as="div" className="d-flex align-items-center">
            <UpdateCourseReserve
              selected={row.courseId}
              studentId={row.studentId}
            />
          </Dropdown.Item>
  
          <Dropdown.Item as="div" className="d-flex align-items-center">
            <Button size="sm" color="transparent" style={{border:'none'}} onClick={() => handleDelete(row)}>
              حذف رزرو
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      )
    }
  ];

  return (
    <div className='container mt-4'>
      <div className='d-flex  flex-column flex-lg-row justify-content-center align-items-center gap-3 bg-white rounded shadow p-3'>
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='نام دوره را وارد کنید'
          value={queryValue}
          onChange={handleSearch}
        />
        <X className={`${queryValue ? 'block' : 'hidden'} cursor-pointer position-absolute `}
            style={{marginRight:'-180px'}}
            size={14} 
            color="black" 
            onClick={() => setQueryValue('')}    
        />
        <SearchBox
          width={"100%"}
          lgWidth={"160px"}
          placeHolder='نام دانش آموز را وارد کنید'
          value={queryValueStudent}
          onChange={handleSearchStudent}
        />
        <X className={`${queryValueStudent ? 'block' : 'hidden'} cursor-pointer position-absolute `}
            style={{marginRight:'220px'}}
            size={14} 
            color="black" 
            onClick={() => setQueryValueStudent('')}    
        />
        <Badge color='warning' className='p-1 cursor-pointer' onClick={handleRemoveFilter}>حذف فیلتر</Badge>

        {/* <CreateCategoryBlog /> */}
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <ThreeDots color="#007bff" height={80} width={80} />
        </div>
      )}
      {error && <p>خطایی رخ داده است...</p>}

      <AnimatePresence>
        <motion.div
          key={viewMode}
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

export default CourseReserve;
