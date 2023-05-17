import {
  ADD_REWARD_POINT,
  ADD_REWARD_POINT_FRESH,
  GET_ALL_REWARD_POINT,
  GET_ALL_REWARD_POINT_FRESH,
  REWARD_POINT_NAME_EDIT,
  REWARD_POINT_NAME_EDIT_FRESH,
  REWARD_POINT_DELETE,
  REWARD_POINT_DELETE_FRESH,
  EDIT_REWARD_STATUS,
  EDIT_REWARD_STATUS_FRESH,
} from "./actionTypes"
import axios from "axios"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addRewardPointAction = (id, value, sub_id) => {
  console.log("id :", id)
  var url = process.env.REACT_APP_LOCALHOST + "/RewardPointSetting/Post"

  const formData = {
    _id: id,
    subscription_type_id: sub_id,
    per_point_value: value,
    is_active: true,
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
        dispatch({
          type: "ADD_REWARD_POINT",
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: "ADD_REWARD_POINT",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addRewardPointFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_REWARD_POINT_FRESH,
      status: false,
    })
}

export const getAllRewardPointAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardPointSetting/Get"
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
          type: GET_ALL_REWARD_POINT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_REWARD_POINT,
          status: "Failed",
        })
      })
  }
}

export const getAllRewardPointFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_REWARD_POINT_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const rewardPointNameEditAction = (value, id, sub_id, is_active) => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardPointSetting/Put"
  const formData = {
    _id: id,
    per_point_value: value,
    subscription_type_id: sub_id,
    is_active: is_active,
  }
  // console.log(formData);
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: REWARD_POINT_NAME_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REWARD_POINT_NAME_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const rewardPointNameEditFresh = () => {
  return dispatch => {
    dispatch({
      type: REWARD_POINT_NAME_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const rewardStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardPointSetting/Put"

  const formData = data
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_REWARD_STATUS,
          status: "Success",
        })
        // toast.success("Updated Successfully");
      })
      .catch(error => {
        dispatch({
          type: EDIT_REWARD_STATUS,
          status: "Failed",
        })
        // toast.error("Something went wrong!!");
      })
  }
}

export const rewardStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_REWARD_STATUS_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const rewardPointDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardPointSetting/Delete"
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
          type: "REWARD_POINT_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "REWARD_POINT_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const rewardPointDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: REWARD_POINT_DELETE_FRESH,
      status: false,
    })
}
