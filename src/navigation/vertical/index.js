import React, { useEffect, useState } from 'react';
import { Home, User, Mail, Book, BookOpen } from "react-feather";
import { useSelector } from 'react-redux';

export const userData = (items) => {
  const isAdmin = items?.roles?.some(role => role.roleName === "Administrator");
  const isTeacher = items?.roles?.some(role => role.roleName === "Teacher");

  const data = [
    {
      id: "home",
      title: "خانه",
      icon: <Home size={20} />,
      navLink: "/home",
      children:[
        {
          id: "ecommers",
          title: " ها",
          icon: <Book size={20} />,
          navLink: "/dashBoard/ecommerce",
        },
      ]
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
        
        {
          id: "commentMng",
          title: "دوره های من",
          icon: <User size={20} />,
          navLink: "/apps/MyCourse",
        },
        {
          id: "CoursePaymentPage",
          title: "پرداختی ها",
          icon: <User size={20} />,
          navLink: "/CoursePaymentPage",
        },
        {
          id: "Term",
          title: "ترم ها",
          icon: <User size={20} />,
          navLink: "/apps/Course/Term",
        },
        {
          id: "Tech",
          title: "مدیریت دسته بندی",
          icon: <User size={20} />,
          navLink: "/apps/Course/Tech",
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
        },
        {
          id: "commentbLOG",
          title: "مدیریت  کامنت",
          icon: <BookOpen size={20} />,
          navLink: "/apps/CommentMngForBlog",
        }
      ]
    },
    ...(isAdmin ? [{
      id: "commentMngPage",
      title: "مدیریت همه کامنت ها",
      icon: <BookOpen size={20} />,
      navLink: "/apps/allCommentMng",
    }] : []),
    {
      id: "building",
      title: "ساختمان پژوهشگاه",
      icon: <BookOpen size={20} />,
      navLink: "/building/list",
    },
    {
      id: "Department",
      title: "بخش های پژوهشگاه",
      icon: <BookOpen size={20} />,
      navLink: "/Department/list",
    },
    {
      id: "AssCourse",
      title: "منتور ها",
      icon: <BookOpen size={20} />,
      navLink: "/AssCourse/list",
    },
    {
      id: "AssWork",
      title: "تعیین تسک",
      icon: <BookOpen size={20} />,
      navLink: "/AssWork/list",
    },
    {
      id: "SocialGroup",
      title: "گروه اجتماعی دوره ",
      icon: <BookOpen size={20} />,
      navLink: "/SocialGroup/list",
    },
    {
      id: "Schedual",
      title: "بازه زمانی",
      icon: <BookOpen size={20} />,
      navLink: "/Schedual",
    },
    {
      id: "Tournament",
      title: "تورنومنت",
      icon: <BookOpen size={20} />,
      navLink: "/Tournament",
      children:[
        {
           id: "tourList",
            title: " لیست تورنومنت",
            icon: <BookOpen size={20} />,
            navLink: "/Tournament/list", 
        },
        {
           id: "mainCheckList",
            title: "چک لیست تورنومنت",
            icon: <BookOpen size={20} />,
            navLink: "/Tournament/MainCheckList", 
        },
        {
           id: "Refere",
            title: "داور ها",
            icon: <BookOpen size={20} />,
            navLink: "/Tournament/Refere", 
        },
      ]
    },
    {
      id: "Podcast",
       title: "پادکست",
       icon: <BookOpen size={20} />,
       children:[
        {
          id: "PodcastList",
          title: "لیست پادکست",
          icon: <BookOpen size={20} />,
          navLink: "/Podcast", 
        },
        {
          id: "PodcastComment",
          title: "کامنت  پادکست",
          icon: <BookOpen size={20} />,
          navLink: "/Podcast/CommentMngPodcast", 
        }
       ]
   }
  ];
  
  return data;
};