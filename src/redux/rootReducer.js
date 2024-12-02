// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import users from '@src/views/apps/user/store';
import userReducer from './userSlice'
import commentReducer from './comments'
import CoursePaymentReducer from "./CoursePayment";
import CourseSliceReducer from "./CourseSlice";
import CourseDetailReducer from "./Course";
import PreviewReducer from "./Preview";
import createReducer from './CreateCourse'
import blogSliceReducer from "./blogSlice";
import blogDetailReducer from "./blogDetail";
import LoginSliceReducer from './Login'
import userIdSliceReducer from './userId'
import rolePageSliceReducer from './rolePage'
import TourGroupSliceReducer from './TourGroup'
import DescSliceReducer from './descSlice'
const rootReducer = { 
    navbar, 
    layout,
    users,
    user: userReducer,
    comment : commentReducer,
    payment : CoursePaymentReducer,
    Course: CourseSliceReducer,
    CourseDetail: CourseDetailReducer,
    preview: PreviewReducer,
    create : createReducer,
    blog : blogSliceReducer,
    blogDetail : blogDetailReducer,
    LoginState : LoginSliceReducer,
    userId:userIdSliceReducer,
    role:rolePageSliceReducer,
    Tgroup : TourGroupSliceReducer,
    desc : DescSliceReducer,
};

export default rootReducer;
