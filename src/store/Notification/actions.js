import {
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_FRESH,
  GET_ALL_NOTIFICATION,
  GET_ALL_NOTIFICATION_FRESH,
  NOTIFICATION_EDIT,
  NOTIFICATION_EDIT_FRESH,
  NOTIFICATION_DELETE,
  NOTIFICATION_DELETE_FRESH,
  NOTIFICATION_STATUS_EDIT,
  NOTIFICATION_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_NOTIFICATION,
  SERVER_SIDE_PAGINATION_NOTIFICATION_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_NOTIFICATION_FRESH,
  GET_NOTIFICATION_BY_ID,
  GET_NOTIFICATION_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addNotificationAction = (id, data, selectedUser) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Notification/Post"
  const selectedUserData =
    selectedUser?.length > 0
      ? selectedUser.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            customer_id: item.value,
            device_id: item.device_id,
            notification_id: id,
          }
        })
      : null

  // console.log(selectedUserData);
  const dataObject = {
    _id: id,
    ...data,
    customers: selectedUserData,
  }
  const formData = convertToFormData(dataObject)

  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: response.data,
          status: "Success",
        })
        toast.success("Notification Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addNotificationFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_NOTIFICATION_FRESH,
      status: false,
    })
}

export const getAllNotificationAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Notification/Get"
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
          type: GET_ALL_NOTIFICATION,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_NOTIFICATION,
          status: "Failed",
        })
      })
  }
}

export const getAllNotificationFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_NOTIFICATION_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const notificationEditAction = (id, data, selectedUser) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Notification/Put"
  const selectedUserData =
    selectedUser?.length > 0
      ? selectedUser.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            customer_id: item.value,
            device_id: item.device_id,
            notification_id: id,
          }
        })
      : null
  const dataObject = {
    _id: id,
    ...data,
    customers: selectedUserData,
  }
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
          type: NOTIFICATION_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: NOTIFICATION_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const notificationEditFresh = () => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const notificationStatusEditAction = data => {
  // var url = process.env.REACT_APP_LOCALHOST + "/Notification/Put"
  var url = `${process.env.REACT_APP_LOCALHOST}/Notification/isActive?id=${data._id}&is_active=${data.is_active}`
  const formData = data
  console.log(formData)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: NOTIFICATION_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: NOTIFICATION_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const notificationStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const notificationDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Notification/Delete"
  console.log(id)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: "NOTIFICATION_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "NOTIFICATION_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const notificationDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: NOTIFICATION_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationNotificationAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Notification/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_NOTIFICATION,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_NOTIFICATION,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationNotificationSearchAction = name => {
  console.log(name)
  var url =
    process.env.REACT_APP_LOCALHOST + `/Notification/Search?title=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_NOTIFICATION_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_NOTIFICATION_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchNotificationFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_NOTIFICATION_FRESH,
      status: false,
      payload: null,
    })
}

export const getNotificationByIdAction = id => {
  //var url = process.env.REACT_APP_LOCALHOST + "/Zone/Get"
  var url = process.env.REACT_APP_LOCALHOST + `/Notification/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_NOTIFICATION_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_NOTIFICATION_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getNotificationByIdActionFresh = () => {
  console.log("=========hererererer=======")
  return dispatch =>
    dispatch({
      type: GET_NOTIFICATION_BY_ID_FRESH,
      status: false,
    })
}
