import {
  SAVE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  GET_TOKEN,
  SAVE_TOKEN_VIA_REFRESH,
} from '../actions/authenticationAction';

const initialState = {
  authentication: [],
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN: {
      const {jwtToken, expiry_Date, refresh_token, email} = action.payload;
      return {
        ...state,
        authentication: [
          ...state.authentication,
          {jwtToken, expiry_Date, refresh_token, email},
        ],
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
        ...state,
        authentication: [{isSignedOut: true}],
      };
    }
    case GET_TOKEN: {
      return {
        ...state,
      };
    }
    case SAVE_TOKEN_VIA_REFRESH: {
      return {
        ...state,
        authentication: [...state.authentication.slice(-1), action.payload],
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
