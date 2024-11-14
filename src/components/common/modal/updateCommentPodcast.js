import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCategoryBlog, getCategoryListBlog, updateCategoryBlog } from '../../../@core/api/blog/Category';
import { getCategoryId } from '../../../@core/api/blog/Category'; 
import { UpdatePodcastApi } from '../../../@core/api/podcast/updatePodcast';
import { FormSelect } from 'react-bootstrap';
import { getUser } from '../../../@core/api/user/getUserById';
import { getAllPodcast } from '../../../@core/api/podcast/getAllPodcast';
import { UpdatePodcastCommentApi } from '../../../@core/api/podcast/commentMng';
import { useLink } from '@nextui-org/react';


const UpdateCommentPodcast = ({selectData}) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
    const [userId, setUserId] = useState()
    const [podId, setPodId] = useState()

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const queryClient = useQueryClient();

  const validationSchema2 = Yup.object({
    Title: Yup.string().required('نام دسته بندی الزامی است'),
    Desc: Yup.string().required('عکس الزامی است'),
    UserName: Yup.string().required('نام ایکون الزامی است'),
    File: Yup.string().required('تایتل گوگل الزامی است'),
  });

  const { data : userList } = useQuery({
    queryKey:['userListData'],
    queryFn: getUser
  })
  const { data : podList } = useQuery({
    queryKey:['podListData'],
    queryFn: getAllPodcast 
  })

  console.log(podList);
  const [SelectId, setSelectId] = useState()



    const UpdatePodcastComment = useMutation({
        mutationKey:['UpdatePodcastsComment' ,  selectData?.id],
        mutationFn: (values) => UpdatePodcastCommentApi(values , selectData?.id),
        enabled: !!selectData,
        onSuccess: () => {
          queryClient.invalidateQueries('getCommentPodcast')
        }
    })
  const handleSubmit2 = (values) => {
    setShow(false)
    UpdatePodcastComment.mutate(values)
  }

  const handleModal = () => {
    setSelectId(selectData)
    setShow(true)
  }
  return (
    <div>
      <Button
        onClick={handleModal}
        className='btn-cart '
        style={{padding:'5px'}}
        color='info'
      >
         ویرایش پادکست
      </Button>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
        style={{ width: '500px' }}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}>مدیریت دسته بندی</ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
            
              <Formik
                initialValues={{
                    UserId: selectData?.UserId || userId,
                    PODId : selectData?.PODId || podId,
                  Title: selectData?.Title || '',
                  Desc: selectData?.Desc || '',
                  UserName: selectData?.UserName || '',
                  File: selectData?.File || '',
                }}
                validationSchema={validationSchema2}
                onSubmit={handleSubmit2}
                enableReinitialize={true} 
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    {selectData == null ? (
                        <>
                         <FormSelect 
                            name='PODId'
                            value={podId}
                            onChange={(e) => setPodId(e.target.value)}
                        >
                    
                        {podList?.data?.Dots?.map((item) => (
                            <option key={item.id} value={item.id} >{item.title}</option>
                            ))}
                        </FormSelect>
                         <FormSelect 
                            name='UserId'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                    
                        {userList?.listUser?.map((item) => (
                            <option key={item.id} value={item.id} >{item.fname + ' ' + item.lname}</option>
                            ))}
                        </FormSelect>
                        </>
                    ) : null}
                    <FormGroup>
                      <Label for="Title">عنوان کامنت </Label>
                      <Input
                        type="text"
                        name="Title"
                        id="Title"
                        onChange={handleChange}
                        value={values.Title}
                      />
                      {errors.Title && touched.Title && (
                        <div className="text-danger">{errors.Title}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Desc">توضیحات</Label>
                      <Input
                        type="text"
                        name="Desc"
                        id="Desc"
                        onChange={handleChange}
                        value={values.Desc}
                      />
                      {errors.Desc && touched.Desc && (
                        <div className="text-danger">{errors.Desc}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="UserName"> نام کاربری</Label>
                      <Input
                        type="text"
                        name="UserName"
                        id="UserName"
                        onChange={handleChange}
                        value={values.UserName}
                      />
                      {errors.UserName && touched.UserName && (
                        <div className="text-danger">{errors.UserName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="File">آدرس فایل</Label>
                      <Input
                        type="text"
                        name="File"
                        id="File"
                        onChange={handleChange}
                        value={values.File}
                      />
                      {errors.File && touched.File && (
                        <div className="text-danger">{errors.File}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">بروزرسانی</Button>
                  </Form>
                )}
              </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateCommentPodcast;
