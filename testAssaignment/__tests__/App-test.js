/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Home from '../screens/Home';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import TopNews from '../screens/TopNews';
import Search from '../screens/Search';
import Article from '../screens/Articles';
import Router from '../screens/Router';

// Note: test renderer must be required after react-native.
import renderer, {act, create} from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../redux/reducers';
import Axios from 'axios';
const store = createStore(rootReducer, {});
const reduxTree = create(
  <Provider store={store}>
    <App />
  </Provider>,
);

// ALERT: TODO - add axios tests for the api

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));
it('renders correctly', () => {
  renderer.create(<App />);
});

const tree = create(<App />);
test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
