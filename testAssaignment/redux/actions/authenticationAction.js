import Client from '../../API/Client';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_TOKEN_VIA_REFRESH = 'SAVE_TOKEN_VIA_REFRESH';

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

export function _refreshToken() {
  return async function (dispatch) {
    try {
      const res = await Client.refreshTheToken();
      if (res.status == 200) {
        dispatch({
          type: 'SAVE_TOKEN_VIA_REFRESH',
          payload: {
            jwtToken: res.data?.access_token,
            expiry_Date: '',
            refresh_token: res.data?.refresh_token,
            email: res.data?.email,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const saveTokenViaRefresh = () => {
  return {
    type: SAVE_TOKEN_VIA_REFRESH,
  };
};
