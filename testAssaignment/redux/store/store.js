import AsyncStorage from '@react-native-community/async-storage';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';

import {createStore, applyMiddleware} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
const persistConfig = {
  key: 'root',
  //blacklist: ['acticlesReducers'],
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middleware = [thunk];
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
