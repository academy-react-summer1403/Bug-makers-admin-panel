import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton, Switch } from '@mui/material';
import { Card, CardTitle, CardBody, FormGroup, Label, Button, Row, Col, Badge } from 'reactstrap';
import { updateUser } from '../../../../@core/api/user/getUserById';
import SendNotif from '../../../../components/common/modal/SendNotif';
import { Menu, Plus } from 'react-feather';
import { getAllWallet } from '../../../../@core/api/wallet/getAllWallet';
import EditWallet from '../../../../components/common/modal/editWallet';
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'
import { Dropdown } from 'react-bootstrap';
import { DeleteWallet } from '../../../../@core/api/wallet/deleteWallet';

const UserSettings = () => {
  // Get user data from Redux store
  const user = useSelector(state => state.user.selectUser);

  // get data 
  const { data } = useQuery({
    queryKey: ['getWallet'],
    queryFn: getAllWallet,
  });

  // filtered data 
  const filterdedData = data?.data?.find((el) => Number(el.UserId) == user.id)

  // States to manage two-step authentication and notifications
  const [twoStepAuth, setTwoStepAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(false);

  // Update states when user data changes
  useEffect(() => {
    if (user?.twoStepAuth !== undefined) {
      setTwoStepAuth(user.twoStepAuth);
    }
    // Assuming the user data also contains notification preferences
    setEmailNotifications(user?.emailNotifications || false);
    setBrowserNotifications(user?.browserNotifications || false);
    setAppNotifications(user?.appNotifications || false);
  }, [user]);

  // Mutation to update user settings
  const sendToApi = useMutation({
    mutationKey: ['userSettings'],
    mutationFn: (userData) => updateUser(userData),
  });

  // Handle save settings
  const handleSave = () => {
    const userData = {
      id: user.id || null,
      fName: user.fName || null,
      lName: user.lName || null,
      userName: user.userName || null,
      gmail: user.gmail || null,
      phoneNumber: user.phoneNumber || null,
      active: user.active ? true : false,
      isDelete: user.isDelete || false,
      isTecher: user.isTecher || false,
      isStudent: user.isStudent || false,
      twoStepAuth: twoStepAuth, // Update two-step auth status
      emailNotifications,
      browserNotifications,
      appNotifications,
      recoveryEmail: user.recoveryEmail || null,
      userAbout: user.userAbout || null,
      telegramLink: user.telegramLink || null,
      homeAdderess: user.homeAdderess || null,
      nationalCode: user.nationalCode || null,
      gender: !!(user.gender),
      latitude: user.latitude || null,
      longitude: user.longitude || null,
      insertDate: user.insertDate || null,
      birthDay: user.birthDay || null,
      currentPictureAddress: user.currentPictureAddress || null,
      linkdinProfile: user.linkdinProfile || null,
      roles: user.roles.map(role => ({
        id: Number(role.id) || null,
        roleName: role.roleName || null,
        roleParentName: role.roleParentName || null,
      })),
    };

    sendToApi.mutate(userData);
  };

  // Handle toggles for each setting
  const handleTwoStepAuthChange = (e) => {
    setTwoStepAuth(e.target.checked); // Update two-step authentication status
  };

  const handleEmailNotificationsChange = (e) => {
    setEmailNotifications(e.target.checked);
  };

  const handleBrowserNotificationsChange = (e) => {
    setBrowserNotifications(e.target.checked);
  };

  const handleAppNotificationsChange = (e) => {
    setAppNotifications(e.target.checked);
  };
  const customStyles = {
    table: {
      style: {
        minHeight: '300px',
      },
    },
 
  
  };

  // delete Wallet 
  const deleteWalletById = useMutation({
    mutationKey:['deleteWalletData'],
    mutationFn: (data) => DeleteWallet(data),
    onSuccess: () => {
        queryClient.invalidateQueries('getWallet')   
    }
  })
  // clumns 
  const columns = [
    {
      name: 'نام کاربر',
      cell: row => (
        <span>{user.fName + ' ' + user.lName}</span>
      ),
    }
,    
    {
      name: 'نام کاربری',
      selector: row => row.UserName,
    },
    {
      name: 'آیدی کاربر ',
      selector: row => row.UserId,
    },
    {
      name: 'پرداختی',
      selector: row => row.Cost,
    },
    {
      name: 'وضعیت',
      selector: row => row.IsActive,
      sortTable: true,
      cell : row => (
        <Badge color={row.IsActive ? 'success' : 'warning'}>{row.IsActive ? 'تایید شده' : 'در انتظار تایید'}</Badge>
      )
    },
    {
      name: 'عملیات',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-1">
        <Dropdown>
          <Dropdown.Toggle variant="transparent" style={{border:'none'}} id="dropdown-basic">
            <Menu />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item >
              <EditWallet title={'ویرایش'} row={row} />
            </Dropdown.Item>
            <Dropdown.Item >
              <Button color='transparent' style={{textAlign:'center' , border:'none'}} onClick={() => deleteWalletById.mutate(row.id)}>حذف کیف پول</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      )
    },
  ];
  return (
    <div>
      {/* Two-Step Authentication Section */}
      <Card className="shadow-sm mb-4">
        <CardBody>
          <CardTitle className="mb-3" tag="h4">
            ورود دو مرحله ای
          </CardTitle>
          <FormGroup check inline>
            <Label check>
              <Switch
                className="me-2"
                color="primary"
                checked={twoStepAuth} // Manage switch based on twoStepAuth state
                onChange={handleTwoStepAuthChange} // Handle toggle change
                id="twoStepSwitch"
              />
              <span>{twoStepAuth ? 'فعال' : 'غیرفعال'}</span>
            </Label>
          </FormGroup>
        </CardBody>
      </Card>

      {/* Notifications Settings Section */}
      <Card className="shadow-sm mb-4">
        <CardBody>
          <CardTitle className="mb-3" tag="h4">
            تنظیمات اعلان‌ها
          </CardTitle>
          <Row>
            <Col sm="4">
              <FormGroup check>
        <SendNotif  title={<Plus />} />
                       
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="shadow-sm mb-4">
        <CardBody>
          <CardTitle className="mb-3" tag="h4">
            کیف پول 
          </CardTitle>
          <Row>
            {filterdedData ? (
              <FormGroup check>
              <DataTable
            noHeader
            subHeader
            sortServer
            customStyles={customStyles}
            responsive
            pagination
            columns={columns}
            className='react-dataTable'
            data={[filterdedData]}
            noDataComponent={
              <div>
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
                  <Skeleton animation="wave"  height={50} width={1300} />
            </div>}
            />
              </FormGroup>
            ) : (
              <Col sm="4">
              <FormGroup check>
                <Badge color='warning' className='m-1'>کیف پول وجود ندارد ابتدا بسازید</Badge>
                <EditWallet title={<Plus />} />
              </FormGroup>
            </Col>
            )}
          </Row>
        </CardBody>
      </Card>

      {/* Buttons for saving or cancelling */}
      <CardBody className="d-flex justify-content-between">
        <Button color="primary" onClick={handleSave} className="me-2">
          ذخیره تغییرات
        </Button>
        <Button outline color="secondary">
          لغو
        </Button>
      </CardBody>
    </div>
  );
};

export default UserSettings;
