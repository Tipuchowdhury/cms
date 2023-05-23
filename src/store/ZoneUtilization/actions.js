import {
  ADD_ZONE_UTILIZATION,
  ADD_ZONE_UTILIZATION_FRESH,
  GET_ALL_ZONE_UTILIZATION,
  GET_ALL_ZONE_UTILIZATION_FRESH,
  ZONE_UTILIZATION_EDIT,
  ZONE_UTILIZATION_EDIT_FRESH,
  ZONE_UTILIZATION_DELETE,
  ZONE_UTILIZATION_DELETE_FRESH,
  ZONE_UTILIZATION_STATUS_EDIT,
  ZONE_UTILIZATION_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const zone_utilization_data = [
  {
    _id: 1,
    online_rider: 50,
    rider_with_one_order: 10,
    rider_with_two_order: 10,
    rider_with_three_order: 10,
    total_active_order: 25,
    total_unassigned_order: 178,
    zone_data: [
      {
        zone_id: 1,
        zone_name: "Tristate",
        open_rider: 51,
        rider_with_one_order: 3,
        rider_with_two_order: 2,
        rider_with_three_order: 1,
        total_delivered_order: 12,
        avg_delivery_time: "198min",
        avg_acception_rate: "98.55%",
        total_cancelled_order: 179,
        avg_cancel_rate: "9.27%",
        order_cancelled_for_rider_issue: 13,
      },
      {
        zone_id: 2,
        zone_name: "Chittagong",
        open_rider: 51,
        rider_with_one_order: 3,
        rider_with_two_order: 2,
        rider_with_three_order: 1,
        total_delivered_order: 12,
        avg_delivery_time: "198min",
        avg_acception_rate: "98.55%",
        total_cancelled_order: 179,
        avg_cancel_rate: "9.27%",
        order_cancelled_for_rider_issue: 13,
      },
      {
        zone_id: 3,
        zone_name: "Nikunja",
        open_rider: 51,
        rider_with_one_order: 3,
        rider_with_two_order: 2,
        rider_with_three_order: 1,
        total_delivered_order: 12,
        avg_delivery_time: "198min",
        avg_acception_rate: "98.55%",
        total_cancelled_order: 179,
        avg_cancel_rate: "9.27%",
        order_cancelled_for_rider_issue: 13,
      },
      {
        zone_id: 4,
        zone_name: "Bashundhara",
        open_rider: 51,
        rider_with_one_order: 3,
        rider_with_two_order: 2,
        rider_with_three_order: 1,
        total_delivered_order: 12,
        avg_delivery_time: "198min",
        avg_acception_rate: "98.55%",
        total_cancelled_order: 179,
        avg_cancel_rate: "9.27%",
        order_cancelled_for_rider_issue: 13,
      },
      {
        zone_id: 5,
        zone_name: "Lalbagh",
        open_rider: 51,
        rider_with_one_order: 3,
        rider_with_two_order: 2,
        rider_with_three_order: 1,
        total_delivered_order: 12,
        avg_delivery_time: "198min",
        avg_acception_rate: "98.55%",
        total_cancelled_order: 179,
        avg_cancel_rate: "9.27%",
        order_cancelled_for_rider_issue: 13,
      },
    ],
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addZoneUtilizationAction = (addData, routes) => {
  var url = process.env.REACT_APP_LOCALHOST + "/ZoneUtilization/Post"

  // console.log(routes);

  const val = uuidv4()

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            zone_utilization_id: val,
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
          type: ADD_ZONE_UTILIZATION,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_ZONE_UTILIZATION,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addZoneUtilizationFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_ZONE_UTILIZATION_FRESH,
      status: false,
    })
}

export const getAllZoneUtilizationAction = () => {
  // console.log(zone_utilization_data)
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
          type: GET_ALL_ZONE_UTILIZATION,
          payload: zone_utilization_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_ZONE_UTILIZATION,
          status: "Failed",
        })
      })
  }
}

export const getAllZoneUtilizationFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_ZONE_UTILIZATION_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const zoneUtilizationUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/ZoneUtilization/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            zone_utilization_id: editData._id,
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
          type: ZONE_UTILIZATION_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ZONE_UTILIZATION_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const zoneUtilizationUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: ZONE_UTILIZATION_EDIT_FRESH,
      status: false,
    })
}

export const zoneUtilizationStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/ZoneUtilization/Put"
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
          type: ZONE_UTILIZATION_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ZONE_UTILIZATION_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const zoneUtilizationStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: ZONE_UTILIZATION_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const zoneUtilizationDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/ZoneUtilization/Delete"
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
          type: ZONE_UTILIZATION_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ZONE_UTILIZATION_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const zoneUtilizationDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: ZONE_UTILIZATION_DELETE_FRESH,
      status: false,
    })
}
