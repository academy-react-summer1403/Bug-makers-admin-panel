import { Fragment } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Label, Row, Col, Button, Form } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import { useQuery } from '@tanstack/react-query'
import { getAllDataCreateCourse } from '../../../../@core/api/course/getCourselevel'
import { useDispatch, useSelector } from 'react-redux'
import { setCreate } from '../../../../redux/CreateCourse'

const defaultValues = {
    TeacherId: '',
    CourseLvlId: '',
    ClassId: '',
    CourseTypeId: '',
    TremId: '',
    Category: []
}

const CourseInfo = ({ stepper }) => {
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const existingData = useSelector((state) => state.create.createList);
    const dispatch = useDispatch();

      const onSubmit = (data) => {
          // if (Object.values(data).every(field => field.length > 0)) {
          const combinedData = {
            ...existingData,
            ...data,
          };
          dispatch(setCreate(combinedData));
          stepper.next();  
        // } else {
        //   for (const key in data) {
        //     if (data[key].length === 0) {
        //       setError(key, {
        //         type: 'manual',
        //         message: `Please enter a valid ${key}`
        //       });
        //     }
        //   }
        // }
      }


    const { data: getDataCreated } = useQuery({
        queryKey: ['getDataCreated'],
        queryFn: getAllDataCreateCourse
    })

    const teacherOptions = getDataCreated?.teachers.map(teacher => ({
        value: teacher.teacherId,
        label: teacher.fullName
    })) || []

    const levelOptions = getDataCreated?.courseLevelDtos.map(level => ({
        value: level.id,
        label: level.levelName
    })) || []

    const categoryOptions = getDataCreated?.technologyDtos.map(category => ({
        value: category.id,
        label: category.techName
    })) || []

    const courseTypeOptions = getDataCreated?.courseTypeDtos.map(type => ({
        value: type.id,
        label: type.typeName
    })) || []

    const TermOption = getDataCreated?.termDtos.map(type => ({
        value: type.id,
        label: type.termName
    })) || []

    const classRoomOption = getDataCreated?.classRoomDtos.map(type => ({
        value: type.id,
        label: type.classRoomName
    })) || []

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
                        <Controller
                            name="TeacherId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    options={teacherOptions}
                                />
                            )}
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='CourseLvlId'>
                            سطح
                        </Label>
                        <Controller
                            name="CourseLvlId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    options={levelOptions}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='Category'>
                            دسته بندی
                        </Label>
                        <Controller
                            name="Category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    isClearable={false}
                                    theme={selectThemeColors}
                                    options={categoryOptions}
                                />
                            )}
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='ClassId'>
                            کلاس
                        </Label>
                        <Controller
                            name="ClassId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    options={classRoomOption}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='CourseTypeId'>
                            نوع
                        </Label>
                        <Controller
                            name="CourseTypeId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    options={courseTypeOptions}
                                />
                            )}
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='TremId'>
                            ترم
                        </Label>
                        <Controller
                            name="TremId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    options={TermOption}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-between'>
                    <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button>
                    <Button type='submit' color='primary' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>Next</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default CourseInfo
