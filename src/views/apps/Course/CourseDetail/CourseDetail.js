import { Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourseDetail } from '../../../../@core/api/course/courseDetail';
import loading from '../../../../assets/images/svg/loading.svg';
import Product from '../../../pages/details';
import { setCourseListDetail } from '../../../../redux/Course';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, CardHeader, Table } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { Book, ChevronDown, User } from 'react-feather';
import { getGroup } from '../../../../@core/api/course/getGroup';
import UsersList from '../../user/list/Table';
import CourseUser from './CourseUser';
import Active from '../../../../components/common/active/active';
import DeleteGroup from '../../../../components/common/active/deleteGroup';
import { deleteCourseReserve, getCourseReserveById } from '../../../../@core/api/course/courseReserve';
import moment from 'moment-jalaali';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';
import CoursePayment from './coursePayment';
import CreateSchedual from '../../../../components/common/modal/createSchedual';
import { getSchedualId } from '../../../../@core/api/Schedual/schedual';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isExpend, setIsExpend] = useState(false);
    const [schedualId, setSchedualId] = useState('')

  const useDay = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }

  const queryClient = useQueryClient();
    const { data: productDetail, isLoading, isError } = useQuery({
        queryKey: ['courseDetails', id],
        queryFn: () => getCourseDetail(id),
        enabled: !!id,
        onError: () => {
            navigate('/not-found');
        },
    });


    const teacherId = productDetail?.teacherId;
    const { data: groupData } = useQuery({
        queryKey: ['getGroup', teacherId, id],
        queryFn: () => (teacherId && id ? getGroup(teacherId, id) : Promise.resolve([])), 
        enabled: !!teacherId && !!id,
        
    });
    const { data: reserveData } = useQuery({
        queryKey: ['getReserve', id],
        queryFn: () => getCourseReserveById(id) , 
        enabled: !!id,
    });
    const {data : getSchdualDataid} = useQuery({
        queryKey:['SchedualId' , schedualId],
        queryFn: () => getSchedualId(schedualId),
        enabled : !!schedualId
      })


    
        //   delete reserve 
        const deleteReserve = useMutation({
            mutationKey:['deleteReserved'],
            mutationFn: (id) => deleteCourseReserve(id),
            onSuccess: () => {
                queryClient.invalidateQueries(['getReserve', id]);
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
                deleteReserve.mutate(row.reserveId)
              }
            });
          }

    const filterReserve = reserveData?.filter((el) => el.accept === false)
    useEffect(() => {
        if (productDetail) {
            dispatch(setCourseListDetail(productDetail));
        }
    }, [productDetail]);

    if (isLoading) {
        return(
        <div className="d-flex justify-content-center align-items-center mt-4">
          <ThreeDots color="#007bff" height={80} width={80} />
        </div>  )  }

    if (isError) {
        return <div>خطا در بارگذاری داده‌ها</div>;
    }

    const toggleExpend = () => {
        setIsExpend(!isExpend)
    }
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate(`/apps/user/view/${teacherId}`)
    }



    const columns = [
        {
            sortable: true,
            minWidth: '20px',
            name: 'نام گروه',
            selector : row => row.groupName,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='avatar-wrapper'>
                        <Book className='me-1' size={'20px'} />
                        <Link >{isExpend ? row.groupName : `${row.groupName.substring(0,20)}...`}</Link>
                        <span className='cursor-pointer' onClick={toggleExpend}>{isExpend ? 'بستن' : 'ادامه'}</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='text-truncate fw-bolder'>{row.userFullName}</span>
                    </div>
                </div>
            ),
        },
        {
            name: 'ظرفیت دوره',
            selector : row => row.courseCapacity
        },
        {
            name: 'ظرفیت گروه',
            selector : row => row.groupCapacity
        },
        {
            name: 'شناسه گروه',
            selector : row => row.groupId
        },
        {
            name: 'مدرس دوره',
           selector : row => row.teacherName,
           cell : row =>(
                <Link onClick={handleNavigate}>{row.teacherName}</Link>
           )
        },
        {
            name: 'ویرایش',
           cell : row =>(
                <DeleteGroup
                    isActive={row.isDelete}
                    Id={row.groupId}
                    teacherId={teacherId}
                    id={id}
                    api="/CourseGroup" 
                    method="delete"
                    styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px' }} 
                    text='حذف '
                    text2='حذف شده'
              />
           )
        },
    ];


    const columnsReserve = [
        {
            sortable: true,
            minWidth: '20px',
            name: 'نام گروه',
            selector : row => row.studentName,
        },
        {
            name: 'تاریخ رزرو',
            selector : row => useDay(row.reserverDate)
        },
        {
            name: 'وضعیت',
            selector : row => row.accept ,
            cell: row => (
                <Badge color='warning' >در انتطار تایید</Badge>
            )

        },
        {
            name: 'ویرایش',
            cell : row => (
                <div className='d-flex justify-content-center align-items-center gap-1'>
                <Button color='danger' size='sm' onClick={() => handleDelete(row)} >حذف رزرو</Button>
            </div>            
            )

        },
    ]
    const columnsSchedual = [
        {
          name: 'آیدی گروه ',
          selector: row => row.courseGroupId,
          sortable: true,
        },
        {
          name: 'ساعت شروع ',
          selector: row => row.startTime,
          sortable: true,
        },
        {
          name: 'ساعت پایان',
          selector: row => row.endTime,
          sortable: true,
        },
        {
          name: 'تعداد در هفته ',
          selector: row => row.weekNumber,
          sortable: true,
        },
        {
          name: 'روز دوره',
          selector: row => useDay(row.startDate),
          sortable: true,
        },
        {
          name: 'حالت دوره',
          selector: row => row.forming,
          sortable: true,
          cell : row => (
            <Active
            isActive={row.forming}
            id={row.id}
            styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
            api="/Schedual/SchedualFroming"
            method="put"
            text2='تشکیل شده'
            text='تشکیل نشده'
          />  
        )
        },    
        {
          name: 'حضور غیاب دانشجو',
          selector: row => row.lockToRaise,
          sortable: true,
          cell : row => (
            <Active
            isActive={row.lockToRaise}
            id={row.id}
            styled={{ minWidth: '50px', cursor: 'pointer', padding: '5px' }}
            api="/Schedual/LockToRiase"
            method="put"
            text2='نمیتوانند شرکت کنند'
            text='میتوانند شرکت کنند'
          />
          )
        },    
        {
          name: 'عملیات',
          cell: row => (
            <div onClick={() => setSchedualId(row.id)} className='d-flex justify-content-center align-items-center gap-1'>
                <CreateSchedual schedual={getSchdualDataid} />
            </div>
          )
        }
      ];

    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', alignItems: 'start', gap: '30px' }}>
            {productDetail ? (
                <Product
                    params={id}
                    params2={teacherId}
                    id={productDetail.courseId}
                    Image={productDetail.imageAddress}
                    title={productDetail.title}
                    Description={productDetail.describe}
                    Date={productDetail.insertDate}
                    startTime={productDetail.startTime}
                    endTime={productDetail.endTime}
                    teacherName={productDetail.teacherName}
                    courseClassRoomName={productDetail.courseClassRoomName}
                    courseTypeName={productDetail.courseTypeName}
                    courseLevelName={productDetail.courseLevelName}
                    courseStatusName={productDetail.courseStatusName}
                    paymentDoneTotal={productDetail.paymentDoneTotal}
                    cost={productDetail.cost}
                    paymentNotDoneTotal={productDetail.paymentNotDoneTotal}
                    courseGroupTotal={productDetail.courseGroupTotal}
                    courseUserTotal={productDetail.courseUserTotal}
                    courseLikeTotal={productDetail.courseLikeTotal}
                    courseCommentTotal={productDetail.courseCommentTotal}
                    isActive={productDetail.isActive}
                    courseTeches={productDetail.courseTeches}
                    teacherId={productDetail.teacherId}
                />
            ) : (
                <div style={{ margin: 'auto', fontSize: '30px', fontWeight: 700 }}>دوره ای پیدا نشد</div>
            )}
            <CourseUser courseId={productDetail?.courseId} />
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'>گروه های دوره</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        columns={columns}
                        data={groupData || []} 
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </div>
            </Card>
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'>رزرو های دوره</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        columns={columnsReserve}
                        data={filterReserve || []} 
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </div>
            </Card>
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'>بازه های زمانی این دوره</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        pagination
                        columns={columnsSchedual}
                        data={productDetail?.courseSchedules || []} 
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </div>
            </Card>
            <CoursePayment id={productDetail.courseId} />
        </div>
    );
};

export default CourseDetail;
