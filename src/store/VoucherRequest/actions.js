import {
  ADD_VOUCHER_REQUEST,
  ADD_VOUCHER_REQUEST_FRESH,
  GET_ALL_VOUCHER_REQUEST,
  GET_ALL_VOUCHER_REQUEST_FRESH,
  VOUCHER_REQUEST_EDIT,
  VOUCHER_REQUEST_EDIT_FRESH,
  VOUCHER_REQUEST_DELETE,
  VOUCHER_REQUEST_DELETE_FRESH,
  VOUCHER_REQUEST_STATUS_EDIT,
  VOUCHER_REQUEST_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_VOUCHER_REQUEST,
  SERVER_SIDE_PAGINATION_VOUCHER_REQUEST_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const voucher_request_data = [
  {
    _id: 1,
    voucher_name: "mehrab elahi",
    user_mobile: "01857102964",
    user_name: "249.00",
    voucher_request_status: false,
  },
  {
    _id: 2,
    voucher_name: "Mohiuddin Khan",
    user_mobile: "01935735393",
    user_name: "468.00",
    voucher_request_status: true,
  },
  {
    _id: 3,
    voucher_name: "Md Rashed",
    user_mobile: "01642912431",
    user_name: "129.00",
    voucher_request_status: true,
  },
  {
    _id: 4,
    voucher_name: "Pk Cynthia",
    user_mobile: "01739049925",
    user_name: "132.00",
    voucher_request_status: true,
  },
  {
    _id: 5,
    voucher_name: "Akil Turzo",
    user_mobile: "01711155333",
    user_name: "124.50",
    voucher_request_status: true,
  },
  {
    _id: 6,
    voucher_name: "Abidul Kabir",
    user_mobile: "01761001184",
    user_name: "259.00",
    voucher_request_status: false,
  },
  {
    _id: 7,
    voucher_name: "Masfiq Mahmud",
    user_mobile: "01876892094",
    user_name: "144.00",
    voucher_request_status: false,
  },
  {
    _id: 8,
    voucher_name: "Raiyan rahman",
    user_mobile: "01717763533",
    user_name: "320.50",
    voucher_request_status: false,
  },
  {
    _id: 9,
    voucher_name: "Tazin Hasan",
    user_mobile: "01743170357",
    user_name: "492.00",
    voucher_request_status: false,
  },
  {
    _id: 10,
    voucher_name: "MUHAMMAD JULIUS",
    user_mobile: "01711908223",
    user_name: "320.00",
    voucher_request_status: false,
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addVoucherRequestAction = addData => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherRequest/Post"

  // console.log(routes);

  const val = uuidv4()

  // console.log(data);

  const formData = {
    _id: val,
    order_id: addData.order_id,
    voucher_request_amount: addData.voucher_request_amount,
    voucher_request_reason: addData.voucher_request_reason,
    is_active: !addData.voucher_request_status,
  }
  console.log(formData)
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
          type: ADD_VOUCHER_REQUEST,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_VOUCHER_REQUEST,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addVoucherRequestFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_VOUCHER_REQUEST_FRESH,
      status: false,
    })
}

export const getAllVoucherRequestAction = () => {
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
          type: GET_ALL_VOUCHER_REQUEST,
          payload: voucher_request_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_VOUCHER_REQUEST,
          status: "Failed",
        })
      })
  }
}

export const getAllVoucherRequestFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_VOUCHER_REQUEST_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const voucherRequestUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/VoucherRequest/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            voucher_request_id: editData._id,
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
          type: VOUCHER_REQUEST_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VOUCHER_REQUEST_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherRequestUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: VOUCHER_REQUEST_EDIT_FRESH,
      status: false,
    })
}

export const voucherRequestStatusUpdateAction = editData => {
  // var url = process.env.REACT_APP_LOCALHOST + "/VoucherRequest/Put"

  var url = `${process.env.REACT_APP_LOCALHOST}/VoucherRequest/IsApproved?id=${editData.voucher_request_id}&is_approved=${editData.is_approved}`
  // const objectData = editData
  // const formData = convertToFormData(objectData)

  const formData = {}

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    // dispatch({
    //   type: VOUCHER_REQUEST_STATUS_EDIT,
    //   payload: [],
    //   status: "Success",
    // })
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: VOUCHER_REQUEST_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VOUCHER_REQUEST_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherRequestStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: VOUCHER_REQUEST_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const voucherRequestDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherRequest/Delete"
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
          type: VOUCHER_REQUEST_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VOUCHER_REQUEST_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherRequestDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: VOUCHER_REQUEST_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationVoucherRequestAction = (
  index,
  limit,
  filters
) => {
  // console.log("filters :", filters)
  filters = filters ? new URLSearchParams(filters).toString() : ""

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/VoucherRequest/Search?page=${index}&limit=${limit}${
      filters ? "&" + filters : ""
    }`
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
          type: SERVER_SIDE_PAGINATION_VOUCHER_REQUEST,
          payload: response.data,
          //payload: voucher_request_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_VOUCHER_REQUEST,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationVoucherRequestFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_VOUCHER_REQUEST_FRESH,
      status: false,
      payload: null,
    })
}
