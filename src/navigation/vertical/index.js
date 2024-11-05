import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Layout from "@layouts/VerticalLayout"; // Layout import
import { Home, User, Mail, Book, BookOpen } from "react-feather";
import { useSelector } from 'react-redux';

// فرض کنید داده‌های کاربر (مثل roles) از API دریافت شده است
export const userData = (items) => {
  const isAdmin = items?.roles?.some(role => role.roleName === "Administrator");
  const isTeacher = items?.roles?.some(role => role.roleName === "Teacher");

  const data = [
    {
      id: "home",
      title: "خانه",
      icon: <Home size={20} />,
      navLink: "/home",
    },
    {
      id: "user",
      title: "کاربران",
      icon: <User size={20} />,
      navLink: "/apps/user/list",
    },
    {
      id: "Course",
      title: "دوره ها",
      icon: <Book size={20} />,
      navLink: "/apps/Course",
      children: [
        {
          id: "CourseList",
          title: "دوره ها",
          icon: <Book size={20} />,
          navLink: "/apps/Course",
        },
        {
          id: "addCourse",
          title: "ساخت دوره جدید",
          icon: <BookOpen size={20} />,
          navLink: "/apps/Course/AddCourse",
        },
        {
          id: "groups",
          title: "مدیریت گروه ها",
          icon: <BookOpen size={20} />,
          navLink: "/apps/groupsManagement",
        },
        {
          id: "courseReserve",
          title: "مدیریت رزرو ها",
          icon: <BookOpen size={20} />,
          navLink: "/apps/Course/CourseReserve",
        },
        ...(isAdmin ? [{
          id: "commentMng",
          title: "مدیریت کامنت (ادمین)",
          icon: <BookOpen size={20} />,
          navLink: "/apps/Course/CommentMng",
        }] : []),
        ...(isTeacher ? [{
          id: "commentMngTeacher",
          title: "مدیریت کامنت (معلم)",
          icon: <BookOpen size={20} />,
          navLink: "/apps/commentForTeacher",
        }] : []),
        
        {
          id: "commentMng",
          title: "دوره های من",
          icon: <User size={20} />,
          navLink: "/apps/MyCourse",
        },
      ]
    },
    {
      id: "blog",
      title: "مقالات",
      icon: <Book size={20} />,
      navLink: "/apps/blog",
      children: [
        {
          id: "blogList",
          title: "مقاله ها",
          icon: <Book size={20} />,
          navLink: "/apps/blog",
        },
        {
          id: "addBlog",
          title: "ساخت مقاله جدید",
          icon: <BookOpen size={20} />,
          navLink: "/apps/blog/AddBlog",
        },
        {
          id: "categories",
          title: "مدیریت دسته بندی",
          icon: <BookOpen size={20} />,
          navLink: "/apps/CategoryNews",
        }
      ]
    },
    ...(isAdmin ? [{
      id: "commentMngPage",
      title: "مدیریت همه کامنت ها",
      icon: <BookOpen size={20} />,
      navLink: "/apps/allCommentMng",
    }] : []),
  ];
  return data;
};