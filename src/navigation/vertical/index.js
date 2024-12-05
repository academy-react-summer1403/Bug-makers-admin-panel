import React, { useEffect, useState } from 'react';
import { Home, User, Mail, Book, Clipboard, FileText, BookOpen, MessageCircle, Bell, Tag, Inbox, Calendar, Code, Disc, UserCheck, Video } from "react-feather";
import { GiClassicalKnowledge, GiWallet } from 'react-icons/gi';
import { GrStatusCritical, GrTest, GrTransaction, GrUserWorker , GrWorkshop} from 'react-icons/gr';
import { PiExam } from 'react-icons/pi';
import { useSelector } from 'react-redux';

export const userData = (items) => {
  const isAdmin = items?.roles?.some(role => role.roleName === "Administrator");
  const isSupport = items?.roles?.some(role => role.roleName === "Administrator" || role.roleName === "Support");
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
      icon: <Clipboard size={20} />,
      navLink: "/apps/Course",
      children: [
        {
          id: "CourseList",
          title: "دوره ها",
          icon: <Clipboard size={20} />,
          navLink: "/apps/Course",
        },
        {
          id: "addCourse",
          title: "ساخت دوره جدید",
          icon: <FileText size={20} />,
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
          icon: <FileText size={20} />,
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
          icon: <Book size={20} />,
          navLink: "/apps/Course/Term",
        },
        {
          id: "CourseStatus",
          title: "وضعیت دوره ها",
          icon: <GrStatusCritical size={20} />,
          navLink: "/apps/Course/CourseStatus",
        },
        {
          id: "Tech",
          title: "مدیریت دسته بندی",
          icon: <BookOpen size={20} />,
          navLink: "/apps/Course/Tech",
        },
        {
          id: "ClassRome",
          title: "کلاس ها",
          icon: <GiClassicalKnowledge size={20} />,
          navLink: "/ClassRome",
        },
        {
          id: "DisCount",
          title: "تخفیف",
          icon: <Disc size={20} />,
          navLink: "/DisCount",
        },
        {
          id: "VideoPage",
          title: "ویدیو دوره",
          icon: <Video size={20} />,
          navLink: "/VideoPage",
        }
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
          icon: <FileText size={20} />,
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
          icon: <MessageCircle size={20} />,
          navLink: "/apps/CommentMngForBlog",
        }
      ]
    },
    ...(isAdmin ? [{
      id: "commentMngPage",
      title: "مدیریت همه کامنت ها",
      icon: <MessageCircle size={20} />,
      navLink: "/apps/allCommentMng",
    }] : []),
    {
      id: "building",
      title: "ساختمان پژوهشگاه",
      icon: <Home size={20} />,
      navLink: "/building/list",
    },
    {
      id: "Department",
      title: "بخش های پژوهشگاه",
      icon: <Home size={20} />,
      navLink: "/Department/list",
    },
    {
      id: "AssCourse",
      title: "منتور ها",
      icon: <User size={20} />,
      navLink: "/AssCourse/list",
    },
    {
      id: "AssWork",
      title: "تعیین تسک",
      icon: <Clipboard size={20} />,
      navLink: "/AssWork/list",
    },
    {
      id: "SocialGroup",
      title: "گروه اجتماعی دوره ",
      icon: <MessageCircle size={20} />,
      navLink: "/SocialGroup/list",
    },
    {
      id: "Schedual",
      title: "بازه زمانی",
      icon: <Clipboard size={20} />,
      navLink: "/Schedual",
    },
    {
      id: "Tournament",
      title: "تورنومنت",
      icon: <Clipboard size={20} />,
      navLink: "/Tournament",
      children:[
        {
           id: "tourList",
            title: " لیست تورنومنت",
            icon: <Clipboard size={20} />,
            navLink: "/Tournament/list", 
        },
        {
           id: "mainCheckList",
            title: "چک لیست تورنومنت",
            icon: <Clipboard size={20} />,
            navLink: "/Tournament/MainCheckList", 
        },
        {
           id: "Refere",
            title: "داور ها",
            icon: <User size={20} />,
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
          icon: <MessageCircle size={20} />,
          navLink: "/Podcast/CommentMngPodcast", 
        }
       ]
   },
   ...(isSupport ? [{
      id: "support",
      title: "پشتیبانی",
      icon: <MessageCircle size={20} />,
      navLink: '/SupportChat'
   }] : []),
   {
    id: "notif",
    title: "اعلان",
    icon: <Bell size={20} />,
    children: [
      {
        id: "NotifType",
        title: "نوع اعلان",
        icon: <Tag size={20} />,
        navLink: "/Notif/NotifType",
      },
      {
        id: "NotifMessageList",
        title: "لیست پیام اعلان",
        icon: <Mail size={20} />,
        navLink: "/Notif/NotifListMessage",
      },
      {
        id: "NotifList",
        title: "لیست اعلان",
        icon: <Inbox size={20} />,
        navLink: "/Notif/NotifList",
      }
    ]
  },
   {
    id: "Wallet",
    title: "کیف پول",
    icon: <GiWallet size={20} />,
    children: [
      {
        id: "NotifType",
        title: "لیست کیف پول",
        icon: <GiWallet size={20} />,
        navLink: "/wallet/AllWallet",
      },
      {
        id: "Transaction",
        title: "لیست تراکنش",
        icon: <GrTransaction size={20} />,
        navLink: "/wallet/Transaction",
      },
      {
        id: "code",
        title: "لیست کد",
        icon: <Code size={20} />,
        navLink: "/wallet/Code",
      },
    ]
  },
   {
    id: "calendar",
    title: "تقویم آموزشی",
    icon: <Calendar size={20} />,
    navLink:"/apps/calendar"
  },
  // {
  //   id: "Job",
  //   title: "کاریابی",
  //   icon: <GrUserWorker size={20} />,
  //   children: [
  //     {
  //       id: "jobList",
  //       title: "لیست شغل ها",
  //       icon: <GrWorkshop size={20} />,
  //       navLink: "/Job/list",
  //     },
  //   ]
  // },
  {
    id: "Exam",
    title: "آزمون",
    icon: <PiExam size={20} />,
    children: [
      {
        id: "Examlist",
        title: "لیست آزمون ها",
        icon: <GrTest size={20} />,
        navLink: "/Exam/list",
      },
      {
        id: "UserExam",
        title: "لیست کاربران آزمون",
        icon: <UserCheck size={20} />,
        navLink: "/Exam/UserExam",
      },
    ]
  }


  ];
  
  return data;
};
