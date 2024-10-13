// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import users from '@src/views/apps/user/store';
import userReducer from './userSlice'

const rootReducer = { 
    navbar, 
    layout,
    users,
    user: userReducer
};

export default rootReducer;
