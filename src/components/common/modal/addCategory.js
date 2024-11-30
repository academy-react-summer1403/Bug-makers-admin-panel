import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { getCategoryList } from '../../../@core/api/course/Category';
import { addCategory } from '../../../@core/api/course/addCategroy';

import Select from 'react-select';

const AddCategory = ({ uuid , courseTeches}) => {
  const [show, setShow] = useState(false);
  
  // ** Fetch technologies using React Query
  const { data: technologies, error, isLoading } = useQuery({
    queryKey: ['techList'],
    queryFn: getCategoryList,
  });

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    techIds: Yup.array().min(1, 'حداقل یک تکنولوژی را انتخاب کنید'),
  });

  const handleSubmit = async (values) => {
    const numericTechIds = values.techIds.map(item => item.value); 
    const response = await addCategory(numericTechIds.map(techId => ({ techId })), uuid); 
    if(response?.success === true) {
      setShow(false)
    }
  };

  const filterData = technologies?.filter((el) => courseTeches?.includes(el.techName));

  const initialSelectedOptions = filterData?.map((tech) => ({
    value: tech.id,
    label: tech.techName
  })) || [];

  const options = technologies ? technologies.map(tech => ({ value: tech.id, label: tech.techName })) : [];

  return (
    <div>
      <Button onClick={() => setShow(true)} className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0' color='primary'>
         افزودن کتگوری
      </Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop='static' keyboard={false} style={{ width: '500px' }}>
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className='text-center mb-2'>
            <h1 className='mb-1'>افزودن دسته بندی</h1>
          </div>
          <Formik
            initialValues={{ techIds: initialSelectedOptions }} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Label for="techIds">تکنولوژی‌ها</Label>
                <Select
                  id="techIds"
                  name="techIds"
                  options={options}
                  onChange={value => setFieldValue('techIds', value)} 
                  isMulti
                  value={values.techIds} 
                  isLoading={isLoading}
                  placeholder="انتخاب کنید"
                />
                <ErrorMessage name="techIds" component="div" className="text-danger" />
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
