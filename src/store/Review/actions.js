import {
  ADD_REVIEW,
  ADD_REVIEW_FRESH,
  GET_ALL_REVIEW,
  GET_ALL_REVIEW_FRESH,
  REVIEW_EDIT,
  REVIEW_EDIT_FRESH,
  REVIEW_DELETE,
  REVIEW_DELETE_FRESH,
  REVIEW_STATUS_EDIT,
  REVIEW_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addReviewAction = addData => {
  var url = process.env.REACT_APP_LOCALHOST + "/Review/Post"
  const review_id = uuidv4()

  let formData = {
    _id: review_id,
    ...addData,
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
          type: ADD_REVIEW,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_REVIEW,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addReviewFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_REVIEW_FRESH,
      status: false,
    })
}

export const getAllReviewAction = () => {
  // console.log("hi");
  var url = process.env.REACT_APP_LOCALHOST + "/Review/Get"
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
          type: GET_ALL_REVIEW,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_REVIEW,
          status: "Failed",
        })
      })
  }
}

export const getAllReviewFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_REVIEW_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const reviewUpdateAction = editData => {
  console.log(editData)

  var url = process.env.REACT_APP_LOCALHOST + "/Review/Put"

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
          type: REVIEW_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REVIEW_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const reviewUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REVIEW_EDIT_FRESH,
      status: false,
    })
}

export const reviewStatusUpdateAction = editData => {
  var url = process.env.REACT_APP_LOCALHOST + "/Review/Put"
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
          type: REVIEW_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REVIEW_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const reviewStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: REVIEW_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const reviewDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Review/Delete"
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
          type: REVIEW_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: REVIEW_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const reviewDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: REVIEW_DELETE_FRESH,
      status: false,
    })
}
