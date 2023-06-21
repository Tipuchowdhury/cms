import {
  ADD_REWARD_LABEL,
  ADD_REWARD_LABEL_FRESH,
  GET_ALL_REWARD_LABEL,
  GET_ALL_REWARD_LABEL_FRESH,
  REWARD_LABEL_EDIT,
  REWARD_LABEL_EDIT_FRESH,
  REWARD_LABEL_DELETE,
  REWARD_LABEL_DELETE_FRESH,
  REWARD_LABEL_STATUS_EDIT,
  REWARD_LABEL_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData } from "helpers/functions"
import moment from "moment"

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addRewardLabelAction = (labelName, thresholdValue) => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardLevel/Post"

  let formData = {
    name: labelName,
    threshold_value: thresholdValue,
  }

  // console.log(dataObject);

  // const formData = convertToFormData(dataObject)

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
          type: ADD_REWARD_LABEL,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_REWARD_LABEL,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addRewardLabelFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_REWARD_LABEL_FRESH,
      status: false,
    })
}

export const getAllRewardLabelAction = () => {
  // console.log("hi");
  var url = process.env.REACT_APP_LOCALHOST + "/RewardLevel/Get"
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
          type: GET_ALL_REWARD_LABEL,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_REWARD_LABEL,
          status: "Failed",
        })
      })
  }
}

export const getAllRewardLabelFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_REWARD_LABEL_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const rewardLabelUpdateAction = editData => {
  // console.log(editData);

  var url = process.env.REACT_APP_LOCALHOST + "/RewardLevel/Put"

  let formData = editData

  // const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: REWARD_LABEL_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REWARD_LABEL_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const rewardLabelUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REWARD_LABEL_EDIT_FRESH,
      status: false,
    })
}

export const rewardLabelStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardLevel/Put"
  const dataObject = editData

  const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: REWARD_LABEL_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REWARD_LABEL_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const rewardLabelStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REWARD_LABEL_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const rewardLabelDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/RewardLevel/Delete"
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
          type: REWARD_LABEL_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REWARD_LABEL_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const rewardLabelDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: REWARD_LABEL_DELETE_FRESH,
      status: false,
    })
}
