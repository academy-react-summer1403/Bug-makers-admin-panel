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

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)


  // Define steps for the wizard
  const steps = [
    {
      id: 'uploadImage',
      title: 'افزودن عکس',
      subtitle: 'تصویر خود را انتخاب کنید.',
      content: <AccountDetails stepper={stepper}  />
    },
    {
      id: 'courseInfoAll',
      title: 'مشخصات کلی دوره',
      subtitle: 'اطلاعات دوره را وارد کنید',
      content: <PersonalInfo stepper={stepper}  />
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
      content: <SocialLinks stepper={stepper}  />
    },
    {
      id: 'courseInfoDetail',
      title: 'جزییات دوره',
      subtitle: 'افزودن جزییات دوره',
      content: <CourseInfo stepper={stepper}  />
    },
    {
      id: 'Preview',
      title: 'پیش نمایش دوره',
      subtitle: 'دوره خود را ببینید',
      content: <Preview stepper={stepper}  />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
