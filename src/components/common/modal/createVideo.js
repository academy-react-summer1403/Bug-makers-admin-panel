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
import { Switch, Tooltip } from '@mui/material';
import { createVideo, updateVideo } from '../../../@core/api/video/videoApi';
const CreateVideo = ({row , title}) => {

  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [queryValue, setQueryValue] = useState('');
    const [selectedId, setSelectedId] = useState()
    const [teacherId, setTeacherId] = useState()
    const [groupIdSchedual, setGroupIdSchedual] = useState(null)
    console.log(groupIdSchedual);
    const [isLockSwitch, setisLockSwitch] = useState(true)
console.log(selectedId);
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  const defaultValues = row ? {
    id: row.id,
    courseId: row.courseId || selectedId,
    groupId: row.groupId || groupIdSchedual,
    videoUrl:  row.videoUrl || '',
    isLock: row.isLock  || false,
  } : {
    courseId: selectedId,
    groupId: groupIdSchedual,
    videoUrl:  '',
    isLock: '',
  }
  const queryClient = useQueryClient();

//   get data 

  const {data : course} = useQuery({
    queryKey:['getCourse', queryValue],
    queryFn: () => getCourseListWithPagination(queryValue),

  })


  const {data : getCourseWithGroup} = useQuery({
      queryKey:['getCourseWithGroupIdSchedual' ],
      queryFn: () => getCourseGroupId(schedual?.courseGroupId),
      enabled: !!row,
    })

    const {data : courseDetail } = useQuery({
        queryKey:['getCourse'],
        queryFn:() => getCourseDetail(row ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId),
        enabled: row ? !!getCourseWithGroup : !!selectedId,
      })
    
      useEffect(() => {
        if(courseDetail){
          setTeacherId(courseDetail?.teacherId)
        }
      }, [courseDetail])
      
    const {data : group} = useQuery({
    queryKey:['getGroup', row ? courseDetail?.teacherId : teacherId ,  getCourseWithGroup ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId],
    queryFn: () => getGroup(row ? courseDetail?.teacherId : teacherId ,  getCourseWithGroup ? getCourseWithGroup?.courseGroupDto?.courseId : selectedId),
    enabled: row ? !!getCourseWithGroup : !!teacherId
  })
  const validationSchema1 = Yup.object({
    videoUrl: Yup.string(),
  })
  




  const [SelectId, setSelectId] = useState(1)
  const { data : getCategoryIdData} = useQuery({
    queryKey:['categoryIdList',SelectId],
    queryFn: () => getCategoryId(SelectId),
    enabled: !!SelectId
})

const createVideoFun = useMutation({
    mutationKey:['createVideoKey'],
    mutationFn:
    row ? (
        (data) => updateVideo(data , data.id) ) : (
        (data) => createVideo(data)),
    onSuccess:() => {
        queryClient.invalidateQueries('getVideo')
    }
})



const handleSubmit1 = (values) => {
    setShow(false);
    createVideoFun.mutate(values);
    console.log(values);
  }
  

  const handleSearch = (e) => setQueryValue(e.target.value);



  return (
    <div>
        <Tooltip title='افزودن ویدیو' placement='top' >
      <Button onClick={() => setShow(true)} size="sm" color="transparent" className="cursor-pointer" style={{ border: 'none' }}>
        {title}
      </Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false} style={{ width: '500px' }}>
        <ModalHeader className="bg-transparent" toggle={() => setShow(false)}>
          مدیریت ویدیو
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema1}
            onSubmit={handleSubmit1}
            enableReinitialize={true}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                {/* Search input for course */}
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
                  <Label for="courseId">نام دوره</Label>
                  <FormSelect
                    name="courseId"
                    id="courseId"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                  >
                    <option value="">انتخاب دوره</option>
                    {course?.courseDtos?.map((item) => (
                      <option key={item.courseId} value={item.courseId}>
                        {item.title}
                      </option>
                    ))}
                  </FormSelect>
                  {errors.courseId && touched.courseId && <div className="text-danger">{errors.courseId}</div>}
                </FormGroup>

                {/* Group selection */}
                <FormGroup>
                  <Label for="groupId">گروه دوره</Label>
                  <FormSelect
                    name="groupId"
                    id="groupId"
                    value={groupIdSchedual}
                    onChange={(e) => setGroupIdSchedual(e.target.value)}
                  >
                    <option value="">انتخاب گروه</option>
                    {group?.map((item) => (
                      <option key={item.groupId} value={item.groupId}>
                        {item.groupName}
                      </option>
                    ))}
                  </FormSelect>
                  {errors.groupId && touched.groupId && <div className="text-danger">{errors.groupId}</div>}
                </FormGroup>

                {/* Video URL */}
                <FormGroup>
                  <Label for="videoUrl">آدرس ویدیو</Label>
                  <Input
                    name="videoUrl"
                    id="videoUrl"
                    onChange={handleChange}
                    value={values.videoUrl}
                  />
                  {errors.videoUrl && touched.videoUrl && <div className="text-danger">{errors.videoUrl}</div>}
                </FormGroup>

                {/* Access (Lock Switch) */}
                <FormGroup>
                  <Label for="isLock">دسترسی</Label>
                  <Switch
                    checked={values.isLock}
                    onChange={(e) => setFieldValue('isLock', e.target.checked)}
                    name="isLock"
                    id="isLock"
                  />
                  {errors.isLock && touched.isLock && <div className="text-danger">{errors.isLock}</div>}
                </FormGroup>

                <Button color="primary" type="submit">
                  {row ? 'ویرایش ویدیو' : 'افزودن ویدیو'}
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateVideo;
