// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../../../../@core/api/course/uploadImage'
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import classnames from 'classnames'
import { CreateImg } from '../../../../@core/api/imgGenerator/imgGenerator'
import { ThreeDots } from 'react-loader-spinner'
import { Skeleton } from '@mui/material'

const AccountDetails = ({ stepper }) => {
  const [preview, setPreview] = useState(null)
  const [files, setFiles] = useState([])
  const [inputText, setInputText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('1')  // state برای کنترل تب فعال

  const course = useSelector((state) => state.CourseDetail.CourseList)
  
  // بررسی برای مقداردهی پیش‌نمایش
  const defaultValues = {
    Image: course.imageAddress ? course.imageAddress : '' || course.currentImageAddressTumb ? course.currentImageAddressTumb : '',
  }

  // مقدار دهی اولیه به preview
  useEffect(() => {
    if (course.imageAddress || course.currentImageAddressTumb) {
      setPreview(course.imageAddress || course.currentImageAddressTumb)
    }
  }, [course]);

  const SignupSchema = yup.object().shape({
    Image: yup.mixed().required('عکس دوره الزامیست'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  })

  // img generator
  const ImgGenerator = useMutation({
    mutationKey:['generateImg'],
    mutationFn: (imgData) => CreateImg(imgData),
  })

  const sendImgToApi = () => {
    setShowPreview(true)
    const imgData = {
      "prompt": inputText,
      "seed": 17123564234,
      "scheduler": "DDIM",
      "num_inference_steps": 20,
      "negative_prompt": "NONE",
      "samples": 1,
      "guidance_scale": 7.5,
      "strength": 1,
      "shape": 512
    }
    
    ImgGenerator.mutate(imgData)
  }
  
  const mutation = useMutation({
    mutationKey: ['sendImage'],
    mutationFn: (formData) => uploadImage(formData),
    onSuccess: (data) => {
      const urlMatch = data.link;
      const imageUrl = urlMatch;
      if (imageUrl) {
        dispatch(setCreate({ imageUrl }));
      }
    }
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    
    if (isObjEmpty(errors)) {
      stepper.next()
      
      const imageToUpload = preview || (course.imageAddress || course.currentImageAddressTumb); 
      if (imageToUpload) {
        dispatch(setCreate({ imageUrl: imageToUpload }));
      }
      
      if (files.length > 0 || showPreview) {
        const formData = new FormData();
        formData.append('image', files[0] || showPreview);
        mutation.mutate(formData);
      }
    }
  }
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      setPreview(URL.createObjectURL(acceptedFiles[0]))  // به‌روز کردن پیش‌نمایش با فایل جدید
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
    if (filtered.length === 0) {
      setPreview(null)  // اگر فایلی حذف شد، پیش‌نمایش را خالی کنید
    }
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
    setPreview(null)  // وقتی همه فایل‌ها حذف شدند، پیش‌نمایش را هم حذف کنید
  }

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Multiple</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Navigation Tab */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggleTab('1') }}
            >
               آپلود عکس
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggleTab('2') }}
            >
              Ai
            </NavLink>
          </NavItem>
        </Nav>

        {/* Tab Content */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <DownloadCloud size={64} />
                <h5>فایل را وارد کنید</h5>
                <p className='text-secondary'>
                  وارد کن {' '}
                  <a href='/' onClick={e => e.preventDefault()}>
                    جستجو
                  </a>{' '}
                </p>
              </div>
            </div>
            {preview ? (
              <div className="preview-container mb-3">
                <h6>پیش‌نمایش تصویر</h6>
                <img src={preview} alt="Preview" className="img-fluid" style={{ maxWidth: '100%' }} />
              </div>
            ) : null}
            {files.length || preview ? (
              <Fragment>
                <ListGroup className='my-2'>{fileList}</ListGroup>
                <div className='d-flex justify-content-end'>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    حذف همه
                  </Button>
                  <Button color='primary' onClick={onSubmit}>آپلود فایل</Button>
                </div>
              </Fragment>
            ) : null}
          </TabPane>
          <TabPane tabId="2">
  {/* Input Text and Button */}
  <div className="input-container mb-3">
    <input
      type="text"
      id="text-input"
      className="form-control"
      placeholder="متن خود را وارد کنید"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    />
    <Button
      color="primary"
      onClick={sendImgToApi}
      className="mt-2 ms-2"
    >
      ساخت تصویر
    </Button>
  </div>


  {/* Show Image Preview */}
  {showPreview && (
    <div className="image-preview mt-3 w-100 d-flex justify-content-center gap-1" style={{flexFlow:'column wrap'}}>
      <h6>{ImgGenerator.data ? 'پیش نمایش تصویر' : 'در حال ساخت تصویر'}</h6>
      {ImgGenerator.data ? (
      <img src={ImgGenerator.data} loading='lazy' className="img-fluid"  />
    ) : <Skeleton variant="rectangular" width={1300} height={850} />  }
    </div>
  )}
    <div className='d-flex justify-content-end'>
        <Button color='primary' onClick={onSubmit}>آپلود فایل</Button>
    </div>
</TabPane>


        </TabContent>
      </CardBody>
    </Card>
  )
}

export default AccountDetails
