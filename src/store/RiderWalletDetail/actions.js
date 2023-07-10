import {
  ADD_RIDER_WALLET_DETAIL,
  ADD_RIDER_WALLET_DETAIL_FRESH,
  GET_ALL_RIDER_WALLET_DETAIL,
  GET_ALL_RIDER_WALLET_DETAIL_FRESH,
  RIDER_WALLET_DETAIL_EDIT,
  RIDER_WALLET_DETAIL_EDIT_FRESH,
  RIDER_WALLET_DETAIL_DELETE,
  RIDER_WALLET_DETAIL_DELETE_FRESH,
  RIDER_WALLET_DETAIL_STATUS_EDIT,
  RIDER_WALLET_DETAIL_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_WALLET_DETAIL,
  SERVER_SIDE_PAGINATION_WALLET_DETAIL_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const rider_wallet_detail_data = [
  {
    _id: 1,
    rider_name: "test. khan",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 2,
    rider_name: "test2",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 3,
    rider_name: "Bisawjit",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 4,
    rider_name: "	Shakib Patoary (PT-Bike)",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 5,
    rider_name: "Johir Uddin",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 6,
    rider_name: "Sohag Munshi",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 7,
    rider_name: "Sabbir Hossain (PT)",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 8,
    rider_name: "Md. Rezaul Karim",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 9,
    rider_name: "Md Jakir Hossain",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
  {
    _id: 10,
    rider_name: "Saiful Islam",
    date: "06/06/2023",
    zone: "dhaka",
    order_number: "123",
    total_restaurant_payable_amount: 16,
    total_customer_payable_amount: 16,
    rider_due_adjustment: 19,
    rider_current_wallet: 4,
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addRiderWalletDetailAction = (addData, routes) => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderWalletDetail/Post"

  // console.log(routes);

  const val = uuidv4()

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            rider_wallet_detail_id: val,
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
          type: ADD_RIDER_WALLET_DETAIL,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_RIDER_WALLET_DETAIL,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addRiderWalletDetailFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_RIDER_WALLET_DETAIL_FRESH,
      status: false,
    })
}

export const getAllRiderWalletDetailAction = () => {
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
          type: GET_ALL_RIDER_WALLET_DETAIL,
          payload: rider_wallet_detail_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_RIDER_WALLET_DETAIL,
          status: "Failed",
          // type: GET_ALL_RIDER_WALLET_DETAIL,
          // payload: rider_wallet_detail_data,
          // status: "Success",
        })
      })
  }
}

export const getAllRiderWalletDetailFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_RIDER_WALLET_DETAIL_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const riderWalletDetailUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/RiderWalletDetail/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            rider_wallet_detail_id: editData._id,
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
          type: RIDER_WALLET_DETAIL_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_WALLET_DETAIL_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderWalletDetailUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: RIDER_WALLET_DETAIL_EDIT_FRESH,
      status: false,
    })
}

export const riderWalletDetailStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderWalletDetail/Put"
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
          type: RIDER_WALLET_DETAIL_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_WALLET_DETAIL_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderWalletDetailStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: RIDER_WALLET_DETAIL_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const riderWalletDetailDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/RiderWalletDetail/Delete"
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
          type: RIDER_WALLET_DETAIL_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_WALLET_DETAIL_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderWalletDetailDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: RIDER_WALLET_DETAIL_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationWalletDetailsAction = (
  index,
  limit,
  filters
) => {
  console.log("filters :", filters)
  filters = filters ? new URLSearchParams(filters).toString() : ""
  console.log("filters :", filters)

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/RiderWallet/RiderWalletHistory?page=${index}&limit=${limit}${
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
          type: SERVER_SIDE_PAGINATION_WALLET_DETAIL,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_WALLET_DETAIL,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationWalletDetailsFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_WALLET_DETAIL_FRESH,
      status: false,
      payload: null,
    })
}
