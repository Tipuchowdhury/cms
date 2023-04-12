import {
  ADD_COUPON,
  ADD_COUPON_FRESH,
  GET_ALL_COUPON,
  GET_ALL_COUPON_FRESH,
  COUPON_EDIT,
  COUPON_EDIT_FRESH,
  COUPON_DELETE,
  COUPON_DELETE_FRESH,
  COUPON_STATUS_EDIT,
  COUPON_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCouponAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Post"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            coupon_id: id,
          }
        })
      : null
  const formData = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: ADD_COUPON,
          payload: response.data,
          status: "Success",
        })
        toast.success("Coupon Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: ADD_COUPON,
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addCouponFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_COUPON_FRESH,
      status: false,
    })
}

export const getAllCouponAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Get"
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
          type: GET_ALL_COUPON,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_COUPON,
          status: "Failed",
        })
      })
  }
}

export const getAllCouponFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_COUPON_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const couponEditAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Put"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            coupon_id: id,
          }
        })
      : null
  const formData = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: COUPON_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponEditFresh = () => {
  return dispatch => {
    dispatch({
      type: COUPON_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const couponStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Put"
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
          type: COUPON_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: COUPON_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const couponDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Delete"
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
          type: COUPON_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: COUPON_DELETE_FRESH,
      status: false,
    })
}
