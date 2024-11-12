// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
// import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../../../../@core/api/course/uploadImage'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'


const AccountDetails = ({ stepper }) => {
  const [preview, setPreview] = useState(null)
  const [files, setFiles] = useState([])

  const course = useSelector((state) => state.CourseDetail.CourseList)
  const defaultValues = {
    Image: course.imageAddress ? course.imageAddress : '' || course.currentImageAddressTumb ? course.currentImageAddressTumb : '',
  }

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

  const mutation = useMutation({
    mutationKey:['sendImage'],
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
      const formData = new FormData();
      formData.append('image', files[0])
      mutation.mutate(formData)
      // dispatch(setCreate(data))
    }
  }


  console.log(files);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
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
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Multiple</CardTitle>
      </CardHeader>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>فایل را وارد کنید</h5>
            <p className='text-secondary'>
              وارد کن  {' '}
              <a href='/' onClick={e => e.preventDefault()}>
                جستجو
              </a>{' '}
            </p>
          </div>
        </div>
        {files.length ? (
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
      </CardBody>
    </Card>
  )
}

export default AccountDetails
