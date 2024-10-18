import { useRef, useState } from 'react';
import Wizard from '@components/wizard';
import Address from './steps-with-validation/Address';
import SocialLinks from './steps-with-validation/SocialLinks';
import PersonalInfo from './steps-with-validation/PersonalInfo';
import AccountDetails from './steps-with-validation/AccountDetails';
import CourseInfo from './steps-with-validation/CourseInfo';
import Preview from './steps-with-validation/Preview';

const WizardHorizontal = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [formData, setFormData] = useState({}); // وضعیت مرکزی برای داده‌ها

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data })); // ذخیره داده‌ها
    stepper.next();
  };

  const steps = [
    {
      id: 'uploadImage',
      title: 'افزودن عکس',
      subtitle: 'تصویر خود را انتخاب کنید.',
      content: <AccountDetails stepper={{ next: handleNext }} />
    },
    {
      id: 'courseInfoAll',
      title: 'مشخصات کلی دوره',
      subtitle: 'اطلاعات دوره را وارد کنید',
      content: <PersonalInfo stepper={{ next: handleNext }} />
    },
    {
      id: 'courseInfo',
      title: 'اطلاعات دوره',
      subtitle: 'Add Address',
      content: <Address stepper={{ next: handleNext }} />
    },
    {
      id: 'Describe',
      title: 'توضیحات دوره',
      subtitle: 'متن خود را تایپ کنید',
      content: <SocialLinks stepper={{ next: handleNext }} />
    },
    {
      id: 'courseInfoDetail',
      title: 'جزییات دوره',
      subtitle: 'افزودن جزییات دوره',
      content: <CourseInfo stepper={{ next: handleNext }} />
    },
    {
      id: 'Preview',
      title: 'پیش نمایش دوره',
      subtitle: 'دوره خود را ببینید',
      content: <Preview stepper={{ previous: () => stepper.previous() }} data={formData} />
    }
  ];

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
