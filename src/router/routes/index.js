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
const CommentMngForCourseTeacher = lazy(() => import('../../views/pages/Course/commentMng/commentMngTeacher')) 
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
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/dashBoard/ecommerce",
    element: <Ecommerce />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
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
    element: <UserList />,
    path: '/apps/user/list',
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    element: <Course />,
    path: '/apps/Course'
  },
  {
    element: <MyCourse />,
    path: '/apps/MyCourse'
  },
  {
    element: <CommentMngForCourseTeacher />,
    path: '/apps/commentForTeacher'
  },
  {
    element: <CommentMngForCourse />,
    path: '/apps/allCommentMng'
  },
  {
    element: <BlogPage />,
    path: '/apps/blog'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    element: <CourseDetail />,
    path: '/apps/Detail/:id'
  },
  {
    element: <EditCourse />,
    path: '/apps/Course/editCourse'
  },
  {
    element: <EditCourse />,
    path: '/apps/Course/AddCourse'
  },
  {
    element: <CourseReserve />,
    path: '/apps/Course/CourseReserve'
  },
  {
    element: <CommentMngForCourseAdmin />,
    path: '/apps/Course/CommentMng'
  },
  {
    element: <Groups />,
    path: '/apps/groupsManagement'
  },
  {
    element: <BlogDetail />,
    path: '/apps/blogDetail/:id'
  },
  {
    element: <EditCourse />,
    path: '/apps/blog/editBlog'
  },
  {
    element: <EditCourse />,
    path: '/apps/blog/AddBlog'
  },
  {
    element: <CatNews />,
    path: '/apps/CategoryNews'
  },
  {
    element: <Bullding />,
    path: '/building/list'
  },
  {
    element: <Department />,
    path: '/Department/list'
  },
  {
    element: <AssCourse />,
    path: '/AssCourse/list'
  },
  {
    element: <AssWork />,
    path: '/AssWork/list'
  },
  {
    element: <SocialGroup />,
    path: '/SocialGroup/list'
  },
  {
    element: <Tournament />,
    path: '/Tournament/list'
  },
  {
    element: <MainCheckList />,
    path: '/Tournament/MainCheckList'
  },
  {
    element: <Refere />,
    path: '/Tournament/Refere'
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
