import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, ListGroup, ListGroupItem } from 'react-bootstrap';
import img2 from '../../../assets/images/icons/image.jpg';
import { MessageCircle, Star, ThumbsUp, User } from 'react-feather';

const CourseListItems = ({
    title,
    courseId,
    img,
    description,
    technologyList,
    teacherName,
    likeCount,
    commandCount,
    courseRate,
    statusName,
    price,
    currentRegistrants,
    date,
    listStyle
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const displayDescription = isExpanded ? description : (description.split('\n').slice(0, 2).join('\n') + (description.split('\n').length > 2 ? ' ... توضیحات بیشتر' : ''));

    return (
        <Card style={{ maxHeight: '650px', width: '380px' }}>
            <CardImg top src={img ? img : img2} style={{width : '100%' , height: '253px'}}/>
            <CardBody>
                <CardTitle tag='h4'>{title ? title : 'نام پیدا نشد'}</CardTitle>
                <CardText style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={handleToggleDescription}>
                    {displayDescription}
                </CardText>
            </CardBody>
            <ListGroup flush>
                <ListGroupItem>قیمت : {price} ريال</ListGroupItem>
                <ListGroupItem>آخرین آپدیت : {date}</ListGroupItem>
                <ListGroupItem style={{color : 'blue'}}>{statusName}</ListGroupItem>
            </ListGroup>
            <CardBody>
                <span>مدرس دوره : {teacherName ? teacherName : 'نام پیدا نشد'}</span>
            </CardBody>
            <CardBody className='d-flex align-items-center' style={{gap : '40px' , justifyContent: 'center'}}>
                <div className='d-flex align-items-center ' style={{gap:'5px'}}>
                    <span>{likeCount}</span>
                    <ThumbsUp size={'18px'} />
                </div>
                <div className='d-flex align-items-center ' style={{gap:'5px'}}>
                    <span>{commandCount}</span>
                    <MessageCircle size={'18px'} />
                </div>
                <div className='d-flex align-items-center ' style={{gap:'5px'}}>
                    <span>{courseRate}</span>
                    <Star size={'18px'} />
                </div>
                <div className='d-flex align-items-center ' style={{gap:'5px'}}>
                    <span>{currentRegistrants}</span>
                    <User size={'18px'} />
                </div>
            </CardBody>
        </Card>
    );
};

export default CourseListItems;