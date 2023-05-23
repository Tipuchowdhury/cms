import { convertToFormData } from "helpers/functions"
import {
  ADD_CATEGORY,
  ADD_CATEGORY_FRESH,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_FRESH,
  CATEGORY_NAME_EDIT,
  CATEGORY_NAME_EDIT_FRESH,
  CATEGORY_STATUS_EDIT,
  CATEGORY_STATUS_EDIT_FRESH,
  CATEGORY_DELETE,
  CATEGORY_DELETE_FRESH,
  SERVER_SIDE_PAGINATION_CATEGORY,
  SERVER_SIDE_PAGINATION_CATEGORY_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_CATEGORY_FRESH,
} from "./actionTypes"
import axios from "axios"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCategoryAction = (name, id, restaurant, image) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Post"

  const dataObject = {
    _id: id,
    category_name: name,
    restaurant_id: restaurant,
    image: image,
  }

  const formData = convertToFormData(dataObject)

  //console.log(formData);
  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
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

export const categoryNameEditAction = (
  name,
  id,
  restaurant,
  image,
  is_active
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Put"

  const dataObject = {
    _id: id,
    category_name: name,
    restaurant_id: restaurant,
    image: image,
    is_active: is_active,
  }

  const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",

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

export const categoryStatusEditAction = (
  name,
  id,
  restaurant,
  image,
  is_active
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Category/Put"
  const dataObject = {
    _id: id,
    category_name: name,
    restaurant_id: restaurant,
    image: image,
    is_active: !is_active,
  }

  const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: CATEGORY_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: CATEGORY_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const categoryStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: CATEGORY_STATUS_EDIT_FRESH,
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

export const getServerSidePaginationCategoryAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Category/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_CATEGORY,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CATEGORY,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationCategorySearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/Category/Search?name=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CATEGORY_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CATEGORY_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchCategoryFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_CATEGORY_FRESH,
      status: false,
      payload: null,
    })
}
