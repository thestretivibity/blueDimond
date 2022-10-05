import {
  SAVE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  GET_TOKEN,
} from '../actions/authenticationAction';

const initialState = {
  authentication: [{}, {}],
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN: {
      const {jwtToken, expiry_Date} = action.payload;
      return {
        ...state,
        authentication: [{jwtToken, expiry_Date}],
      };
    }
    case SIGN_IN: {
      const {isSignedOut} = action.payload;
      return {
        ...state,
        authentication: [
          {isSignedOut: false},
          ...state.authentication.slice(-1),
        ],
      };
    }
    case SIGN_OUT: {
      const {isSignedOut} = action.payload;
      return {
        authentication: [{isSignedOut: true}],
      };
    }
    case GET_TOKEN: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
