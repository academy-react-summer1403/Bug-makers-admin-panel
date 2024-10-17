// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram, ThumbsUp, MessageCircle, User, CreditCard, X } from 'react-feather'
import moment from 'moment-jalaali';
import image from '../../../assets/images/icons/image.jpg'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import Active from '../../../components/common/active/active';
import AddGroupCourse from '../../../components/common/modal/AddGroup';
import AddCategory from '../../../components/common/modal/addCategory';

const Product = props => {
  // ** Props
  const {   
    id,
    Image,
    title,
    Description,
    Date,
    startTime,
    endTime,
    teacherName,
    courseClassRoomName,
    courseTypeName,
    courseLevelName,
    courseStatusName,
    paymentDoneTotal,
    cost,
    paymentNotDoneTotal,
    courseGroupTotal,
    courseUserTotal,
    courseLikeTotal,
    courseCommentTotal,
    isActive,
    courseTeches, 
  } = props

  // ** State
  const [selectedColor, setSelectedColor] = useState('primary')

  // ** Handle Wishlist item toggle
  const handleWishlist = val => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getProduct(productId))
  }

  const useDate = (date) => {
    if(!date) return 'تاریخ  وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD'); 
  }
  
  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={Image ? Image : image}  />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{title}</h4>
        <CardText tag='span' className='item-company'>
          استاد دوره : 
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {teacherName}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price me-1'>{cost} ريال</h4>
        </div>
        <CardText>
         وضعیت : <span className={` ms-25 ${isActive ? 'text-success' : 'text-danger'} `}>{isActive ? 'فعال' : 'غیرفعال'} </span>
        </CardText>
        <CardText>{Description}</CardText>
        <ul className='product-features list-unstyled d-flex align-items-center gap-2'>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{courseLikeTotal}</span>
              <ThumbsUp size={'15px'} />
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{courseCommentTotal}</span>
              <MessageCircle size={'15px'} />
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{courseUserTotal}</span>
              <User size={'15px'} />
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{paymentDoneTotal}</span>
              <CreditCard size={'15px'} />
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{paymentNotDoneTotal}</span>
              <CreditCard color='red' size={'15px'} />
            </div>
        </ul>
        <hr />
        <ul className='product-features list-unstyled d-flex  align-items-start  gap-4'>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>{courseClassRoomName}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> تعداد گروه : {courseGroupTotal}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> تایپ دوره : {courseTypeName}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> لول دوره : {courseLevelName}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> وضعیت دوره : {courseStatusName}</span>
            </div>
          </ul>
        <hr />
        <ul className='product-features list-unstyled d-flex  align-items-start  gap-4'>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span>تاریخ : {useDate(Date)}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> تاریخ شروع دوره : {useDate(startTime)}</span>
            </div>
            <div className="d-flex  align-items-center flex-nowrap" style={{gap: '5px'}}>
              <span> تاریخ پایان دوره : {useDate(endTime)}</span>
            </div>
          </ul>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <AddCategory uuid={id} />
          <AddGroupCourse />

          <Active 
            isActive={false}
            id={id} 
            api="/Course/DeleteCourse" 
            method="delete"
            styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px' }} 
            text='حذف دوره'
            text2='افزودن به دورها'
          />
          <Active 
            isActive={isActive} 
            id={id} 
            api="/Course/ActiveAndDeactiveCourse" 
            method="put"
            styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px', marginRight: '10px' }} 
            text='غیر فعال'
            text2='فعال'
          />
          <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
    </Row>
  )
}

export default Product