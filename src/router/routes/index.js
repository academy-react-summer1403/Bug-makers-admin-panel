// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import PrivateRoute from "./privateRoute";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))
const Email = lazy(() => import('../../views/apps/email'))
const Course = lazy(() => import('../../views/apps/Course'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))
const CourseDetail = lazy(() => import('../../views/apps/Course/CourseDetail/CourseDetail'))
const EditCourse = lazy(() => import('../../views/pages/wizard'))
const BlogPage = lazy(() => import('../../views/apps/blog'))
const BlogDetail = lazy(() => import('../../views/apps/blog/CourseDetail/CourseDetail'))
const Groups = lazy(() => import('../../views/pages/groupPage/groupPage')) 
const CatNews = lazy(() => import('../../views/pages/catNews/catNews')) 
const CourseReserve = lazy(() => import('../../views/pages/Course/CourseReserve/CourseReserve')) 
const CommentMngForCourseAdmin = lazy(() => import('../../views/pages/Course/commentMng/commentMng')) 
const CommentMngForBlog = lazy(() => import('../../views/pages/Course/commentMng/commentMngTeacher.js')) 
const CommentMngForCourse = lazy(() => import('../../views/pages/Course/commentMng/AllCommentMng')) 
const MyCourse = lazy(() => import('../../views/pages/Course/MyCourse/MyCourse'))
const Ecommerce = lazy(() => import('../../views/pages/dashboard/ecommerce'))
const Bullding = lazy(() => import('../../views/pages/building/building'))
const Department = lazy(() => import('../../views/pages/Department/department'))
const AssCourse = lazy(() => import('../../views/pages/assistanceCourse/assistanceCourse'))
const AssWork = lazy(() => import('../../views/pages/assWork/assWork'))
const SocialGroup = lazy(() => import('../../views/pages/socailGroup/socialGroup'))
const Tournament = lazy(() => import('../../views/pages/tournoment/tournoment'))
const MainCheckList = lazy(() => import('../../views/pages/tournoment/mainCheckList'))
const Refere = lazy(() => import('../../views/pages/tournoment/Refre'))
const Schedual = lazy(() => import('../../views/pages/schedual/schedual.js'))
const CoursePaymentPage = lazy(() => import('../../views/pages/CoursePayment/CoursePayment.js'))
const Podcast = lazy(() => import('../../views/pages/pocast/index.js'))
const CommentMngPodcast = lazy(() => import('../../views/pages/pocast/commentMngPodcast.js'))
const Term = lazy(() => import('../../views/pages/Term/Term.js'))
const Tech = lazy(() => import('../../views/pages/technology/tech.js'))
const SupportChat = lazy(() => import('../../components/chat/chat.js'))
const NotifType = lazy(() => import('../../views/pages/NotifPage/NotifType.js'))
const NotifListMessage = lazy(() => import('../../views/pages/NotifPage/NotifListMessage.js'))
const NotifList = lazy(() => import('../../views/pages/NotifPage/NotifList.js'))
const ClassRome = lazy(() => import('../../views/pages/classRome/classRome.js'))
const CourseStatus = lazy(() => import('../../views/pages/courseStatus/courseStatus.js'))
const Wallet = lazy(() => import('../../views/pages/wallet/wallet.js'))
const Code = lazy(() => import('../../views/pages/wallet/Code.js'))
const Calender = lazy(() => import('../../views/apps/calendar/index.js'))
const Transaction = lazy(() => import('../../views/pages/wallet/transaction.js'))
const DisCount = lazy(() => import('../../views/pages/discount/disCount.js'))
const EditUser = lazy(() => import('../../components/common/modal/edituser.js'))
const Job = lazy(() => import('../../views/pages/job/job.js'))
const Exam = lazy(() => import('../../views/pages/exam/exam.js'))
const UserExam = lazy(() => import('../../views/pages/exam/userExam.js'))
const EditUserWizard = lazy(() => import('../../views/pages/edituser/index.js'))


// ** Merge Routes
const token = localStorage.getItem('token');

