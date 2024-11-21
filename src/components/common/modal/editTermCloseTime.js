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
import { UpdateTermDate } from '../../../@core/api/course/Term/UpdateTermDate';
import { getTerm } from '../../../@core/api/course/Term/getTerm';
import { Tooltip } from '@mui/material';

const EditTermCloseTime = ({ row, title  , size}) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [depState, setDepState] = useState([]);
  const { data : Term } = useQuery({
    queryKey: ['getTerm'],
    queryFn: getTerm,
  });

  const defaultValue = row
    ? {
        id: row.id || null,
        closeReason: row.termName || '',
        termId: row.id || 0,
        startCloseDate: row.startDate || '',
        endCloseDate: row.endDate || '',
      }
    : {
        closeReason: '',
        termId: depState,
        startCloseDate: '',
        endCloseDate: '',
      };

  const validationSchema = Yup.object().shape({
    closeReason: Yup.string().required('این فیلد الزامی است'),
    termId: Yup.string().required('این فیلد الزامی است'),
    startCloseDate: Yup.date().required('تاریخ الزامی است'),
    endCloseDate: Yup.date().required('تاریخ الزامی است'),
  });

  const TermUpdate = useMutation({
    mutationKey: ['UpdateTermData'],
    mutationFn: (BulldingData) => UpdateTermDate(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getTerm');
    },
  });

  const handleSubmit = (values) => {
    TermUpdate.mutate(values);
    console.log(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip placement='top' title='افزودن زمان' >
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
            <h1 className="mb-1">{row ? 'بروزرسانی  زمان ترم' : 'افزودن زمان ترم '} </h1>
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
                  <Label for="closeReason">نام ترم <span className="text-danger">*</span></Label>
                  <Input
                    id="closeReason"
                    name="closeReason"
                    value={values.closeReason}
                    onChange={handleChange}
                    invalid={touched.closeReason && !!errors.closeReason}
                    style={{ width: '600px' }}
                  />
                  {touched.closeReason && errors.closeReason && <FormFeedback>{errors.closeReason}</FormFeedback>}
                </div>
                {row == null && (
                  <div className="mb-1 w-40">
                    <Label for="termId">نام بخش<span className="text-danger">*</span></Label>
                    <FormSelect
                      name="termId"
                      onChange={(e) => setDepState(e.target.value)}
                      value={depState}
                      style={{ width: '100%' }}
                    >
                      {Term?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.termName}
                        </option>
                      ))}
                    </FormSelect>
                    {touched.termId && errors.termId && <FormFeedback>{errors.termId}</FormFeedback>}
                  </div>
                )}

                <div className="mb-1 w-40">
                  <Label for="startCloseDate">تاریخ شروع <span className="text-danger">*</span></Label>
                  <Flatpickr
                    name="startCloseDate"
                    id="startCloseDate"
                    style={{ width: '300px' }}
                    className="form-control"
                    value={values.startCloseDate}
                    onChange={(date) => {
                      const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : '';
                      setFieldValue('startCloseDate', formattedDate);
                    }}
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                  />
                  {touched.startCloseDate && errors.startCloseDate && <FormFeedback>{errors.startCloseDate}</FormFeedback>}
                </div>

                <div className="mb-1 w-40">
                  <Label for="endCloseDate">تاریخ پایان <span className="text-danger">*</span></Label>
                  <Flatpickr
                    name="endCloseDate"
                    id="endCloseDate"
                    style={{ width: '300px' }}
                    className="form-control"
                    value={values.endCloseDate}
                    onChange={(date) => {
                      const formattedDate = date[0] ? date[0].toLocaleDateString('en-CA') : '';
                      setFieldValue('endCloseDate', formattedDate);
                    }}
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                  />
                  {touched.endCloseDate && errors.endCloseDate && <FormFeedback>{errors.endCloseDate}</FormFeedback>}
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

export default EditTermCloseTime;
