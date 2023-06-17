import {
  ADD_REFUND,
  ADD_REFUND_FRESH,
  GET_ALL_REFUND,
  GET_ALL_REFUND_FRESH,
  REFUND_EDIT,
  REFUND_EDIT_FRESH,
  REFUND_DELETE,
  REFUND_DELETE_FRESH,
  REFUND_STATUS_EDIT,
  REFUND_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_REFUND,
  SERVER_SIDE_PAGINATION_REFUND_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const refund_data = [
  {
    _id: 1,
    order_id: 15141,
    customer_name: "mehrab elahi",
    customer_mobile: "01857102964",
    order_total: "249.00",
    refund_amount: 0.0,
    refund_status: false,
    refund_reason: "",
    payment_method: "Cash",
    transaction_id: "",
    payment_id: "abcd1",
    date: "2022-10-18 13:51:15",
  },
  {
    _id: 2,
    order_id: 15119,
    customer_name: "Mohiuddin Khan",
    customer_mobile: "01935735393",
    order_total: "468.00",
    refund_amount: "468.00",
    refund_reason: "",
    refund_status: true,
    payment_method: "Cash",
    transaction_id: "",
    payment_id: "abcd2",
    date: "2022-10-18 12:49:57",
  },
  {
    _id: 3,
    order_id: 15090,
    customer_name: "Md Rashed",
    customer_mobile: "01642912431",
    order_total: "129.00",
    refund_amount: "129.00",
    refund_reason: "",
    refund_status: true,
    payment_method: "Bkash",
    transaction_id: "Of8GqV1PuyGN27EM",
    payment_id: "abcd3",
    date: "2022-10-17 21:40:40",
  },
  {
    _id: 4,
    order_id: 15074,
    customer_name: "Pk Cynthia",
    customer_mobile: "01739049925",
    order_total: "132.00",
    refund_amount: "100.00",
    refund_reason: "",
    refund_status: true,
    payment_method: "Bkash",
    transaction_id: "Lj9xuQvP9RYrda6N",
    payment_id: "abcd4",
    date: "2022-10-17 21:12:02",
  },
  {
    _id: 5,
    order_id: 15072,
    customer_name: "Akil Turzo",
    customer_mobile: "01711155333",
    order_total: "124.50",
    refund_amount: "124.50",
    refund_reason: "ssss",
    refund_status: true,
    payment_method: "Nagad",
    transaction_id: "NGO44p55oB01VnIS",
    payment_id: "abcd5",
    date: "2022-10-17 21:08:40",
  },
  {
    _id: 6,
    order_id: 15054,
    customer_name: "Abidul Kabir",
    customer_mobile: "01761001184",
    order_total: "259.00",
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
    payment_method: "Nagad",
    transaction_id: "tlnIecXsvqzlZzxf",
    payment_id: "abcd6",
    date: "2022-10-17 20:35:34",
  },
  {
    _id: 7,
    order_id: 15043,
    customer_name: "Masfiq Mahmud",
    customer_mobile: "01876892094",
    order_total: "144.00",
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
    payment_method: "Upay",
    transaction_id: "6YkRMzZD9jKS8uIp",
    payment_id: "abcd7",
    date: "2022-10-17 20:20:26",
  },
  {
    _id: 8,
    order_id: 15030,
    customer_name: "Raiyan rahman",
    customer_mobile: "01717763533",
    order_total: "320.50",
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
    payment_method: "Upay",
    transaction_id: "zgZ3wwNnFpZRhD3o",
    payment_id: "abcd8",
    date: "2022-10-17 20:13:12",
  },
  {
    _id: 9,
    order_id: 14963,
    customer_name: "Tazin Hasan",
    customer_mobile: "01743170357",
    order_total: "492.00",
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
    payment_method: "SSL",
    transaction_id: "TuosYRhjdWpWl64b",
    payment_id: "abcd9",
    date: "2022-10-17 18:34:26",
  },
  {
    _id: 10,
    order_id: 14945,
    customer_name: "MUHAMMAD JULIUS",
    customer_mobile: "01711908223",
    order_total: "320.00",
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
    payment_method: "SSL",
    transaction_id: "urzD7OORs97VOH0Q",
    payment_id: "abcd10",
    date: "2022-10-17 18:16:41",
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addRefundAction = addData => {
  var url = process.env.REACT_APP_LOCALHOST + "/Refund/Post"

  // console.log(routes);

  const val = uuidv4()

  // console.log(data);

  const formData = {
    _id: val,
    order_id: addData.order_id,
    refunded_amount: addData.refund_amount,
    refund_reason: addData.refund_reason,
    is_active: !addData.refund_status,
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
          type: ADD_REFUND,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_REFUND,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addRefundFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_REFUND_FRESH,
      status: false,
    })
}

export const getAllRefundAction = () => {
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
          type: GET_ALL_REFUND,
          payload: refund_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_REFUND,
          status: "Failed",
        })
      })
  }
}

export const getAllRefundFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_REFUND_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const refundUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/Refund/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            refund_id: editData._id,
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
          type: REFUND_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REFUND_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const refundUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REFUND_EDIT_FRESH,
      status: false,
    })
}

export const refundStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/Refund/Put"
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
          type: REFUND_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REFUND_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const refundStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REFUND_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const refundDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Refund/Delete"
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
          type: REFUND_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REFUND_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const refundDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: REFUND_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationRefundAction = (index, limit, filters) => {
  // console.log("filters :", filters)
  filters = filters ? new URLSearchParams(filters).toString() : ""

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Refund/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
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
          type: SERVER_SIDE_PAGINATION_REFUND,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_REFUND,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationRefundFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_REFUND_FRESH,
      status: false,
      payload: null,
    })
}
