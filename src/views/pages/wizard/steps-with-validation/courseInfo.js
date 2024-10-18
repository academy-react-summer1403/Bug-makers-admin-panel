// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useQuery } from '@tanstack/react-query'
import { getAllDataCreateCourse } from '../../../../@core/api/course/getCourselevel'

const defaultValues = {
    TeacherId: '',
    CourseLvlId: '',
    ClassId:'',
    CourseTypeId:''
}

const CourseInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }


  const {data: getDataCreated } = useQuery({
    queryKey:['getDataCreated'],
    queryFn:getAllDataCreateCourse
  })

  const teacherOptions = getDataCreated?.teachers.map(teacher => ({
    value: teacher.fullName,
    label: teacher.fullName
  })) || [];

  const levelOptions = getDataCreated?.courseLevelDtos.map(level => ({
    value: level.id,
    label: level.levelName
  })) || [];

  const categoryOptions = getDataCreated?.technologyDtos.map(category => ({
    value: category.id,
    label: category.techName
  })) || [];

  const courseTypeOptions = getDataCreated?.courseTypeDtos.map(type => ({
    value: type.id,
    label: type.typeName
  })) || [];

  const TermOption = getDataCreated?.termDtos.map(type => ({
    value: type.id,
    label: type.termName
  })) || [];

  const classRoomOption = getDataCreated?.classRoomDtos.map(type => ({
    value: type.id,
    label: type.classRoomName
  })) || [];


  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Personal Info</h5>
        <small>Enter Your Personal Info.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label' for='TeacherId'>
              استاد دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TeacherId`}
              className='react-select'
              classNamePrefix='select'
              options={teacherOptions}
              defaultValue={teacherOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='CourseLvlId'>
              سطح
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseLvlId`}
              className='react-select'
              classNamePrefix='select'
              options={levelOptions}
              defaultValue={levelOptions[0]}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='language'>
              دسته بندی
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`language`}
              options={categoryOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='ClassId'>
              کلاس
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`ClassId`}
              className='react-select'
              classNamePrefix='select'
              options={classRoomOption}
              defaultValue={classRoomOption[0]}
            />
          </Col>
        </Row>
        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label' for='CourseTypeId'>
              نوع
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseTypeId`}
              className='react-select'
              classNamePrefix='select'
              options={courseTypeOptions}
              defaultValue={courseTypeOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='country'>
              ترم
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country`}
              className='react-select'
              classNamePrefix='select'
              options={TermOption}
              defaultValue={TermOption[0]}
            />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default CourseInfo
