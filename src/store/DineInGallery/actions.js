import {
  ADD_DINE_IN_CARD,
  ADD_DINE_IN_CARD_FRESH,
  GET_ALL_DINE_IN_CARD,
  GET_ALL_DINE_IN_CARD_FRESH,
  DINE_IN_CARD_EDIT,
  DINE_IN_CARD_EDIT_FRESH,
  DINE_IN_CARD_DELETE,
  DINE_IN_CARD_DELETE_FRESH,
  DINE_IN_CARD_STATUS_EDIT,
  DINE_IN_CARD_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_DINE_IN_CARD,
  SERVER_SIDE_PAGINATION_DINE_IN_CARD_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_DINE_IN_CARD_FRESH,
  GET_DINE_IN_CARD_BY_ID,
  GET_DINE_IN_CARD_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addDineInCardAction = (id, data, pictures) => {
  console.log(id, data, pictures)
  var url = process.env.REACT_APP_LOCALHOST + "/DineInCard/Post"

  const dataObject = {
    _id: id,
    ...data,
  }
  const formData = convertToFormData(dataObject)

  let i = 0
  pictures?.forEach(index => {
    formData.append("images", pictures[i])
    i++
  })

  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: "ADD_DINE_IN_CARD",
          payload: response.data,
          status: "Success",
        })
        // toast.success("Dine In Card Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: "ADD_DINE_IN_CARD",
          payload: error,
          status: "Failed",
        })
        // toast.error("Failed to add")
      })
  }
}

export const addDineInCardFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_DINE_IN_CARD_FRESH,
      status: false,
    })
}

export const getAllDineInCardAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/DineInCard/Get"
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
          type: GET_ALL_DINE_IN_CARD,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_DINE_IN_CARD,
          status: "Failed",
        })
      })
  }
}

export const getAllDineInCardFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_DINE_IN_CARD_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const dineInCardEditAction = (data, pictures, previous_image) => {
  var url = process.env.REACT_APP_LOCALHOST + "/DineInCard/Put"

  console.log(data, pictures, previous_image)

  const dataObject = {
    ...data,
  }
  const formData = convertToFormData(dataObject)

  let j = 0
  pictures?.forEach(index => {
    formData.append("images", pictures[j])
    j++
  })
  let i = 0
  previous_image?.forEach(index => {
    formData.append("old_images", previous_image[i])
    i++
  })
  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: DINE_IN_CARD_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DINE_IN_CARD_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const dineInCardEditFresh = () => {
  return dispatch => {
    dispatch({
      type: DINE_IN_CARD_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const dineInCardStatusEditAction = data => {
  //var url = process.env.REACT_APP_LOCALHOST + "/DineInCard/Put"
  var url = `${process.env.REACT_APP_LOCALHOST}/DineInCard/isActive?id=${data._id}&is_active=${data.is_active}`
  const dataObject = {
    _id: data._id,
    is_active: data.is_active,
  }

  const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: DINE_IN_CARD_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DINE_IN_CARD_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const dineInCardStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: DINE_IN_CARD_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const dineInCardDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/DineInCard/Delete"
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
          type: "DINE_IN_CARD_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "DINE_IN_CARD_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const dineInCardDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DINE_IN_CARD_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationDineInCardAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/DineInCard/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_DINE_IN_CARD,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_DINE_IN_CARD,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationDineInCardSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/DineInCard/Search?title=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_DINE_IN_CARD_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_DINE_IN_CARD_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchDineInCardFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_DINE_IN_CARD_FRESH,
      status: false,
      payload: null,
    })
}

export const getDineInCardByIdAction = id => {
  //var url = process.env.REACT_APP_LOCALHOST + "/Zone/Get"
  var url = process.env.REACT_APP_LOCALHOST + `/DineInCard/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_DINE_IN_CARD_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_DINE_IN_CARD_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getDineInCardByIdActionFresh = () => {
  console.log("=========hererererer=======")
  return dispatch =>
    dispatch({
      type: GET_DINE_IN_CARD_BY_ID_FRESH,
      status: false,
    })
}
