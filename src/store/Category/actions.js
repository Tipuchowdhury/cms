import {
  ADD_CATEGORY,
  ADD_CATEGORY_FRESH,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_FRESH,
  CATEGORY_NAME_EDIT,
  CATEGORY_NAME_EDIT_FRESH,
  CATEGORY_DELETE,
  CATEGORY_DELETE_FRESH,
} from "./actionTypes"
import axios from "axios"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCategoryAction = (name, id) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Post"

  const formData = {
    _id: id,
    category_name: name,
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
          type: "ADD_CATEGORY",
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: "ADD_CATEGORY",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addCategoryFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_CATEGORY_FRESH,
      status: false,
    })
}

export const getAllCategoryAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Get"
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
          type: GET_ALL_CATEGORY,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_CATEGORY,
          status: "Failed",
        })
      })
  }
}

export const getAllCategoryFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_CATEGORY_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const categoryNameEditAction = (name, id) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Put"
  const formData = {
    _id: id,
    category_name: name,
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
          type: CATEGORY_NAME_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: CATEGORY_NAME_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const categoryNameEditFresh = () => {
  return dispatch => {
    dispatch({
      type: CATEGORY_NAME_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const categoryDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Delete"
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
          type: "CATEGORY_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "CATEGORY_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const categoryDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: CATEGORY_DELETE_FRESH,
      status: false,
    })
}
