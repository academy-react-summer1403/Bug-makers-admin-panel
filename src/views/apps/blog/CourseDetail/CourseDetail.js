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
import { getBlogDetail, getReplyCommentBlog } from '../../../../@core/api/blog/courseDetail';
import { setBlogListDetail } from '../../../../redux/blogDetail';
import BlogDetailPage from '../../../pages/blogDetail';
import EditCommentForm from '../../../../components/common/modal/editComment';
import { getComments } from '../../../../redux/comments';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isExpend, setIsExpend] = useState(false);

  const course = useSelector((state) => state.CourseDetail.CourseList)
  console.log(course);
    const { data: productDetail, isLoading, isError } = useQuery({
        queryKey: ['blogDetail', id],
        queryFn: () => getBlogDetail(id),
        enabled: !!id,
        onError: () => {
            navigate('/not-found');
        },
    });
    
    useEffect(() => {
        dispatch(setCourseListDetail(productDetail?.detailsNewsDto))
    }, [productDetail])

    const { data: Replaycomment } = useQuery({
        queryKey: ['blogDetailReplayComment', id],
        queryFn: () => getReplyCommentBlog(id),
        enabled: !!id,
        onError: () => {
            navigate('/not-found');
        },
    });

    console.log(Replaycomment);

    useEffect(() => {
        if (productDetail) {
            dispatch(setBlogListDetail(productDetail));
        }
    }, [productDetail ]);

    const blog = useSelector((state) => state.blogDetail.blogList)
console.log(blog);
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
            name: 'نام کاربر',
            selector : row => row.autor ? row.autor : 'نام وجود ندارد',

        },
        {
            name: 'تایتل',
            selector : row => row.title
        },
        {
            sortable: true,
            minWidth: '20px',
            name: 'نام کاربر',
            selector : row => row.describe,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='avatar-wrapper'>
                        <Book className='me-1' size={'20px'} />
                        <Link >{isExpend ? row.describe : `${row.describe.substring(0,20)}...`}</Link>
                        <span className='cursor-pointer' onClick={toggleExpend}>{isExpend ? 'بستن' : 'ادامه'}</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='text-truncate fw-bolder'>{row.userFullName}</span>
                    </div>
                </div>
            ),
            
        },    {
            name: 'جزییات بیشتر',
            minWidth: '20px',
            cell: row => {
              return(
              <div >
                <EditCommentForm size={'14px'} newsId={productDetail.detailsNewsDto.id} onClick={() => dispatch(getComments(row.userId))} selectedComment={row} />
            </div>              
            )}
          }

        // {
        //     name: 'شناسه گروه',
        //     selector : row => row.groupId
        // },
        // {
        //     name: 'مدرس دوره',
        //    selector : row => row.teacherName,
        //    cell : row =>(
        //         <Link onClick={handleNavigate}>{row.teacherName}</Link>
        //    )
        // },
        // {
        //     name: 'ویرایش',
        //    cell : row =>(
        //         <DeleteGroup
        //             isActive={row.isDelete}
        //             Id={row.groupId}
        //             api="/CourseGroup" 
        //             method="delete"
        //             styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px' }} 
        //             text='حذف '
        //             text2='حذف شده'
        //       />
        //    )
        // },
    ];
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', alignItems: 'start', gap: '30px' }}>
            {productDetail.detailsNewsDto ? (
                <BlogDetailPage
                    id={productDetail.detailsNewsDto.id}
                    Image={productDetail.detailsNewsDto.currentImageAddressTumb}
                    title={productDetail.detailsNewsDto.title}
                    Description={productDetail.detailsNewsDto.miniDescribe}
                    Date={productDetail.detailsNewsDto.insertDate}
                    startTime={productDetail.detailsNewsDto.updateDate}
                    // endTime={productDetail.detailsNewsDto.endTime}
                    teacherName={productDetail.detailsNewsDto.addUserFullName}
                    courseClassRoomName={productDetail.detailsNewsDto.courseClassRoomName}
                    courseTypeName={productDetail.detailsNewsDto.courseTypeName}
                    courseLevelName={productDetail.detailsNewsDto.courseLevelName}
                    courseStatusName={productDetail.detailsNewsDto.courseStatusName}
                    currentView={productDetail.detailsNewsDto.currentView}
                    cost={productDetail.detailsNewsDto.newsCatregoryName}
                    currentUserRateNumber={productDetail.detailsNewsDto.currentRate}
                    courseGroupTotal={productDetail.detailsNewsDto.courseGroupTotal}
                    courseUserTotal={productDetail.detailsNewsDto.courseUserTotal}
                    courseLikeTotal={productDetail.detailsNewsDto.currentLikeCount}
                    courseDissLikeTotal={productDetail.detailsNewsDto.currentDissLikeCount}
                    courseCommentTotal={productDetail.detailsNewsDto.courseCommentTotal}
                    isActive={productDetail.detailsNewsDto.isActive}
                    courseTeches={productDetail.detailsNewsDto.courseTeches}
                    teacherId={productDetail.detailsNewsDto.teacherId}
                    keyword={productDetail.detailsNewsDto.keyword}
                    
                />
            ) : (
                <div style={{ margin: 'auto', fontSize: '30px', fontWeight: 700 }}>دوره ای پیدا نشد</div>
            )}
            {/* <CourseUser courseId={productDetail?.courseId} /> */}
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'>کامنت های این مقاله</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        columns={columns}
                        data={productDetail.commentDtos || []} 
                        className='react-dataTable'
                        pagination
                        paginationRowsPerPageOptions={[8, 15, 30]}
                        sortIcon={<ChevronDown size={10} />
                        
                    }
                    />
                </div>
            </Card>
            <Card style={{width:'100%'}}>
                <CardHeader tag='h4'> ریپلای های این مقاله</CardHeader>
                <div className='react-dataTable user-view-account-projects'>
                    <DataTable
                        noHeader
                        responsive
                        columns={columns}
                        data={Replaycomment || []} 
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </div>
            </Card>
        </div>
    );
};

export default BlogDetail;