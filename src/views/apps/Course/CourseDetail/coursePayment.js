import { Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, CardHeader, Table } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { Book, ChevronDown, User } from 'react-feather';
import moment from 'moment-jalaali';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';
import { getCoursePayment } from '../../../../@core/api/coursePay/getCoursePay';
import Active from '../../../../components/common/active/active';
import { deletePayment } from '../../../../@core/api/coursePay/deletePay';
const CoursePayment = ({id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isExpend, setIsExpend] = useState(false);

  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  const queryClient = useQueryClient();

//   get data payment 
  const {data : coursePayment} = useQuery({
    queryKey:['getPayment'],
    queryFn: () => getCoursePayment(id),
    enabled : !!id
  })

  console.log(coursePayment);

          //   delete pay 
          const deletePay = useMutation({
            mutationKey:['deletePaymentId'],
            mutationFn: (id) => deletePayment(id),
            onSuccess: () => {
                queryClient.invalidateQueries(['getPayment']);
            },
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
        deletePay.mutate(row.id)
      }
    });
  }

    const columnsReserve = [
        {
            name: 'آیدی دانش آموز',
            minWidth: '20px',
            selector : row => row.studentId,
        },
        {
            name: 'نام دانش آموز',
            minWidth: '20px',
            selector : row => row.studentName,
        },
        {
            name: 'مبلغ پرداختی',
            minWidth: '20px',
            selector : row => row.paid,
        },
        {
            name: 'نام گروه',
            minWidth: '20px',
            selector : row => row.groupName,
        },
        {
            name: 'تاریخ رزرو',
            selector : row => useDay(row.peymentDate)
        },
        {
            name: 'وضعیت',
            selector : row => row.accept ,
            cell: row => (
                <Active
                isActive={row.accept}
                id={row.id}
                payment={row.id}
                styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
                api="/CoursePayment/Accept"
                method="put"
                text='در انتظار تایید'
                text2='تاییده شده'
              />
            )

        },
        {
            name: 'ویرایش',
            cell : row => (
                <div className='d-flex justify-content-center align-items-center gap-1'>
                <Button color='danger' size='sm' onClick={() => handleDelete(row)} >حذف پرداختی</Button>
            </div>            
            )

        },
    ]
    

    return (
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'>پرداختی های دوره</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        columns={columnsReserve}
                        pagination
                        data={coursePayment || []} 
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </div>
            </Card>
    );
};

export default CoursePayment;
