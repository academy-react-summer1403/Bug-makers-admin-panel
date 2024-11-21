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
import { uploadImage } from '../../../@core/api/course/uploadImage';
import { Tooltip } from '@mui/material';
import { Plus } from 'react-feather';


const UpdatePodcast = ({selectData}) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  const queryClient = useQueryClient();
  const { data : userList } = useQuery({
    queryKey:['categoryList'],
    queryFn: getUser 
  })
  const validationSchema = Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    Desc: Yup.string().required('توضیحات الزامی است'),
    miniDesc: Yup.string().required('توضیحات کوتاه الزامی است'),
    FileLink: Yup.string().required('آدرس فایل الزامی است'),
    imageLink: Yup.string().required('آدرس تصویر الزامی است'),
  });

  const uploadFileMutation = useMutation({
    mutationKey:['uploadFile'],
    mutationFn:(formData) => uploadImage(formData),
    onSuccess: (data) => {
      // وقتی فایل با موفقیت آپلود شد، لینک آن را در فیلد مربوطه قرار می‌دهیم
      if (data && data?.link) {
        if (selectedFile) {
          setSelectedFile(data.link); // لینک فایل
        } else if(selectedImage) {
          setSelectedImage(data.link); // لینک تصویر
        }
      }
    },
  });

  const updatePodcastMutation = useMutation({
    mutationKey: ['UpdatePodcast', selectData?.id],
    mutationFn: (values) => UpdatePodcastApi(values, selectData?.id),
    onSuccess: () => {
      queryClient.invalidateQueries('getAllPodcast');
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(e.target.files[0])
    const formData = new FormData()
    formData.append('image' , file)
    if (file) {
      uploadFileMutation.mutate(formData); // آپلود فایل
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(e.target.files[0])
    const formData = new FormData()
    formData.append('image' , image)
    if (image) {
      uploadFileMutation.mutate(formData); // آپلود تصویر
    }
  };

  const handleSubmit = (values) => {
    setShow(false);
    updatePodcastMutation.mutate(values);
  };

  const handleModal = () => {
    setShow(true);
  };
  return (
    <div>
      <Tooltip placement='top' title='افزودن پادکست' >
      <Button
        onClick={handleModal}
        color='transparent'
        style={{border:'none'}}
        size='sm'
      >
         {selectData ? 'ویرایش' : <Plus />}
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
            
              <Formik
                initialValues={{
                    creator: selectData?.creator || userId,
                  title: selectData?.title ||  '',
                  Desc: selectData?.Desc || '',
                  miniDesc: selectData?.miniDesc ||  '',
                  FileLink: selectData?.FileLink || selectedFile,
                  Category: selectData?.Category || '',
                  imageLink: selectData?.imageLink || selectedImage,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true} 
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    {selectData == null ? (
                         <FormSelect 
                            name='creator'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                    
                        {userList?.listUser.map((item) => (
                            <option key={item.id} value={item.name} >{item.fname + ' ' + item.lname}</option>
                            ))}
                        </FormSelect>
                    ) : null}
                    <FormGroup>
                      <Label for="title">عنوان پادکست </Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={values.title}
                      />
                      {errors.title && touched.title && (
                        <div className="text-danger">{errors.title}</div>
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
                      <Label for="miniDesc">توضیحات کوتاه</Label>
                      <Input
                        type="text"
                        name="miniDesc"
                        id="miniDesc"
                        onChange={handleChange}
                        value={values.miniDesc}
                      />
                      {errors.miniDesc && touched.miniDesc && (
                        <div className="text-danger">{errors.miniDesc}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                  <Label for="FileLink">آدرس فایل</Label>
                  <Input
                    type="file"
                    name="FileLink"
                    onChange={handleFileChange}
                    accept="audio/*" 
                  />
                {selectedFile && <div>فایل آپلود شده: {selectedFile.name}</div>}
                  {errors.FileLink && touched.FileLink && (
                    <div className="text-danger">{errors.FileLink}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="imageLink">آدرس تصویر</Label>
                  <Input
                    type="file"
                    name="imageLink"
                    onChange={handleImageChange}
                    accept="image/*" 
                  />
                {selectedImage && <div>تصویر آپلود شده: {selectedImage.name}</div>}
                  {errors.imageLink && touched.imageLink && (
                    <div className="text-danger">{errors.imageLink}</div>
                  )}
                </FormGroup>
                    <FormGroup>
                      <Label for="Category">نام دسته بندی </Label>
                      <Input
                        type="text"
                        name="Category"
                        id="Category"
                        onChange={handleChange}
                        value={values.Category}
                      />
                      {errors.Category && touched.Category && (
                        <div className="text-danger">{errors.Category}</div>
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

export default UpdatePodcast;