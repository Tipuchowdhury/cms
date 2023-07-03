import {
  ADD_FAQ,
  ADD_FAQ_FRESH,
  GET_ALL_FAQ,
  GET_ALL_FAQ_FRESH,
  FAQ_EDIT,
  FAQ_EDIT_FRESH,
  FAQ_DELETE,
  FAQ_DELETE_FRESH,
  FAQ_STATUS_EDIT,
  FAQ_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_FAQ,
  SERVER_SIDE_PAGINATION_FAQ_FRESH,
  GET_FAQ_BY_ID,
  GET_FAQ_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addFaqAction = addData => {
  var url = process.env.REACT_APP_LOCALHOST + "/FAQ/Post"
  const faq_id = uuidv4()

  let formData = {
    _id: faq_id,
    ...addData,
  }

  // const formData = convertToFormData(objectData)

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
          type: ADD_FAQ,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_FAQ,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addFaqFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_FAQ_FRESH,
      status: false,
    })
}

export const getAllFaqAction = () => {
  // console.log("hi");
  var url = process.env.REACT_APP_LOCALHOST + "/FAQ/Get"
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
          type: GET_ALL_FAQ,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_FAQ,
          status: "Failed",
        })
      })
  }
}

export const getAllFaqFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_FAQ_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const faqUpdateAction = editData => {
  // console.log(editData, selectedRestaurant);

  var url = process.env.REACT_APP_LOCALHOST + "/FAQ/Put"

  const formData = {
    ...editData,
  }

  // const formData = convertToFormData(objectData)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: FAQ_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: FAQ_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const faqUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: FAQ_EDIT_FRESH,
      status: false,
    })
}

export const faqStatusUpdateAction = editData => {
  // var url = process.env.REACT_APP_LOCALHOST + "/FAQ/Put"
  var url = `${process.env.REACT_APP_LOCALHOST}/FAQ/isActive?id=${editData._id}&is_active=${editData.is_active}`
  const formData = { _id: editData._id, is_active: editData.is_active }
  // const formData = convertToFormData(objectData)
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: FAQ_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: FAQ_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const faqStatusUpdateFresh = () => {
  // console.log("===== I am in the fresh ========")
  return dispatch =>
    dispatch({
      type: FAQ_STATUS_EDIT_FRESH,
      status: false,
    })
}

export const faqDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/FAQ/Delete"
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
          type: FAQ_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: FAQ_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const faqDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: FAQ_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationFaqAction = (index, limit, filters) => {
  filters = filters ? new URLSearchParams(filters).toString() : ""

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/FAQ/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
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
          type: SERVER_SIDE_PAGINATION_FAQ,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_FAQ,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationFaqFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_FAQ_FRESH,
      status: false,
      payload: null,
    })
}

export const getFaqByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + `/FAQ/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_FAQ_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_FAQ_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getFaqByIdActionFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_FAQ_BY_ID_FRESH,
      status: false,
    })
}
