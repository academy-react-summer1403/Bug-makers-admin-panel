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
import { addCategory } from '../../../../@core/api/course/addCategroy'
import { useNavigate } from 'react-router-dom'

const defaultValues = {
    Category: []
}

const AddCategoryStep3 = ({ stepper , cat }) => {
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const numericTechIds = values.Category.map(item => item.value); 
        await addCategory(numericTechIds.map(techId => ({ techId })), cat); 
        navigate('/apps/Course')
    };


    const { data: getDataCreated } = useQuery({
        queryKey: ['getDataCreated'],
        queryFn: getAllDataCreateCourse
    })



    const categoryOptions = getDataCreated?.technologyDtos.map(category => ({
        value: category.id,
        label: category.techName
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
                </Row>
                <div className='d-flex justify-content-between'>
                    <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                        <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
                    </Button>
                    <Button type='submit' color='primary' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>ثبت نهایی</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default AddCategoryStep3;
