// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import users from '@src/views/apps/user/store';
import userReducer from './userSlice'
import commentReducer from './comments'
import CoursePaymentReducer from "./CoursePayment";
const rootReducer = { 
    navbar, 
    layout,
    users,
    user: userReducer,
    comment : commentReducer,
    payment : CoursePaymentReducer,
};

export default rootReducer;