const Routes = [
  {
    path: "/",
    index: true,
    element: token ? <Navigate replace to={DefaultRoute} /> : <Navigate to={'/login'} />,
  },
  {
    path: "/home",
    element: token ? <Ecommerce /> : <Navigate to={'/login'} />,
  },
  {
    path: "/sample",
    element: token ? <Sample /> : <Navigate to={'/login'} />,
  },
  {
    path: "/second-page",
    element: token ? <SecondPage /> : <Navigate to={'/login'} />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: token ? <UserList /> : <Navigate to={'/login'} />,
    path: '/apps/user/list',
  },
  {
    element: token ? <UserView /> : <Navigate to={'/login'} />,
    path: '/apps/user/view/:id',
  },
  {
    element: token ? <Email /> : <Navigate to={'/login'} />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: token ? <Email /> : <Navigate to={'/login'} />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: token ? <Email /> : <Navigate to={'/login'} />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: token ? <Email /> : <Navigate to={'/login'} />,
    path: '/apps/email/:filter',
  },
  {
    element: token ? <Course /> : <Navigate to={'/login'} />,
    path: '/apps/Course',
  },
  {
    element: token ? <MyCourse /> : <Navigate to={'/login'} />,
    path: '/apps/MyCourse',
  },
  {
    element: token ? <CommentMngForBlog /> : <Navigate to={'/login'} />,
    path: '/apps/CommentMngForBlog',
  },
  {
    element: token ? <CommentMngForCourse /> : <Navigate to={'/login'} />,
    path: '/apps/allCommentMng',
  },
  {
    element: token ? <BlogPage /> : <Navigate to={'/login'} />,
    path: '/apps/blog',
  },
  {
    element: token ? <InvoicePreview /> : <Navigate to={'/login'} />,
    path: '/apps/invoice/preview/:id',
  },
  {
    element: token ? <CourseDetail /> : <Navigate to={'/login'} />,
    path: '/apps/Detail/:id',
  },
  {
    element: token ? <EditCourse /> : <Navigate to={'/login'} />,
    path: '/apps/Course/editCourse',
  },
  {
    element: token ? <EditCourse /> : <Navigate to={'/login'} />,
    path: '/apps/Course/AddCourse',
  },
  {
    element: token ? <CourseReserve /> : <Navigate to={'/login'} />,
    path: '/apps/Course/CourseReserve',
  },
  {
    element: token ? <CommentMngForCourseAdmin /> : <Navigate to={'/login'} />,
    path: '/apps/Course/CommentMng',
  },
  {
    element: token ? <Term /> : <Navigate to={'/login'} />,
    path: '/apps/Course/Term',
  },
  {
    element: token ? <CourseStatus /> : <Navigate to={'/login'} />,
    path: '/apps/Course/CourseStatus',
  },
  {
    element: token ? <Tech /> : <Navigate to={'/login'} />,
    path: '/apps/Course/Tech',
  },
  {
    element: token ? <Groups /> : <Navigate to={'/login'} />,
    path: '/apps/groupsManagement',
  },
  {
    element: token ? <BlogDetail /> : <Navigate to={'/login'} />,
    path: '/apps/blogDetail/:id',
  },
  {
    element: token ? <EditCourse /> : <Navigate to={'/login'} />,
    path: '/apps/blog/editBlog',
  },
  {
    element: token ? <EditCourse /> : <Navigate to={'/login'} />,
    path: '/apps/blog/AddBlog',
  },
  {
    element: token ? <CatNews /> : <Navigate to={'/login'} />,
    path: '/apps/CategoryNews',
  },
  {
    element: token ? <Bullding /> : <Navigate to={'/login'} />,
    path: '/building/list',
  },
  {
    element: token ? <Department /> : <Navigate to={'/login'} />,
    path: '/Department/list',
  },
  {
    element: token ? <AssCourse /> : <Navigate to={'/login'} />,
    path: '/AssCourse/list',
  },
  {
    element: token ? <AssWork /> : <Navigate to={'/login'} />,
    path: '/AssWork/list',
  },
  {
    element: token ? <SocialGroup /> : <Navigate to={'/login'} />,
    path: '/SocialGroup/list',
  },
  {
    element: token ? <Tournament /> : <Navigate to={'/login'} />,
    path: '/Tournament/list',
  },
  {
    element: token ? <MainCheckList /> : <Navigate to={'/login'} />,
    path: '/Tournament/MainCheckList',
  },
  {
    element: token ? <Refere /> : <Navigate to={'/login'} />,
    path: '/Tournament/Refere',
  },
  {
    element: token ? <Schedual /> : <Navigate to={'/login'} />,
    path: '/Schedual',
  },
  {
    element: token ? <CoursePaymentPage /> : <Navigate to={'/login'} />,
    path: '/CoursePaymentPage',
  },
  {
    element: token ? <Podcast /> : <Navigate to={'/login'} />,
    path: '/Podcast',
  },
  {
    element: token ? <CommentMngPodcast /> : <Navigate to={'/login'} />,
    path: '/Podcast/CommentMngPodcast',
  },
  {
    element: token ? <SupportChat /> : <Navigate to={'/login'} />,
    path: '/SupportChat',
  },
  {
    element: token ? <NotifType /> : <Navigate to={'/login'} />,
    path: '/Notif/NotifType',
  },
  {
    element: token ? <NotifListMessage /> : <Navigate to={'/login'} />,
    path: '/Notif/NotifListMessage',
  },
  {
    element: token ? <NotifList /> : <Navigate to={'/login'} />,
    path: '/Notif/NotifList',
  },
  {
    element: token ? <ClassRome /> : <Navigate to={'/login'} />,
    path: '/ClassRome',
  },
  {
    element: token ? <Wallet /> : <Navigate to={'/login'} />,
    path: '/wallet/AllWallet',
  },
  {
    element: token ? <Transaction /> : <Navigate to={'/login'} />,
    path: '/wallet/Transaction',
  },
  {
    element: token ? <EditUserWizard /> : <Navigate to={'/login'} />,
    path: '/EditUser',
  },
  {
    element: token ? <Calender /> : <Navigate to={'/login'} />,
    path: '/apps/calendar',
  },
  {
    element: token ? <Code /> : <Navigate to={'/login'} />,
    path: '/wallet/Code',
  },
  {
    element: token ? <DisCount /> : <Navigate to={'/login'} />,
    path: '/DisCount',
  },
  {
    element: token ? <Exam /> : <Navigate to={'/login'} />,
    path: '/Exam/list',
  },
  {
    element: token ? <UserExam /> : <Navigate to={'/login'} />,
    path: '/Exam/UserExam',
  },
  {
    element: token ? <Job /> : <Navigate to={'/login'} />,
    path: '/Job/list',
  },
];


const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
