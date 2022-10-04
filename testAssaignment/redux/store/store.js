import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';

import {createStore, applyMiddleware} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import queryReducer from '../reducers/queryReducer';
const persistConfig = {
  key: 'root',
  //blacklist: ['acticlesReducers'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, queryReducer);

//

const initialState = {};

const middleware = [thunk];

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
