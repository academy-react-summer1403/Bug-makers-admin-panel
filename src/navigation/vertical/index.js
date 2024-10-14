import { Mail, Home, Airplay, Circle, User } from "react-feather";

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
];
