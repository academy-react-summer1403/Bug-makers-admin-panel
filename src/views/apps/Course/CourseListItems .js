import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import img2 from '../../../assets/images/icons/image.jpg';
import { Link } from 'react-router-dom';
import Active from '../../../components/common/active/active';
const CourseListItems = ({
    title,
    id,
    img,
    description,
    teacherName,
    likeCount,
    commandCount,
    courseRate,
    statusName,
    price,
    isExpire,
    date,
    isActive
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const displayDescription = isExpanded ? description : (description.split('\n').slice(0, 2).join('\n') + (description.split('\n').length > 2 ? ' ... توضیحات بیشتر' : ''));


    return (
        <Card style={{ maxHeight: '650px', width: '380px' }}>
            <Link       
                color='primary'
                to={'/apps/Detail/' + id} 
                style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 10, padding: '10px', borderRadius: '10px', background: 'purple', color: 'white' }}>
                مشاهده
            </Link>
            <Active 
                isActive={isActive} 
                id={id} 
                styled={{ minWidth: '50px' ,position: 'absolute', top: 0, cursor: 'pointer', padding: '10px' }}             
                api="/Course/ActiveAndDeactiveCourse" 
                method="put"
                text='غیر فعال'
                text2='فعال'
                />
            <span 
                style={{ 
                    minWidth: '50px', 
                    position: 'absolute', 
                    top: '270px', 
                    left: '10px', 
                    cursor: 'pointer', 
                    padding: '10px', 
                    color: isExpire ? 'red' : 'green' 
                 }} 
            >
                {isExpire === true ? 'منقضی شده' : 'جاری'}
            </span>
            <CardImg top src={img ? img : img2} style={{ width: '100%', height: '253px' }} />
            <CardBody>
                <CardTitle tag='h4'>{title ? title : 'نام پیدا نشد'}</CardTitle>
                <CardText style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={handleToggleDescription}>
                    {displayDescription}
                </CardText>
            </CardBody>
            <ListGroup flush>
                <ListGroupItem>قیمت : {price} ريال</ListGroupItem>
                <ListGroupItem>آخرین آپدیت : {date}</ListGroupItem>
                <ListGroupItem style={{ color: 'blue' }}>{statusName}</ListGroupItem>
            </ListGroup>
            <CardBody>
                <span>مدرس دوره : {teacherName ? teacherName : 'نام پیدا نشد'}</span>
            </CardBody>
        </Card>
    );
};

export default CourseListItems;
