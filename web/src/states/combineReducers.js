import { combineReducers } from 'redux'
import BlogsReducer from './allBlogsState.js';
import userReducer from './userState.js';

export default combineReducers({
    blogs:BlogsReducer,
    user:userReducer,
  })