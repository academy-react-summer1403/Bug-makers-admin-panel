import { Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import moment from 'moment-jalaali';
import Swal from 'sweetalert2';
import Active from '../../../components/common/active/active';
import { deletePayment } from '../../../@core/api/coursePay/deletePay';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import { getPayPage } from '../../../@core/api/coursePay/getPayPage';
import { getCoursePayment } from '../../../@core/api/coursePay/getCoursePay';
import { ThreeDots } from 'react-loader-spinner';

const CoursePaymentPage = () => {
  const [courseIdList, setCourseIdList] = useState([]);
  const [coursePayments, setCoursePayments] = useState([]);
  const queryClient = useQueryClient();

  const useDay = (date) => {
    if (!date) return 'تاریخ وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD');
  };

//   get course 
  const { data: courses, isLoading: courseLoading, isError: courseError } = useQuery({
    queryKey: ['getCourses'],
    queryFn: getPayPage,
  });

//   map list courseId 
  useEffect(() => {
    if (courses?.courseFilterDtos) {
      const cId = courses.courseFilterDtos.map((item) => item.courseId);
      setCourseIdList(cId);
    }
  }, [courses]);

//   get payment 
  useEffect(() => {
    if (courseIdList.length === 0) return;

    const fetchPayments = async () => {
      try {
        const payments = await Promise.all(
          courseIdList.map((course) => getCoursePayment(course))
        );
        setCoursePayments(payments.flat()); 
      } catch (error) {
        console.error('خطا در دریافت پرداخت‌ها:', error);
      }
    };

    fetchPayments();
  }, [courseIdList]); 

//   delete 
  const deletePay = useMutation({
    mutationKey: ['deletePaymentId'],
    mutationFn: (id) => deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['getPayment']);
    },
  });

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
        deletePay.mutate(row.id);
      }
    });
  };

  const columnsReserve = [
    {
      name: 'آیدی دانش آموز',
      minWidth: '20px',
      selector: (row) => row.studentId,
    },
    {
      name: 'نام دانش آموز',
      minWidth: '20px',
      selector: (row) => row.studentName,
    },
    {
      name: 'مبلغ پرداختی',
      minWidth: '20px',
      selector: (row) => row.paid,
    },
    {
      name: 'نام گروه',
      minWidth: '20px',
      selector: (row) => row.groupName,
    },
    {
      name: 'تاریخ رزرو',
      selector: (row) => useDay(row.peymentDate),
    },
    {
      name: 'وضعیت',
      selector: (row) => row.accept,
      cell: (row) => (
        <Active
          isActive={row.accept}
          id={row.id}
          payment={row.id}
          styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
          api="/CoursePayment/Accept"
          method="put"
          text="در انتظار تایید"
          text2="تاییده شده"
        />
      ),
    },
    {
      name: 'ویرایش',
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-1">
          <Button color="danger" size="sm" onClick={() => handleDelete(row)}>
            حذف پرداختی
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <CardHeader tag="h4">پرداختی های دوره</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columnsReserve}
          pagination
          data={coursePayments || []} 
          className="react-dataTable"
          noDataComponent={<ThreeDots />}
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CoursePaymentPage;
