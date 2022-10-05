export const SAVE_TOKEN = 'RESTOR_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_TOKEN = 'GET_TOKEN';

export const saveToken = (jwtToken, expiry_Date, refresh_token, email) => ({
  type: SAVE_TOKEN,
  payload: {
    jwtToken: jwtToken,
    expiry_Date: expiry_Date,
    refresh_token: refresh_token,
    email: email,
  },
});

export const signIn = () => ({
  type: SIGN_IN,
  payload: {
    isSignedOut: false,
  },
});

export const signOut = () => ({
  type: SIGN_OUT,
  payload: {
    isSignedOut: true,
  },
});

export const getToken = () => ({
  type: GET_TOKEN,
  payload: {},
});
