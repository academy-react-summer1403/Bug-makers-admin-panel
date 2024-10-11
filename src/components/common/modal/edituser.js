import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUser, getUser } from '../../../views/apps/user/store/index'; // اطمینان حاصل کنید که مسیر درست است
import { hide } from '../../../redux/modal'; // تابع برای بستن مودال

const EditUser = ({ userId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const selectedUser = useSelector((state) => state.appUsers.selectedUser);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)); // بارگذاری اطلاعات کاربر هنگام لود کامپوننت
    }
  }, [dispatch, userId]);

  // وقتی اطلاعات کاربر بارگذاری شد، فیلدها را پر کنید
  useEffect(() => {
    if (selectedUser) {
      setValue('firstName', selectedUser.firstName);
      setValue('lastName', selectedUser.lastName);
      setValue('gmail', selectedUser.gmail);
      setValue('phoneNumber', selectedUser.phoneNumber);
      // سایر فیلدها را به همین شکل پر کنید
    }
  }, [selectedUser, setValue]);

  const onSubmit = (data) => {
    const updatedUser = { ...data, id: userId }; // اضافه کردن id به داده‌های به‌روزرسانی شده
    dispatch(updateUser(updatedUser)); // درخواست به‌روزرسانی کاربر
    dispatch(hide()); // بستن مودال
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" {...register('firstName')} required />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" {...register('lastName')} required />
      </div>
      <div>
        <label htmlFor="gmail">Email:</label>
        <input id="gmail" type="email" {...register('gmail')} required />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" {...register('phoneNumber')} required />
      </div>
      {/* سایر فیلدها */}
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
