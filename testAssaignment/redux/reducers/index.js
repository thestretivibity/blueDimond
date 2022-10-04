import {combineReducers} from 'redux';
import queryReducer from './queryReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
  Authentications: authenticationReducer,
  Queries: queryReducer,
});
