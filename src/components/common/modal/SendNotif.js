import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, FormFeedback, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateNotif } from '../../../@core/api/Notif/NotifList/createNotif';
import { getMessageListNotif } from '../../../@core/api/Notif/NotifMessageList/getNotifMessageList';
import { getUser } from '../../../@core/api/user/getUserById';
import { Tooltip } from '@mui/material';
import Select from 'react-select';

const SendNotif = ({ row, title }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();

  const [userState, setUserState] = useState([]);
  const [typeID, setTypeID] = useState(1); 

  const { data } = useQuery({
    queryKey: ['getNotifMessage'],
    queryFn: getMessageListNotif,
  });
  const { data: userList } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
  });

  const defaultValue = {
    userIds: userState,   
    messageId: Number(typeID), 
  };

  const validationSchema = Yup.object().shape({
    userIds: Yup.array().min(1, 'لطفا حداقل یک کاربر را انتخاب کنید').required('این فیلد الزامی است'),
    messageId: Yup.number().min(1, 'لطفا یک نوع پیام انتخاب کنید').required('این فیلد الزامی است'),
  });

  const createNotifMutation = useMutation({
    mutationKey: ['createNotifForUser'],
    mutationFn: (notifData) => CreateNotif(notifData, row),
    onSuccess: () => {
      setShow(false);
      query.invalidateQueries('getUserNotifList');
    },
  });

  const handleSubmit = (values) => {
    createNotifMutation.mutate(values);
  };

  const userOptions = userList?.listUser?.map(user => ({
    value: user.id,
    label: `${user.fname} ${user.lname}`,
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '6px', alignItems: 'center' }}>
      <Tooltip title="افزودن اعلان" placement="top">
        <Button onClick={() => setShow(true)} color="transparent" style={{ border: 'none' }}>
          {title}
        </Button>
      </Tooltip>

      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن اعلان</h1>
            <p>اطلاعات اعلان را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                    <div style={{width:'620px'}} className="mb-1 w-40">
                        <Label for="messageId">نام تایپ اعلان</Label>
                        <Input
                            type="select"
                            name="messageId"
                            id="messageId"
                            value={typeID}
                            onChange={(e) => setTypeID(e.target.value)}
                            >
                            {data?.map((item , index) => (
                                <option key={index} value={item.id}>{item.title}</option>
                            ))}
                        </Input>
                    </div>
                <div style={{ width: '620px' }} className="mb-1 w-40">
                  <Label for="userIds">نام کاربر</Label>
                  <Select
                    isMulti
                    name="userIds"
                    options={userOptions}
                    value={userOptions?.filter(option => values.userIds.includes(option.value))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(option => option.value);
                      setFieldValue('userIds', selectedValues);
                    }}
                  />
                  {touched.userIds && errors.userIds && <FormFeedback>{errors.userIds}</FormFeedback>}
                </div>

                <Button type="submit" color="primary">
                  ارسال
                </Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SendNotif;
