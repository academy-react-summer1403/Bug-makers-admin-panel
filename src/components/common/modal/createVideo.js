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
import { createVideo } from '../../../@core/api/video/videoApi';
import toast from 'react-hot-toast';
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


  const defaultValues =  {
    courseId: selectedId,
    groups:[]
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
    


const createVideoFun = useMutation({
    mutationKey:['createGroupKey'],
    mutationFn:(data) => createVideo(data),
    onSuccess:() => {
        queryClient.invalidateQueries('getVideo')
        toast.success('گروه اضافه شد')
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
        <Tooltip title='افزودن گروه' placement='top' >
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
