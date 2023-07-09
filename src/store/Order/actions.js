import {
  ADD_ORDER,
  ADD_ORDER_FRESH,
  GET_ALL_ORDER,
  GET_ALL_ORDER_FRESH,
  ORDER_EDIT,
  ORDER_EDIT_FRESH,
  ORDER_DELETE,
  ORDER_DELETE_FRESH,
  ORDER_STATUS_EDIT,
  ORDER_STATUS_EDIT_FRESH,
  GET_AVAILABLE_RIDER,
  ASSIGN_RIDER,
  ASSIGN_RIDER_FRESH,
  SERVER_SIDE_PAGINATION_ORDER,
  SERVER_SIDE_PAGINATION_ORDER_FRESH,
  GET_ORDER_INVOICE,
  GET_ORDER_INVOICE_FRESH,
  GET_RIDER_INVOICE,
  GET_RIDER_INVOICE_FRESH,
  TRACK_RIDER,
  TRACK_RIDER_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData, convertToQueryParams } from "helpers/functions"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const getAllOrderAction = (page, countPerPage) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/Search?page=${page}&limit=${countPerPage}`
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
          type: GET_ALL_ORDER,
          payload: response.data,
          // payload: sampleData,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_ORDER,
          status: "Failed",
        })
      })
  }
}

export const getAllOrderFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_ORDER_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const orderEditAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Put"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            order_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  //  console.log(dataObject)
  const formData = convertToFormData(dataObject)
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
          type: ORDER_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ORDER_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderEditFresh = () => {
  return dispatch => {
    dispatch({
      type: ORDER_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const orderStatusEditAction = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/ChangeOrderStatus?order_id=${data._id}&order_status=${data.status}`
  let formData = { order_id: data._id, order_status: data.status }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, { headers: headers })
      .then(response => {
        dispatch({
          type: ORDER_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ORDER_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: ORDER_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const orderDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Delete"
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
          type: "ORDER_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "ORDER_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: ORDER_DELETE_FRESH,
      status: false,
    })
}

export const getAvailableRider = order_id => {
  console.log("order_id :", order_id)
  var url =
    process.env.REACT_APP_LOCALHOST +
    "/Order/GetCustomBranchRidersWithLocationByOrderId"
  const params = { order_id: order_id }
  // const mockdata = {
  //   branch: {
  //     _id: "241dc76a-9320-4b47-b7af-aacb9aaea235",
  //     name: "Kutumbari",
  //     address: "GEC Circle",
  //     mobile_number: "01833623472",
  //     location: { lat: 23.8655, lng: 90.435 },
  //   },
  //   customer: {
  //     _id: "241dc76a-9320-4b47-b7af-aacb9aae1135",
  //     first_name: "Jhon",
  //     last_name: "Doe",
  //     address: "Mehedibag",
  //     mobile_number: "01872721234",
  //     location: { lat: 23.8155, lng: 90.435 },
  //     distance_in_meter: {
  //       from_branch: 3321,
  //     },
  //   },
  //   riders: [
  //     {
  //       _id: "241dc76a-9320-4b47-b7af-aacb9aae1146",
  //       first_name: "Sultan",
  //       last_name: "Mirza",
  //       mobile_number: "01533819558",
  //       location: { lat: 23.8153, lng: 90.4165 },
  //       current_order: 2,
  //       distance_in_meter: {
  //         from_branch: 1223,
  //       },
  //     },
  //     {
  //       _id: "241dc76a-9320-4b47-b7af-aacb9aae2246",
  //       first_name: "Hasan",
  //       last_name: "Raza",
  //       mobile_number: "019284923993",
  //       location: { lat: 23.9455, lng: 90.544 },
  //       current_order: 1,
  //       distance_in_meter: {
  //         from_branch: 765,
  //       },
  //     },
  //   ],
  // }
  // return dispatch => {
  //   dispatch({
  //     type: GET_AVAILABLE_RIDER,
  //     payload: mockdata,
  //     status: "Success",
  //   })
  // }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_AVAILABLE_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_AVAILABLE_RIDER,
          status: "Failed",
        })
      })
  }
}

export const orderAssignRider = (order_id, rider_id) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/AssaignRider?order_id=${order_id}&rider_id=${rider_id}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, { headers: headers })
      .then(response => {
        dispatch({
          type: ASSIGN_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ASSIGN_RIDER,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const assignRiderFresh = () => {
  return dispatch => {
    dispatch({
      type: ASSIGN_RIDER_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const getServerSidePaginationOrderAction = (index, limit, filters) => {
  console.log("filters :", filters)
  filters = convertToQueryParams(filters)
  console.log("filters :", filters)

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Order/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
  //var url = process.env.REACT_APP_LOCALHOST + `/City/Search?page=${index}&limit=4`;
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
          type: SERVER_SIDE_PAGINATION_ORDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_ORDER,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationOrderFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_ORDER_FRESH,
      status: false,
      payload: null,
    })
}

export const getOrderInvoice = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Invoice"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_ORDER_INVOICE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INVOICE,
          status: "Failed",
        })
      })
  }
}

export const getOrderInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_ORDER_INVOICE_FRESH,
      status: false,
      payload: null,
    })
}

export const getRiderInvoice = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/RiderInvoice"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_RIDER_INVOICE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_RIDER_INVOICE,
          status: "Failed",
        })
      })
  }
}

export const getRiderInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_RIDER_INVOICE_FRESH,
      status: false,
      payload: null,
    })
}

export const trackRider = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/GetOrderTrackByOrderId"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: TRACK_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: TRACK_RIDER,
          status: "Failed",
        })
      })
  }
}

export const trackRiderFresh = () => {
  return dispatch =>
    dispatch({
      type: TRACK_RIDER_FRESH,
      status: false,
      payload: null,
    })
}
