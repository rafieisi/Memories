import { combineReducers } from 'redux'
import BlogsReducer from './allBlogsState.js';
import pageNumberReducer from './pageNumberState.js';

export default combineReducers({
    blogs:BlogsReducer,
    pageNumber:pageNumberReducer,
  })