import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, FormGroup, Label, Input } from 'reactstrap';
import { Formik,Field ,  Form } from 'formik';
import * as Yup from 'yup';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
import { withFormikDevtools } from 'formik-devtools-extension';
import { DebounceInput } from 'react-debounce-input';
import classnames from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCategoryBlog, getCategoryListBlog, updateCategoryBlog } from '../../../@core/api/blog/Category';
import { getCategoryId } from '../../../@core/api/blog/Category'; 
import { FormSelect } from 'react-bootstrap';
import { getCourseListWithPagination } from '../../../@core/api/course/getCourseListWithPagination';
import SearchBox from './SearchBox/SearchBox';
import { getGroup } from '../../../@core/api/course/getGroup';
import { getCourseDetail } from '../../../@core/api/course/courseDetail';
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { AddSchedualAtomatic, AddSchedualSingle, UpdateSchedual } from '../../../@core/api/Schedual/schedual';
import { getCourseGroupId } from '../../../@core/api/course/getCourseWithGroupId';
import { Switch } from '@mui/material';
const CreateSchedual = ({schedual}) => {

  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [queryValue, setQueryValue] = useState('');
    const [selectedId, setSelectedId] = useState()
    const [teacherId, setTeacherId] = useState()
    const [groupIdSchedual, setGroupIdSchedual] = useState(null)
    const [showDate, setShowDate] = useState(false)
    const [formingSwitch, setformingSwitch] = useState(true)
    const [locktoRiseSwitch, setLocktoRiseSwitch] = useState(true)

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const queryClient = useQueryClient();

//   get data 

  const {data : course} = useQuery({
    queryKey:['getCourse', queryValue],
    queryFn: () => getCourseListWithPagination(queryValue)
  })


  const {data : getCourseWithGroup} = useQuery({
      queryKey:['getCourseWithGroupIdSchedual' ],
      queryFn: () => getCourseGroupId(schedual?.courseGroupId),
      enabled: !!schedual,
    })

    const {data : courseDetail } = useQuery({
        queryKey:['getCourse'],
        queryFn:() => getCourseDetail(schedual ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId),
        enabled: schedual ? !!getCourseWithGroup : !!selectedId,
      })
    
      useEffect(() => {
        if(courseDetail){
          setTeacherId(courseDetail?.teacherId)
        }
      }, [courseDetail])
      
    const {data : group} = useQuery({
    queryKey:['getGroup', schedual ? courseDetail?.teacherId : teacherId ,  getCourseWithGroup ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId],
    queryFn: () => getGroup(schedual ? courseDetail?.teacherId : teacherId ,  getCourseWithGroup ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId),
    enabled: schedual ? !!getCourseWithGroup : !!teacherId
  })
  const validationSchema1 = Yup.object({
    courseGroupId: Yup.string().required('گروه دوره الزامی است'),
    startTime: Yup.number().required('ساعت شروع الزامی است').min(1 , 'حداقل کاراکتر 1 است'),
    endTime: Yup.number().required('ساعت پایان الزامی است').max(24 , 'حداقل کاراکتر 24 است'),
    weekNumber: Yup.number().required('تعداد کلاس در هفته الزامی است'),
    rowEffect: Yup.number().required('تعداد کل کلاس الزامی است'),
    // forming: schedual ? Yup.boolean().required('حالت دوره الرامی است')  :  Yup.boolean().notRequired,
    // locktoRise:  schedual ?  Yup.boolean().required('وضعیت حضور و غیاب الرامی است') : Yup.boolean().notRequired ,
  })
  




  const [SelectId, setSelectId] = useState(1)
  const { data : getCategoryIdData} = useQuery({
    queryKey:['categoryIdList',SelectId],
    queryFn: () => getCategoryId(SelectId),
    enabled: !!SelectId
})

const AtomaticMutation = useMutation({
    mutationKey:['AtomaticsSchedual'],
    mutationFn:
    schedual ? (
        (data) => UpdateSchedual(data , courseDetail?.courseId) ) : (
        (data) => AddSchedualAtomatic(data , selectedId))
})
const SingleMutation = useMutation({
    mutationKey:['singleSchedual'],
    mutationFn: (data) => AddSchedualSingle(data , selectedId)
})


  const handleSubmit1 = (values) => {
    setShow(false)
    AtomaticMutation.mutate(values)
    console.log(values);
  }
  const handleSubmit2 = (values) => {
    setShow(false)
    SingleMutation.mutate(values)
  }

  console.log(schedual);
  const handleSearch = (e) => setQueryValue(e.target.value);


  return (
    <div>
      <Button
        onClick={() => setShow(true)}
        size='sm'
        color='info'
        className=' cursor-pointer'  style={{marginTop: '2px', padding:'5px 5px', fontSize:'10px'}}
      >
        بازه زمانی
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
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggleTab('1')}
                style={{ flex: activeTab === '1' ? '2' : '1' }}
              >
                {schedual ? 'ویرایش بازه زمانی ' : 'افزودن  بازه زمانی اتوماتیک'}
              </NavLink>
            </NavItem>
            {schedual == null ? (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggleTab('2')}
                style={{ flex: activeTab === '2' ? '2' : '1' }}
              >
                افزودن  بازه زمانی دستی
              </NavLink>
            </NavItem>
            ) : null}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <Formik
            initialValues={ schedual ? ({
                courseGroupId: Number(groupIdSchedual) || '', 
                startDate: schedual ? schedual.startDate : '',
                startTime: schedual ? schedual.startTime : '',
                endTime: schedual ? schedual.endTime : '',
                weekNumber: schedual ? schedual.weekNumber : '',
                rowEffect: schedual ? schedual.startDate : '',
                forming:  schedual ? schedual.forming : true,
                locktoRise:  schedual ? schedual.locktoRise : true,
            }) : {
                courseGroupId: Number(groupIdSchedual) || '', 
                startDate: '',
                startTime: '',
                endTime: '',
                weekNumber: '',
                rowEffect:'',
            }
            }
            validationSchema={validationSchema1}
            onSubmit={handleSubmit1}
            enableReinitialize={true}
            >
                  {(formikProps) => {
                    withFormikDevtools(formikProps);
                    const {
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        isSubmitting,
                      } = formikProps;
                return (
                  <Form>
                    <FormGroup>
                    <DebounceInput
                        debounceTimeout={700}
                        value={queryValue}
                        onChange={handleSearch}
                        placeholder="نام دوره ..."
                        style={{
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        outline: 'none',
                        width: '100%',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                      <Label for="CourseName">نام دوره </Label>
                      <FormSelect
                        name="CourseName"
                        id="CourseName"
                        value={schedual ? getCourseWithGroup?.courseGroupDto?.courseName : selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                      >
                        {course?.courseDtos?.map((item) => (
                            <option key={item.courseId} value={item.courseId} >{schedual ? getCourseWithGroup?.courseGroupDto?.courseName: item.title}</option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Image">گروه دوره'</Label>
                      <FormSelect
                        name="courseGroupId"
                        id="courseGroupId"
                        value={groupIdSchedual}
                        onChange={(e) => setGroupIdSchedual(e.target.value)}
                      >
                        {/* <option >{group ? null : 'این دوره گروهی ندارد'}</option> */}
                        {group?.map((item) => (
                            <option key={item.groupId} value={item.groupId} >{item.groupName}</option>
                        ))}
                        {errors.courseGroupId && touched.courseGroupId && (
                        <div className="text-danger">{errors.courseGroupId}</div>
                      )}
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                    <label htmlFor="startDate">محدوده تاریخ</label>
                        <Field name="startDate">
                        {({ field }) => (
                            <Flatpickr
                            {...field}
                            className={`form-control ${touched.startDate && errors.startDate ? 'is-invalid' : ''}`}
                            options={{
                                dateFormat: 'Y-m-d',
                            }}
                            value={values.startDate}
                            onChange={(date) => setFieldValue('startDate', date[0].toISOString())} // تنظیم مقدار در Formik
                            />
                        )}
                        </Field>
                        </FormGroup>
                    <FormGroup>
                      <Label for="startTime">ساعت شروع</Label>
                      <Input
                        type="number"
                        name="startTime"
                        id="startTime"
                        onChange={handleChange}
                        value={values.startTime}
                      />
                    {errors.startTime && touched.startTime && (
                        <div className="text-danger">{errors.startTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="endTime">ساعت پایان</Label>
                      <Input
                        type="number"
                        name="endTime"
                        id="endTime"
                        onChange={handleChange}
                        value={values.endTime}
                      />
                    {errors.endTime && touched.endTime && (
                        <div className="text-danger">{errors.endTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="weekNumber">تعداد برگذاری کلاس در هفته</Label>
                      <Input
                        type="number"
                        name="weekNumber"
                        id="weekNumber"
                        onChange={handleChange}
                        value={values.weekNumber}
                      />
                    {errors.weekNumber && touched.weekNumber && (
                        <div className="text-danger">{errors.weekNumber}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="rowEffect">تعداد برگذاری کل کلاس  </Label>
                      <Input
                        type="number"
                        name="rowEffect"
                        id="rowEffect"
                        onChange={handleChange}
                        value={values.rowEffect}
                      />
                        {errors.rowEffect && touched.rowEffect && (
                        <div className="text-danger">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    {schedual ? (
                        <>
                    <FormGroup>
                      <Label for="rowEffect">حالت برگذاری کلاس</Label>
                      <Switch
                        value={formingSwitch}
                        name='forming'
                        id='forming'
                        onChange={(e) => setFieldValue('forming', e.target.checked)}
                        />
                        {errors.rowEffect && touched.rowEffect && (
                        <div className="text-danger">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="rowEffect">وضعیت حضور غیاب</Label>
                      <Switch
                        value={locktoRiseSwitch}
                        name='locktoRise'
                        id='locktoRise'
                        onChange={(e) => setFieldValue('locktoRise', e.target.checked)}
                        />
                        {errors.rowEffect && touched.rowEffect && (
                        <div className="text-danger">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    </>
                    ) : null}
                    <Button color="primary" type="submit">افزودن</Button>
                  </Form>
                );}}
              </Formik>
            </TabPane>
            {schedual == null ? (
            <TabPane tabId="2">
            <Formik
            initialValues={{
                courseGroupId: Number(groupIdSchedual) || '', 
                startDate: '',
                startTime: '',
                endTime: '',
                weekNumber: '',
                rowEffect: '',
            }}
            validationSchema={validationSchema1}
            onSubmit={handleSubmit2}
            enableReinitialize={true}
            >
                  {(formikProps) => {
                    withFormikDevtools(formikProps);
                    const {
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        isSubmitting,
                      } = formikProps;
                return (
                  <Form>
                    <FormGroup>
                    <DebounceInput
                        debounceTimeout={700}
                        value={queryValue}
                        onChange={handleSearch}
                        placeholder="نام دوره ..."
                        style={{
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        outline: 'none',
                        width: '100%',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                      <Label for="CourseName">نام دوره </Label>
                      <FormSelect
                        name="CourseName"
                        id="CourseName"
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                      >
                        {course?.courseDtos?.map((item) => (
                            <option key={item.courseId} value={item.courseId} >{item.title}</option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Image">گروه دوره'</Label>
                      <FormSelect
                        name="courseGroupId"
                        id="courseGroupId"
                        value={groupIdSchedual}
                        onChange={(e) => setGroupIdSchedual(e.target.value)}
                      >
                        <option >{group ? null : 'این دوره گروهی ندارد'}</option>
                        {group?.map((item) => (
                            <option key={item.groupId} value={item.groupId} >{item.groupName}</option>
                        ))}
                        {errors.courseGroupId && touched.courseGroupId && (
                        <div className="text-danger">{errors.courseGroupId}</div>
                      )}
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                    <label htmlFor="startDate">محدوده تاریخ</label>
                        <Field name="startDate">
                        {({ field }) => (
                            <Flatpickr
                            {...field}
                            className={`form-control ${touched.startDate && errors.startDate ? 'is-invalid' : ''}`}
                            options={{
                                dateFormat: 'Y-m-d',
                            }}
                            value={values.startDate}
                            onChange={(date) => setFieldValue('startDate', date[0].toISOString())} // تنظیم مقدار در Formik
                            />
                        )}
                        </Field>
                        </FormGroup>
                    <FormGroup>
                      <Label for="startTime">ساعت شروع</Label>
                      <Input
                        type="number"
                        name="startTime"
                        id="startTime"
                        onChange={handleChange}
                        value={values.startTime}
                      />
                    {errors.startTime && touched.startTime && (
                        <div className="text-danger">{errors.startTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="endTime">ساعت پایان</Label>
                      <Input
                        type="number"
                        name="endTime"
                        id="endTime"
                        onChange={handleChange}
                        value={values.endTime}
                      />
                    {errors.endTime && touched.endTime && (
                        <div className="text-danger">{errors.endTime}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="weekNumber">تعداد برگذاری کلاس در هفته</Label>
                      <Input
                        type="number"
                        name="weekNumber"
                        id="weekNumber"
                        onChange={handleChange}
                        value={values.weekNumber}
                      />
                    {errors.weekNumber && touched.weekNumber && (
                        <div className="text-danger">{errors.weekNumber}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="rowEffect">تعداد برگذاری کل کلاس  </Label>
                      <Input
                        type="number"
                        name="rowEffect"
                        id="rowEffect"
                        onChange={handleChange}
                        value={values.rowEffect}
                      />
                        {errors.rowEffect && touched.rowEffect && (
                        <div className="text-danger">{errors.rowEffect}</div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">افزودن</Button>
                  </Form>
                );}}
              </Formik>
            </TabPane>
            ) : null}
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateSchedual;
