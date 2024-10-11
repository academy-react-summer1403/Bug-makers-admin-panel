// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import users from '@src/views/apps/user/store';

const rootReducer = { 
    navbar, 
    layout,
    users,
};

export default rootReducer;
