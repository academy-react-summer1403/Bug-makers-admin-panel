import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { updateUser } from '../../../@core/api/user/getUserById'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useNavigate } from 'react-router-dom'

const PreviewPage = ({ stepper }) => {
  // دریافت داده‌های ویرایش شده از Redux
  const edit = useSelector(state => state.editUser.EditList)
  const user = useSelector(state => state.user.selectUser)
    const navigate = useNavigate()
  const handleSubmit = useMutation({
    mutationKey:['sendUserData'],
    mutationFn: (data) => updateUser(data),
    onSuccess:() => {
        navigate('/apps/user/list')
    }
  })

  const data ={
    id: user.id || null, 
    fName: edit.fName || null,
    lName: edit.lName || null,
    userName: edit.userName || null,
    gmail: edit.gmail || null,
    phoneNumber: edit.phoneNumber || null,
    active: user.active ? true : false,
    isDelete: user.isDelete || false,
    isTecher: edit.isTecher || false,
    isStudent: edit.isStudent || false,
    twoStepAuth: edit.twoStepAuth || false,
    recoveryEmail: edit.recoveryEmail || null,
    userAbout: edit.userAbout || null,
    telegramLink: edit.telegramLink || null,
    homeAdderess: edit.homeAdderess || null,
    nationalCode: edit.nationalCode || null,
    gender: edit.gender ,
    latitude: edit.latitude || null,
    longitude: edit.longitude || null,
    insertDate: user.insertDate || new Date(),
    birthDay: edit.birthDay || null,
    currentPictureAddress: edit.currentPictureAddress || null,
    linkdinProfile: edit.linkdinProfile || null,
    roles: edit.roles || []
  }
  return (
    <div className="content-header">
      <h5 className="mb-0">پیش‌نمایش اطلاعات کاربر</h5>
      
      <Row>
        {/* عکس پروفایل */}
        <Col md="3">
          <Card>
            <img src={edit?.currentPictureAddress} alt="Profile" className="img-fluid" />
          </Card>
        </Col>

        {/* اطلاعات کاربر */}
        <Col md="9">
          <Card>
            <CardBody>
              <CardTitle tag="h5">{`${edit?.fName} ${edit?.lName}`}</CardTitle>

              <Row>
                <Col md="6">
                  <CardText><strong>نام کاربری: </strong>{edit?.userName}</CardText>
                  <CardText><strong>کد ملی: </strong>{edit?.nationalCode}</CardText>
                  <CardText><strong>تاریخ تولد: </strong>{new Date(edit?.birthDay).toLocaleDateString()}</CardText>
                  <CardText><strong>جنسیت: </strong>{edit?.gender ? "مرد" : "زن"}</CardText>
                  <CardText><strong>آدرس ایمیل: </strong>{edit?.gmail}</CardText>
                  <CardText><strong>شماره تلفن: </strong>{edit?.phoneNumber}</CardText>
                </Col>

                <Col md="6">
                  <CardText><strong>آدرس خانه: </strong>{edit?.homeAdderess}</CardText>
                  <CardText><strong>لینک پروفایل لینکدین: </strong><a href={edit?.linkdinProfile} target="_blank" rel="noopener noreferrer">{edit?.linkdinProfile}</a></CardText>
                  <CardText><strong>لینک تلگرام: </strong><a href={edit?.telegramLink} target="_blank" rel="noopener noreferrer">{edit?.telegramLink}</a></CardText>
                  <CardText><strong>وضعیت تایید دو مرحله‌ای: </strong>{edit?.twoStepAuth ? "فعال" : "غیرفعال"}</CardText>
                  <CardText><strong>درباره کاربر: </strong>{edit?.userAbout}</CardText>

                  {/* نمایش نقش‌ها */}
                  <CardText><strong>نقش‌ها: </strong>
                    {edit?.roles?.map(role => role.roleName).join(', ')}
                  </CardText>
                </Col>
              </Row>
              <div className='d-flex mt-1 justify-content-between'>
              <Button
                type='button'
                color='primary'
                className='btn-prev'
                onClick={() => stepper.previous()}
              >
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
              </Button>
              <Button onClick={() => handleSubmit.mutate(data)} color='success' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>تایید اطلاعات</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
              </Button>
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PreviewPage
