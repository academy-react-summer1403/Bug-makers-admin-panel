// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import SecurityInfo from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'
import PreviewPage from './preview'


const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)
  const [cat, setCat] = useState([])


    const step = [
      {
        id: 'SecurityInfo',
        title: 'اطلاعات امنیتی',
        subtitle: 'اطلاعات خود را وارد کنید.',
        content: <SecurityInfo stepper={stepper} />
      },
      {
        id: 'Step2',
        title: 'اطلاعات هویتی',
        subtitle: 'اطلاعات هویتی را وارد کنید',
        content: <Step2 stepper={stepper} />
      },
      {
        id: 'Step3',
        title: 'اطلاعات محل سکونت',
        subtitle: 'اطلاعات محل سکونت را وارد کنید',
        content: <Step3 stepper={stepper} />
      },
      {
        id: 'Step4',
        title: 'اطلاعات جنسیتی و لینک ',
        subtitle: 'اطلاعات کلی را وارد کنید',
        content: <Step4 stepper={stepper} />
      },
      {
        id: 'Step5',
        title: 'دسترسی ها',
        subtitle: 'اطلاعات دسترسی را وارد کنید',
        content: <Step5 stepper={stepper} />
      },
      {
        id: 'PreviewPage',
        title: 'پیش نمایش اطلاعات کاربر',
        content: <PreviewPage stepper={stepper} />
      },
    //   {
    //     id: 'courseInfo',
    //     title: 'اطلاعات دوره',
    //     subtitle: 'اضافه کردن آدرس',
    //     content: <Address stepper={stepper} />
    //   },
    //   {
    //     id: 'Describe',
    //     title: 'توضیحات دوره',
    //     subtitle: 'متن خود را تایپ کنید',
    //     content: <SocialLinks stepper={stepper} />
    //   },
    //   {
    //     id: 'courseInfoDetail',
    //     title: 'جزییات دوره',
    //     subtitle: 'افزودن جزییات دوره',
    //     content: <CourseInfo stepper={stepper} />
    //   },
    //   {
    //     id: 'Preview',
    //     title: 'پیش نمایش دوره',
    //     subtitle: 'دوره خود را ببینید',
    //     content: <Preview stepper={stepper} setCat={setCat} />
    //   },
    //   {
    //     id: 'AddCategory',
    //     title: 'دسته بندی دوره',
    //     subtitle: 'دسته بندی دوره را اضافه کنید',
    //     content: <AddCategoryStep3 stepper={stepper} cat={cat} />
    //   }
    ];

  
  

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={step} />
    </div>
  )
}

export default WizardHorizontal
