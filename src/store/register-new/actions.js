import {
  REGISTER_USER,
  REGISTER_USER_FRESH,
  UPLOAD_TOKEN,
  UPLOAD_TOKEN_FRESH,
  GET_PASSWORD_RECOVER_TOKEN_BY_MAIL,
  GET_PASSWORD_RECOVER_TOKEN_BY_MAIL_FRESH,
  GET_ALL_ROLES,
  GET_ALL_USERS,
  USER_UPDATE,
  USER_UPDATE_FRESH,
  USER_STATUS_UPDATE,
  USER_STATUS_UPDATE_FRESH,
  USER_DELETE,
  USER_DELETE_FRESH,
  SERVER_SIDE_PAGINATION_USER,
  SERVER_SIDE_PAGINATION_USER_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_USER_FRESH,
  GET_USER_BY_ID,
  GET_USER_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"

// token
// var authUser = JSON.parse(localStorage.getItem("user"));
// console.log(authUser.token);

export const userRegistrationNew = (user, file, role) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Authentication/register"

  let formData = new FormData()
  formData.append("first_name", user.first_name)
  formData.append("last_name", user.last_name)
  formData.append("present_address", user.present_address)
  formData.append("permanent_address", user.permanent_address)
  formData.append("mobile_number", user.mobileNumber)
  formData.append("email", user.email)
  formData.append("role_id", role)
  formData.append("password", user.password)
  formData.append("confirm_password", user.confirmPassword)
  formData.append("image", file)

  // let formData = {
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     present_address: user.present_address,
  //     permanent_address: user.permanent_address,
  //     mobile_number: user.mobileNumber,
  //     email: user.email,
  //     password: user.password,
  //     confirm_password: user.confirmPassword,
  //     image: file
  // }

  console.log(formData)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // 'content-type': 'application/x-www-form-urlencoded'

      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        //localStorage.setItem("authUser", JSON.stringify(response.data));
        localStorage.setItem("foodi-jwt", JSON.stringify(response.data))
        dispatch({
          type: "REGISTER_USER",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "REGISTER_USER",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const userRegistrationFresh = () => {
  console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REGISTER_USER_FRESH,
      status: false,
    })
}

export const uploadTokenForRegistration = token => {
  console.log(token)
  var url =
    process.env.REACT_APP_LOCALHOST +
    "/Authentication/verify" +
    "?token=" +
    token
  console.log(" lololol")
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      // Authorization: "Bearer " + token,
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: UPLOAD_TOKEN,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: UPLOAD_TOKEN,
          status: "Failed",
        })
        console.log("response")
      })
  }
}

export const uploadTokenForRegistrationFresh = () => {
  return dispatch =>
    dispatch({
      type: UPLOAD_TOKEN_FRESH,
      status: false,
    })
}

export const getForgetPasswordTokenByMail = email => {
  console.log(email)
  var url =
    process.env.REACT_APP_LOCALHOST +
    "/Authentication/GetForgotPasswordToken" +
    "?email=" +
    email
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      // Authorization: "Bearer " + token,
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_PASSWORD_RECOVER_TOKEN_BY_MAIL,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_PASSWORD_RECOVER_TOKEN_BY_MAIL,
          status: "Failed",
        })
        console.log("response")
      })
  }
}

export const getForgetPasswordTokenByMailFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_PASSWORD_RECOVER_TOKEN_BY_MAIL_FRESH,
      status: false,
    })
}

export const getAllUsersRolesAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Role/Get"
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_ROLES,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_ROLES,
          status: "Failed",
        })
        console.log("response")
      })
  }
}

export const getAllAdminUsersAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/User/Get"
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_USERS,
          status: "Failed",
        })
        console.log("response")
      })
  }
}

export const userUpdateAction = (registerInfo, file, role) => {
  // console.log(registerInfo, role);

  var url = process.env.REACT_APP_LOCALHOST + "/User/Put"
  const dataObject = {
    _id: registerInfo.id,
    first_name: registerInfo.first_name,
    last_name: registerInfo.last_name,
    image: file,
    present_address: registerInfo.present_address,
    permanent_address: registerInfo.permanent_address,
    mobile_number: registerInfo.mobileNumber,
    email: registerInfo.email,
    role_id: role,
    is_active: registerInfo.is_active,
  }

  const formData = convertToFormData(dataObject)
  // console.log(formData);
  return dispatch => {
    const headers = {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: USER_UPDATE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: USER_UPDATE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const userUpdateFresh = () => {
  console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: USER_UPDATE_FRESH,
      status: false,
    })
}

export const userStatusUpdateAction = registerInfo => {
  var url = process.env.REACT_APP_LOCALHOST + "/User/Put"
  const dataObject = registerInfo
  const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: USER_STATUS_UPDATE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: USER_STATUS_UPDATE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const userStatusUpdateFresh = () => {
  console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: USER_STATUS_UPDATE_FRESH,
      status: false,
    })
}

export const userDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/User/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: USER_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: USER_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const userDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: USER_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationUserAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/User/Search?page=${index}&limit=${limit}`

  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_USER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_USER,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationUserSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/User/Search?name=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_USER_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_USER_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchUserFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_USER_FRESH,
      status: false,
      payload: null,
    })
}
