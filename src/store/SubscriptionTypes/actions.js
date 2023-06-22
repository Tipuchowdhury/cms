import {
  ADD_SUBSCRIPTION_TYPE,
  ADD_SUBSCRIPTION_TYPE_FRESH,
  GET_ALL_SUBSCRIPTION_TYPE,
  GET_ALL_SUBSCRIPTION_TYPE_FRESH,
  SUBSCRIPTION_TYPE_EDIT,
  SUBSCRIPTION_TYPE_EDIT_FRESH,
  SUBSCRIPTION_TYPE_DELETE,
  SUBSCRIPTION_TYPE_DELETE_FRESH,
  SUBSCRIPTION_TYPE_STATUS_EDIT,
  SUBSCRIPTION_TYPE_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addSubscriptionTypeAction = (id, addData, details) => {
  var url = process.env.REACT_APP_LOCALHOST + "/SubscriptionType/Post"

  // let i = 0,
  //   detailsData = []
  // details?.forEach(index => {
  //   detailsData.push(details[i].details)
  //   i++
  // })

  const detailsData = details
    .filter(detail => detail.details != "")
    .map(item => {
      return item.details
    })

  const formData = {
    _id: id,
    ...addData,
    details: detailsData,
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
          type: ADD_SUBSCRIPTION_TYPE,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_SUBSCRIPTION_TYPE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addSubscriptionTypeFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_SUBSCRIPTION_TYPE_FRESH,
      status: false,
    })
}

export const getAllSubscriptionTypeAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/SubscriptionType/Get"
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
          type: GET_ALL_SUBSCRIPTION_TYPE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_SUBSCRIPTION_TYPE,
          status: "Failed",
        })
      })
  }
}

export const getAllSubscriptionTypeFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_SUBSCRIPTION_TYPE_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const subscriptionTypeUpdateAction = (editData, details) => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/SubscriptionType/Put"
  // let i = 0,
  //   detailsData = []
  // details?.forEach(index => {
  //   detailsData.push(details[i].details)
  //   i++
  // })

  const detailsData = details
    .filter(detail => detail.details != "")
    .map(item => {
      return item.details
    })

  const formData = {
    ...editData,
    details: detailsData,
  }
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
          type: SUBSCRIPTION_TYPE_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTION_TYPE_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const subscriptionTypeUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: SUBSCRIPTION_TYPE_EDIT_FRESH,
      status: false,
    })
}

export const subscriptionTypeStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/SubscriptionType/Put"
  const formData = {
    _id: editData.subscriptionTypeId,
    name: editData.subscriptionTypeName,
    is_delivary_free: editData.deliveryFree,
    is_unlimited_free_delivary: editData.unlimitedFreeDelivery,
    free_delivary_amount_limit: editData.freeDeliveryAmountLimit,
    free_delivary_order_limit: editData.freeDeliveryOrderLimit,
    is_has_pick_up_discount: editData.pickupDiscount,
    is_unlimited_pick_up_discount: editData.unlimitedPickupDiscount,
    pick_up_discount_amount_limit: editData.pickupDiscountAmountLimit,
    pick_up_discount_order_limit: editData.pickupDiscountOrderLimit,
    is_active: !editData.isActive,
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
          type: SUBSCRIPTION_TYPE_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTION_TYPE_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const subscriptionTypeStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: SUBSCRIPTION_TYPE_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const subscriptionTypeDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/SubscriptionType/Delete"
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
          type: SUBSCRIPTION_TYPE_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTION_TYPE_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const subscriptionTypeDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: SUBSCRIPTION_TYPE_DELETE_FRESH,
      status: false,
    })
}
