import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { getCategoryList } from '../../../@core/api/course/Category';
import { addCategory } from '../../../@core/api/course/addCategroy';

const AddCategory = ({ uuid }) => {
  const [show, setShow] = useState(false);

  // ** Fetch technologies using React Query
  const { data: technologies, error, isLoading } = useQuery({
    queryKey: 'techList',
    queryFn: getCategoryList,
  });

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    techId: Yup.number().required('تکنولوژی را انتخاب کنید').integer('باید عدد صحیح باشد'),
  });

  const handleSubmit = async (values) => {
    const numericTechId = parseInt(values.techId, 10); // تبدیل techId به عدد صحیح
    const response = await addCategory([{ techId: numericTechId }], uuid); // ارسال techId به صورت آرایه از اشیاء
    // می‌توانید اینجا با پاسخ API کار کنید
  };
  
  return (
    <div>
      <Button
        onClick={() => setShow(true)}
        className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
        color='info'
      >
        ساخت گروه
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop='static'
        keyboard={false}
        style={{ width: '500px' }}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'>ساخت گروه</h1>
          </div>
          <Formik
            initialValues={{ techId: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form>
                <Label for="techId">تکنولوژی</Label>
                <Field as="select" name="techId" onChange={handleChange}>
                  <option value="">انتخاب کنید</option>
                  {isLoading && <option>در حال بارگذاری...</option>}
                  {error && <option>خطا در بارگذاری</option>}
                  {technologies && technologies.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.techName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="techId" component="div" className="text-danger" />
                <Button type="submit" color="primary" className="mt-3">
                  ارسال
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddCategory;
