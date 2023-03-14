import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  USER_LOGIN,
  USER_LOGIN_FRESH,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FRESH
} from "./actionTypes"
import axios from "axios";

export const userLogin = (user) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Authentication/login";
  console.log(user)
  console.log(url);

  const formData = {
    email: user.email,
    password: user.password,

  };
  return dispatch => {
    console.log("-in the dispatch----")
    console.log(url)
    console.log(formData)

    const headers = {
      "Content-Type": "application/json",
      // 'content-type': 'application/x-www-form-urlencoded'

      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        localStorage.setItem("jwt", JSON.stringify(response.data));
        console.log(response);
        dispatch({
          type: USER_LOGIN,
          payload: response,
          status: "Success",
        });
      })
      .catch(err => {
        dispatch({
          type: USER_LOGIN,
          //payload: response,
          status: "Failed",
        });
      });
  };

};

export const userLoginFresh = () => {
  console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: USER_LOGIN_FRESH,
      status: false,
    });
};

export const forgetPasswordAction = (token, password, confirmPassword) => {

  var url = process.env.REACT_APP_LOCALHOST + "/Authentication/reset-password";

  const formData = {
    token: token,
    password: password,
    confirm_password: confirmPassword,

  };
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // 'content-type': 'application/x-www-form-urlencoded'

      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: FORGET_PASSWORD,
          //payload: response,
          status: "Success",
        });
      })
      .catch(err => {
        dispatch({
          type: FORGET_PASSWORD,
          //payload: response,
          status: "Failed",
        });
      });
  };

};

export const forgetPasswordFresh = () => {
  console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: FORGET_PASSWORD_FRESH,
      status: false,
    });
};



export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}