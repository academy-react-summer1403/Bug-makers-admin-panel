// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'
import CourseInfo from './steps-with-validation/CourseInfo'
import Preview from './steps-with-validation/Preview'
import { useSelector } from 'react-redux'
import BlogSeo from './steps-with-validation/blogseo'
import AddCategoryStep3 from './steps-with-validation/addCategory'

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)
  const [cat, setCat] = useState([])

  console.log(cat);
  // Define steps for the wizard
  const course = useSelector((state) => state.CourseDetail.CourseList)
  // if(window.location.pathname)
  let step = [
  ];

  if (window.location.pathname === '/apps/Course/AddCourse' || window.location.pathname === '/apps/Course/editCourse') {
    step = [
      {
        id: 'uploadImage',
        title: 'افزودن عکس',
        subtitle: 'تصویر خود را انتخاب کنید.',
        content: <AccountDetails stepper={stepper} />
      },
      {
        id: 'courseInfoAll',
        title: 'مشخصات کلی دوره',
        subtitle: 'اطلاعات دوره را وارد کنید',
        content: <PersonalInfo stepper={stepper} />
      },
      {
        id: 'courseInfo',
        title: 'اطلاعات دوره',
        subtitle: 'اضافه کردن آدرس',
        content: <Address stepper={stepper} />
      },
      {
        id: 'Describe',
        title: 'توضیحات دوره',
        subtitle: 'متن خود را تایپ کنید',
        content: <SocialLinks stepper={stepper} />
      },
      {
        id: 'courseInfoDetail',
        title: 'جزییات دوره',
        subtitle: 'افزودن جزییات دوره',
        content: <CourseInfo stepper={stepper} />
      },
      {
        id: 'Preview',
        title: 'پیش نمایش دوره',
        subtitle: 'دوره خود را ببینید',
        content: <Preview stepper={stepper} setCat={setCat} />
      },
      {
        id: 'AddCategory',
        title: 'دسته بندی دوره',
        subtitle: 'دسته بندی دوره را اضافه کنید',
        content: <AddCategoryStep3 stepper={stepper} cat={cat} />
      }
    ];
  } else if(window.location.pathname === '/apps/blog/editBlog' || window.location.pathname === '/apps/blog/AddBlog') {
    step = [
      {
        id: 'uploadImage',
        title: 'افزودن عکس',
        subtitle: 'تصویر خود را انتخاب کنید.',
        content: <AccountDetails stepper={stepper} />
      },
      {
        id: 'blogInfoAll',
        title: 'مشخصات کلی مقاله',
        subtitle: 'اطلاعات دوره را وارد کنید',
        content: <PersonalInfo stepper={stepper} />
      },
      {
        id: 'blogInfoseo',
        title: 'مشخصات سیو مقاله',
        subtitle: 'اطلاعات دوره را وارد کنید',
        content: <BlogSeo stepper={stepper} />
      },
      
      {
        id: 'Describe',
        title: 'توضیحات دوره',
        subtitle: 'متن خود را تایپ کنید',
        content: <SocialLinks stepper={stepper} />
      },
      {
        id: 'Preview',
        title: 'پیش نمایش دوره',
        subtitle: 'دوره خود را ببینید',
        content: <Preview stepper={stepper} />
      }
    ];
  }
  
  

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={step} />
    </div>
  )
}

export default WizardHorizontal
