import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCategoryBlog, getCategoryListBlog, updateCategoryBlog } from '../../../@core/api/blog/Category';
import { getCategoryId } from '../../../@core/api/blog/Category'; 
import { Plus } from 'react-feather';
import { Tooltip } from '@mui/material';
const CreateCategoryBlog = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const queryClient = useQueryClient();

  const validationSchema1 = Yup.object({
    CategoryName: Yup.string().required('نام دسته بندی الزامی است'),
    Image: Yup.string().required('عکس الزامی است'),
    IconAddress: Yup.string().required('آدرس ایکون الزامی است'),
    IconName: Yup.string().required('نام ایکون الزامی است'),
    GoogleTitle: Yup.string().required('تایتل گوگل الزامی است'),
    googleDescription: Yup.string().required('توضیحات گوگل الزامی است'),
  });

  const validationSchema2 = Yup.object({
    selectedCategory: Yup.string().required('لطفاً یک دسته بندی انتخاب کنید'),
    categoryName: Yup.string().required('نام دسته بندی الزامی است'),
    image: Yup.string().required('عکس الزامی است'),
    iconAddress: Yup.string().required('آدرس ایکون الزامی است'),
    iconName: Yup.string().required('نام ایکون الزامی است'),
    googleTitle: Yup.string().required('تایتل گوگل الزامی است'),
    GoogleDescription: Yup.string().required('توضیحات گوگل الزامی است'),
  });

  const { data : categoryList } = useQuery({
    queryKey:['categoryList'],
    queryFn: getCategoryListBlog
  })

  const [SelectId, setSelectId] = useState(1)
  const { data : getCategoryIdData} = useQuery({
    queryKey:['categoryIdList',SelectId],
    queryFn: () => getCategoryId(SelectId),
    enabled: !!SelectId
})

    const UpdateCategory = useMutation({
        mutationKey:['updateCat'],
        mutationFn: (formData) => updateCategoryBlog(formData),
        onSuccess: () => {
          queryClient.invalidateQueries('getCategory')
        }
    })
    const addCategory = useMutation({
        mutationKey:['createCat'],
        mutationFn: (formData) => addCategoryBlog(formData),
        onSuccess: () => {
          queryClient.invalidateQueries('getCategory')
        }
    })
  const handleSubmit2 = (values) => {
    setShow(false)
    const formData = new FormData();
    formData.append('Id', Number(getCategoryIdData.id))
    formData.append('CategoryName', values.categoryName)
    formData.append('Image', values.image || values.Image)
    formData.append('IconAddress', values.iconAddress)
    formData.append('IconName', values.iconName)
    formData.append('GoogleTitle', values.googleTitle)
    formData.append('GoogleDescribe', values.GoogleDescription)
    UpdateCategory.mutate(formData)
  }
  const handleSubmit1 = (values) => {
    setShow(false)
    const formData2 = new FormData();
    formData2.append('CategoryName', values.CategoryName)
    formData2.append('Image', values.Image)
    formData2.append('IconAddress', values.IconAddress)
    formData2.append('IconName', values.IconName)
    formData2.append('GoogleTitle', values.GoogleTitle)
    formData2.append('GoogleDescribe', values.googleDescription)
    addCategory.mutate(formData2)
  }
  return (
    <div>
      <Tooltip placement='top' title='افزودن دسته بندی' >
      <Button
        onClick={() => setShow(true)}
        className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
        color='transparent'
        style={{border:'none'}}
      >
        <Plus />
      </Button>
      </Tooltip>

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
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggleTab('1')}
                style={{ flex: activeTab === '1' ? '2' : '1' }}
              >
                افزودن دسته بندی
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggleTab('2')}
                style={{ flex: activeTab === '2' ? '2' : '1' }}
              >
                بروزرسانی دسته بندی
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Formik
                initialValues={{
                  CategoryName: '',
                  Image: '',
                  IconAddress: '',
                  IconName: '',
                  GoogleTitle: '',
                  googleDescription: '',
                }}
                validationSchema={validationSchema1}
                onSubmit={handleSubmit1}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    <FormGroup>
                      <Label for="CategoryName">نام دسته بندی</Label>
                      <Input
                        type="text"
                        name="CategoryName"
                        id="CategoryName"
                        onChange={handleChange}
                        value={values.CategoryName}
                      />
                      {errors.CategoryName && touched.CategoryName && (
                        <div className="text-danger">{errors.CategoryName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Image">عکس</Label>
                      <Input
                        type="text"
                        name="Image"
                        id="Image"
                        onChange={handleChange}
                        value={values.Image}
                      />
                      {errors.Image && touched.Image && (
                        <div className="text-danger">{errors.Image}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="IconAddress">آدرس ایکون دسته بندی</Label>
                      <Input
                        type="text"
                        name="IconAddress"
                        id="IconAddress"
                        onChange={handleChange}
                        value={values.IconAddress}
                      />
                      {errors.IconAddress && touched.IconAddress && (
                        <div className="text-danger">{errors.IconAddress}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="IconName">نام ایکون</Label>
                      <Input
                        type="text"
                        name="IconName"
                        id="IconName"
                        onChange={handleChange}
                        value={values.IconName}
                      />
                      {errors.IconName && touched.IconName && (
                        <div className="text-danger">{errors.IconName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="GoogleTitle">تایتل گوگل</Label>
                      <Input
                        type="text"
                        name="GoogleTitle"
                        id="GoogleTitle"
                        onChange={handleChange}
                        value={values.GoogleTitle}
                      />
                      {errors.GoogleTitle && touched.GoogleTitle && (
                        <div className="text-danger">{errors.GoogleTitle}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="googleDescription">توضیحات گوگل</Label>
                      <Input
                        type="text"
                        name="googleDescription"
                        id="googleDescription"
                        onChange={handleChange}
                        value={values.googleDescription}
                      />
                      {errors.googleDescription && touched.googleDescription && (
                        <div className="text-danger">{errors.googleDescription}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">افزودن</Button>
                  </Form>
                )}
              </Formik>
            </TabPane>
            <TabPane tabId="2">
              <Formik
                initialValues={{
                  selectedCategory: getCategoryIdData?.id,
                  categoryName: getCategoryIdData?.categoryName,
                  image: getCategoryIdData?.image,
                  iconAddress: getCategoryIdData?.iconAddress,
                  iconName: getCategoryIdData?.iconName,
                  googleTitle: getCategoryIdData?.googleTitle,
                  GoogleDescription: getCategoryIdData?.googleDescribe,
                }}
                validationSchema={validationSchema2}
                onSubmit={handleSubmit2}
                enableReinitialize={true} 
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    <FormGroup>
                      <Label for="selectedCategory">انتخاب دسته بندی</Label>
                      <Input
                        type="select"
                        name="selectedCategory"
                        id="selectedCategory"
                        onChange={handleChange}
                        value={values.selectedCategory}
                        
                      >
                        {categoryList?.map((item) => (
                            <option onClick={() => setSelectId(item.id)} key={item.id} value={item.id}>{item.categoryName}</option>
                        ))}
                      </Input>
                      {errors.selectedCategory && touched.selectedCategory && (
                        <div className="text-danger">{errors.selectedCategory}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="categoryName">نام دسته بندی</Label>
                      <Input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        onChange={handleChange}
                        value={values.categoryName}
                      />
                      {errors.categoryName && touched.categoryName && (
                        <div className="text-danger">{errors.categoryName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="image">عکس</Label>
                      <Input
                        type="text"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        value={values.image}
                      />
                      {errors.image && touched.image && (
                        <div className="text-danger">{errors.image}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="iconAddress">آدرس ایکون دسته بندی</Label>
                      <Input
                        type="text"
                        name="iconAddress"
                        id="iconAddress"
                        onChange={handleChange}
                        value={values.iconAddress}
                      />
                      {errors.iconAddress && touched.iconAddress && (
                        <div className="text-danger">{errors.iconAddress}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="iconName">نام ایکون</Label>
                      <Input
                        type="text"
                        name="iconName"
                        id="iconName"
                        onChange={handleChange}
                        value={values.iconName}
                      />
                      {errors.iconName && touched.iconName && (
                        <div className="text-danger">{errors.iconName}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="googleTitle">تایتل گوگل</Label>
                      <Input
                        type="text"
                        name="googleTitle"
                        id="googleTitle"
                        onChange={handleChange}
                        value={values.googleTitle}
                      />
                      {errors.googleTitle && touched.googleTitle && (
                        <div className="text-danger">{errors.googleTitle}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="GoogleDescription">توضیحات گوگل</Label>
                      <Input
                        type="text"
                        name="GoogleDescription"
                        id="GoogleDescription"
                        onChange={handleChange}
                        value={values.GoogleDescription}
                      />
                      {errors.GoogleDescription && touched.GoogleDescription && (
                        <div className="text-danger">{errors.GoogleDescription}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">بروزرسانی</Button>
                  </Form>
                )}
              </Formik>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateCategoryBlog;
