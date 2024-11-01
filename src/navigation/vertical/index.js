import { Children } from "react";
import { Mail, Home, Airplay, Circle, User, Book, BookOpen } from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "user",
    title:"کاربران",
    icon: <User size={20} />,
    navLink:"/apps/user/list"
  },
  {
    id: "email",
    title: "کامنت ها",
    icon: <Mail size={20} />,
    navLink: "/apps/email",
  },
  {
    id: "Course",
    title: "دوره ها",
    icon: <Book size={20} />,
    navLink: "/apps/Course",
    children:[
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
      {
        id: "commentMng",
        title: "مدیریت کامنت دوره ها",
        icon: <BookOpen size={20} />,
        navLink: "/apps/Course/CommentMng",
      },
    ]
  },
  {
    id: "blog",
    title: "مقالات",
    icon: <Book size={20} />,
    navLink: "/apps/blog",
    children:[
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
        title: "مدیریت دسته بندی های مقاله",
        icon: <BookOpen size={20} />,
        navLink: "/apps/CategoryNews",
      }
    ]
  },
];
