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
      }
    ]
  },
];
