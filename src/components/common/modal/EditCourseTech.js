import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateTerm } from '../../../@core/api/course/Term/updateTerm';
import { getDep } from '../../../@core/api/Department/getDep';
import Flatpickr from 'react-flatpickr';
import { FormSelect } from 'react-bootstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { UpdateCourseTech } from '../../../@core/api/course/Tech/updateTechCourse';
import { Tooltip } from '@mui/material';

const EditCourseTech = ({ row, title , size}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();

  const defaultValue = row
    ? {
        id: row.id || null,
        techName: row.techName || '',
        describe: row.describe || '',
        iconAddress: row.iconAddress || '',
        parentId: null,
      }
    : {
        techName: '',
        describe: '',
        iconAddress: '',
        parentId: null,
      };

  const validationSchema = Yup.object().shape({
    techName: Yup.string().required('این فیلد الزامی است'),
    describe: Yup.string().required('این فیلد الزامی است'),
    iconAddress: Yup.string().required('این فیلد الزامی است'),
  });

  const TermUpdate = useMutation({
    mutationKey: ['UpdateTermData'],
    mutationFn: (BulldingData) => UpdateCourseTech(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getCourseTech');
    },
  });

  const handleSubmit = (values) => {
    values.expire = values.expire === 'true';
    TermUpdate.mutate(values);
    console.log(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title='افزودن دسته بندی' placement='top' >
      <Button
        style={{whiteSpace:'nowrap' , border:'none'}}
        onClick={() => setShow(true)}
        color="transparent"
        size={size}
      >
        {title}
      </Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  دسته بندی' : 'افزودن دسته بندی '} </h1>
            <p>اطلاعات دسته بندی را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  justifyContent: 'center',
                }}
              >
                <div className="mb-1 w-40">
                  <Label for="techName">نام دسته بندی <span className="text-danger">*</span></Label>
                  <Input
                    id="techName"
                    name="techName"
                    value={values.techName}
                    onChange={handleChange}
                    invalid={touched.techName && !!errors.techName}
                    style={{ width: '600px' }}
                  />
                  {touched.techName && errors.techName && <FormFeedback>{errors.techName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="describe">توضیحات دسته بندی <span className="text-danger">*</span></Label>
                  <Input
                    id="describe"
                    name="describe"
                    value={values.describe}
                    onChange={handleChange}
                    invalid={touched.describe && !!errors.describe}
                    style={{ width: '600px' }}
                  />
                  {touched.describe && errors.describe && <FormFeedback>{errors.describe}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="iconAddress">آدرس آیکون <span className="text-danger">*</span></Label>
                  <Input
                    id="iconAddress"
                    name="iconAddress"
                    value={values.iconAddress}
                    onChange={handleChange}
                    invalid={touched.iconAddress && !!errors.iconAddress}
                    style={{ width: '600px' }}
                  />
                  {touched.iconAddress && errors.iconAddress && <FormFeedback>{errors.iconAddress}</FormFeedback>}
                </div>

                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <Button type="submit" color="primary" style={{ flex: 1 }}>ارسال</Button>
                  <Button type="reset" color="secondary" outline onClick={() => setShow(false)} style={{ flex: 1 }}>انصراف</Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default EditCourseTech;

