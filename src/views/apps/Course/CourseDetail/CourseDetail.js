import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseDetail } from '../../../../@core/api/course/courseDetail';
import loading from '../../../../assets/images/svg/loading.svg'
import BlogDetails from '../../../pages/details';
import Product from '../../../pages/details';
import { setCourseListDetail } from '../../../../redux/Course';
import { useDispatch } from 'react-redux';
const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { data: productDetail, error, isLoading } = useQuery({
        queryKey : ['courseDetails', id],
        queryFn:  () => getCourseDetail(id),
        enabled: !!id, 
        onError: (error) => {
            navigate('/not-found'); 
        },
    });

    useEffect(() => {
    dispatch(setCourseListDetail(productDetail))
    }, [productDetail])
    

    if (isLoading) {
        return <img src={loading}  style={{margin: 'auto' , display: 'block' , width: '80px' , height:'80px'}} />;
    }


    return (
        <div 
            style={{display: 'flex' , 
                justifyContent:'center',
                flexFlow: 'column wrap',
                alignItems: 'start',
                gap:'30px'
                }}>
                    
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
                />
            ) : (
                <div style={{margin: 'auto' , fontSize:'30px' , fontWeight: 700}}>دوره ای پیدا نشد</div>
            )}
        </div>
    );
};

export default CourseDetail;
