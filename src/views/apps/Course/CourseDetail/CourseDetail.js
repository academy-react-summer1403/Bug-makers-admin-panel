import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseDetail } from '../../../../@core/api/course/courseDetail';
import loading from '../../../../assets/images/svg/loading.svg';
import Product from '../../../pages/details';
import { setCourseListDetail } from '../../../../redux/Course';
import { useDispatch, useSelector } from 'react-redux';
import { CardHeader, Table } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { Book, ChevronDown, User } from 'react-feather';
import { getGroup } from '../../../../@core/api/course/getGroup';
import UsersList from '../../user/list/Table';
import CourseUser from './CourseUser';
import Active from '../../../../components/common/active/active';
import DeleteGroup from '../../../../components/common/active/deleteGroup';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isExpend, setIsExpend] = useState(false);

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

    useEffect(() => {
        if (productDetail) {
            dispatch(setCourseListDetail(productDetail));
        }
    }, [productDetail]);

    if (isLoading) {
        return <img src={loading} style={{ margin: 'auto', display: 'block', width: '80px', height: '80px' }} />;
    }

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
                    api="/CourseGroup" 
                    method="delete"
                    styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px' }} 
                    text='حذف '
                    text2='حذف شده'
              />
           )
        },
    ];
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', alignItems: 'start', gap: '30px' }}>
            {productDetail ? (
                <Product
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
        </div>
    );
};

export default CourseDetail;