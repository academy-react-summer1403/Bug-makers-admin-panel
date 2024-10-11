// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import users from '@src/views/apps/user/store';
import modalReducer from "./modal"; 

const rootReducer = { 
    navbar, 
    layout,
    users,
    modal: modalReducer  
};

export default rootReducer;
