import {
  ADD_RIDER_LIST,
  ADD_RIDER_LIST_FRESH,
  GET_ALL_RIDER_LIST,
  GET_ALL_RIDER_LIST_FRESH,
  RIDER_LIST_EDIT,
  RIDER_LIST_EDIT_FRESH,
  RIDER_LIST_DELETE,
  RIDER_LIST_DELETE_FRESH,
  RIDER_LIST_STATUS_EDIT,
  RIDER_LIST_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const rider_list_data = [
  {
    _id: 1,
    rider_name: "test. khan",
    phone_number: "0183333333",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 2,
    rider_name: "test2",
    phone_number: "0162222223",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 3,
    rider_name: "Bisawjit",
    phone_number: "01322819394",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 4,
    rider_name: "	Shakib Patoary (PT-Bike)",
    phone_number: "01841120020",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 5,
    rider_name: "Johir Uddin",
    phone_number: "01816445066",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 6,
    rider_name: "Sohag Munshi",
    phone_number: "01855721918",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 7,
    rider_name: "Sabbir Hossain (PT)",
    phone_number: "01625944091",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 8,
    rider_name: "Md. Rezaul Karim",
    phone_number: "01748494189",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 9,
    rider_name: "Md Jakir Hossain",
    phone_number: "01856458023",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
  {
    _id: 10,
    rider_name: "Saiful Islam",
    phone_number: "01701867752",
    online_status: "Offline",
    avg_accpt_rate: "80%",
    avg_cancel_rate: "16%",
    avg_delivery_time: "3433 Minutes",
    total_delivery_order: 19,
    total_cancel_order: 4,
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addRiderListAction = (addData, routes) => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderList/Post"

  // console.log(routes);

  const val = uuidv4()

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            rider_list_id: val,
            is_active: true,
          }
        })
      : null

  // console.log(data);

  const formData = {
    _id: val,
    ...addData,
    routes: data,
  }
  // console.log(formData);
  return dispatch => {
    // console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: ADD_RIDER_LIST,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_RIDER_LIST,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addRiderListFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_RIDER_LIST_FRESH,
      status: false,
    })
}

export const getAllRiderListAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Refund/Get"
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
          type: GET_ALL_RIDER_LIST,
          payload: rider_list_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_RIDER_LIST,
          status: "Failed",
        })
      })
  }
}

export const getAllRiderListFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_RIDER_LIST_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const riderListUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/RiderList/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            rider_list_id: editData._id,
            is_active: true,
          }
        })
      : null
  const formData = { ...editData, routes: data }
  // console.log(formData)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: RIDER_LIST_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_LIST_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderListUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: RIDER_LIST_EDIT_FRESH,
      status: false,
    })
}

export const riderListStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderList/Put"
  const formData = editData

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: RIDER_LIST_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_LIST_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderListStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: RIDER_LIST_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const riderListDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderList/Delete"
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
          type: RIDER_LIST_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_LIST_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderListDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: RIDER_LIST_DELETE_FRESH,
      status: false,
    })
}
