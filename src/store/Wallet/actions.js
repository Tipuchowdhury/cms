import {
  ADD_WALLET,
  ADD_WALLET_FRESH,
  GET_ALL_WALLET,
  GET_ALL_WALLET_FRESH,
  WALLET_EDIT,
  WALLET_EDIT_FRESH,
  WALLET_DELETE,
  WALLET_DELETE_FRESH,
  WALLET_STATUS_EDIT,
  WALLET_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const zone_data = [
  {
    _id: 1,
    rider_name: "Abir",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 2,
    rider_name: "Sarwar",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 3,
    rider_name: "Antar",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 4,
    rider_name: "Shoib",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 5,
    rider_name: "Zabid",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 6,
    rider_name: "Arman",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.55,
    current_wallet_amount: 179,
  },
  {
    _id: 7,
    rider_name: "Shouvik",
    date: "06-03-2023",
    vehicle_type_name: "VAN",
    total_order: 2,
    collected_amount: 1,
    cash_in: 12,
    cash_out: 198,
    adjustment: 98.548,
    current_wallet_amount: 179,
  },
]

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addWalletAction = (addData, routes) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Wallet/Post"

  // console.log(routes);

  const val = uuidv4()

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            wallet_id: val,
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
          type: ADD_WALLET,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_WALLET,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addWalletFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_WALLET_FRESH,
      status: false,
    })
}

export const getAllWalletAction = () => {
  // console.log(wallet_data)
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
          type: GET_ALL_WALLET,
          payload: zone_data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_WALLET,
          status: "Failed",
        })
      })
  }
}

export const getAllWalletFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_WALLET_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const walletUpdateAction = (editData, routes) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/Wallet/Put"

  const data =
    routes?.length > 0
      ? routes.map(item => {
          const route_id = uuidv4()
          return {
            _id: route_id,
            path: item.path,
            wallet_id: editData._id,
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
          type: WALLET_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: WALLET_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const walletUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: WALLET_EDIT_FRESH,
      status: false,
    })
}

export const walletStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/Wallet/Put"
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
          type: WALLET_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: WALLET_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const walletStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: WALLET_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const walletDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Wallet/Delete"
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
          type: WALLET_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: WALLET_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const walletDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: WALLET_DELETE_FRESH,
      status: false,
    })
}
