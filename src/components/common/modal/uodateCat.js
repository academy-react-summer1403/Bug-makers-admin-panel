import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCategoryBlog, getCategoryListBlog, updateCategoryBlog } from '../../../@core/api/blog/Category';
import { getCategoryId } from '../../../@core/api/blog/Category'; 


const UpdateCat = ({selectData , title}) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const queryClient = useQueryClient();

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

  const [SelectId, setSelectId] = useState()
  const { data : getCategoryIdData} = useQuery({
    queryKey:['categoryIdList',SelectId],
    queryFn: () => getCategoryId(SelectId),
    enabled: !!SelectId
})

console.log(getCategoryIdData);

    const UpdateCategory = useMutation({
        mutationKey:['updateCategoryes'],
        mutationFn: (formData) => updateCategoryBlog(formData),
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

  const handleModal = () => {
    setSelectId(selectData)
    setShow(true)
  }
  return (
    <div>
      <Button
        onClick={handleModal}
        className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
        color='transparent'
        style={{border:'none'}}
      >
         {title}
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateCat;
