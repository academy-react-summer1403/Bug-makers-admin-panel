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
import { Tooltip } from '@mui/material';

const EdEditTerm = ({ row, title , size}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [depState, setDepState] = useState([]);
  const { data: depData } = useQuery({
    queryKey: ['getDepartments'],
    queryFn: getDep,
  });

  const defaultValue = row
    ? {
        id: row.id || null,
        termName: row.termName || '',
        departmentId: row.departmentId || 0,
        startDate: row.startDate || '',
        endDate: row.endDate || '',
        expire: row.expire,
      }
    : {
        termName: '',
        departmentId: depState,
        expire: '',
        startDate: '',
        endDate: '',
      };

  const validationSchema = Yup.object().shape({
    termName: Yup.string().required('این فیلد الزامی است'),
    departmentId: Yup.string().required('این فیلد الزامی است'),
    startDate: Yup.date().required('تاریخ الزامی است'),
    endDate: Yup.date().required('تاریخ الزامی است'),
    expire: Yup.boolean(),
  });

  const TermUpdate = useMutation({
    mutationKey: ['UpdateTermData'],
    mutationFn: (BulldingData) => UpdateTerm(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getTerm');
    },
  });

  const handleSubmit = (values) => {
    values.expire = values.expire === 'true';
    TermUpdate.mutate(values);
    console.log(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip placement='top' title='افزودن ترم' >
      <Button
        onClick={() => setShow(true)}
        color="transparent"
        style={{whiteSpace:'nowrap',border:'none'}}
        size={size}
      >
        {title}
      </Button>
      </Tooltip>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی  ترم' : 'افزودن ترم '} </h1>
            <p>اطلاعات ترم را وارد کنید</p>
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
                  <Label for="termName">نام ترم <span className="text-danger">*</span></Label>
                  <Input
                    id="termName"
                    name="termName"
                    value={values.termName}
                    onChange={handleChange}
                    invalid={touched.termName && !!errors.termName}
                    style={{ width: '600px' }}
                  />
                  {touched.termName && errors.termName && <FormFeedback>{errors.termName}</FormFeedback>}
                </div>
                {row == null && (
                  <div className="mb-1 w-40">
                    <Label for="departmentId">نام بخش<span className="text-danger">*</span></Label>
                    <FormSelect
                      name="departmentId"
                      onChange={(e) => setDepState(e.target.value)}
                      value={depState}
                      style={{ width: '100%' }}
                    >
                      {depData?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.depName}
                        </option>
                      ))}
                    </FormSelect>
                    {touched.departmentId && errors.departmentId && <FormFeedback>{errors.departmentId}</FormFeedback>}
                  </div>
                )}

                <div className="mb-1 w-40">
                  <Label for="startDate">تاریخ شروع <span className="text-danger">*</span></Label>
                  <Flatpickr
                    name="startDate"
                    id="startDate"
                    style={{ width: '100%' }}
                    className="form-control"
                    value={values.startDate}
                    onChange={(date) => {
                      const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : '';
                      setFieldValue('startDate', formattedDate);
                    }}
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                  />
                  {touched.startDate && errors.startDate && <FormFeedback>{errors.startDate}</FormFeedback>}
                </div>

                <div className="mb-1 w-40">
                  <Label for="endDate">تاریخ پایان <span className="text-danger">*</span></Label>
                  <Flatpickr
                    name="endDate"
                    id="endDate"
                    style={{ width: '100%' }}
                    className="form-control"
                    value={values.endDate}
                    onChange={(date) => {
                      const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : '';
                      setFieldValue('endDate', formattedDate);
                    }}
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                  />
                  {touched.endDate && errors.endDate && <FormFeedback>{errors.endDate}</FormFeedback>}
                </div>

                <div className="mb-1 w-40">
                  <Label for="expire">وضعیت <span className="text-danger">*</span></Label>
                  <FormSelect
                    id="expire"
                    name="expire"
                    value={values.expire}
                    onChange={handleChange}
                    invalid={touched.expire && !!errors.expire}
                    style={{ width: '600px' }}
                  >
                    <option value={true}>منقضی شده</option>
                    <option value={false}>فعال</option>
                  </FormSelect>
                  {touched.expire && errors.expire && <FormFeedback>{errors.expire}</FormFeedback>}
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

export default EdEditTerm;
