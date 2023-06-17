import {
  ADD_RIDER,
  ADD_RIDER_FRESH,
  GET_ALL_RIDER,
  GET_ALL_RIDER_FRESH,
  RIDER_EDIT,
  RIDER_EDIT_FRESH,
  RIDER_DELETE,
  RIDER_DELETE_FRESH,
  RIDER_STATUS_EDIT,
  RIDER_STATUS_EDIT_FRESH,
  RIDER_APPROVED_EDIT,
  RIDER_APPROVED_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_RIDER,
  SERVER_SIDE_PAGINATION_RIDER_FRESH,
  GET_RIDER_BY_ID,
  GET_RIDER_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))

export const addRiderAction = (id, data, selectedZone) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Rider/Post"

  // console.log(selectedZone);

  const zone =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            zone_id: item.value,
            rider_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    zones: zone,
  }
  //console.log(dataObject)
  const formData = convertToFormData(dataObject)
  return dispatch => {
    // console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        // console.log("response :", response)
        dispatch({
          type: ADD_RIDER,
          payload: response.data,
          status: "Success",
        })
        toast.success("Rider Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: ADD_RIDER,
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addRiderFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_RIDER_FRESH,
      status: false,
    })
}

export const getAllRiderAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Rider/Get"
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
          type: GET_ALL_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_RIDER,
          status: "Failed",
        })
      })
  }
}

export const getAllRiderFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_RIDER_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const riderEditAction = (id, data, selectedZone) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Rider/Put"

  const zone =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            zone_id: item.value,
            rider_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    zones: zone,
  }
  console.log(dataObject)
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
          type: RIDER_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderEditFresh = () => {
  return dispatch => {
    dispatch({
      type: RIDER_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const riderStatusEditAction = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Rider/isActive?id=${data._id}&is_active=${data.is_active}`

  const dataObject = {
    _id: data._id,
    is_active: data.is_active,
  }
  // console.log(formData)
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
          type: RIDER_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: RIDER_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const riderApprovedEditAction = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Rider/IsApprove?id=${data._id}&is_approve=${data.is_approve}`

  const dataObject = {
    _id: data._id,
    is_approve: data.is_approve,
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
          type: RIDER_APPROVED_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: RIDER_APPROVED_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderApprovedEditFresh = () => {
  return dispatch => {
    dispatch({
      type: RIDER_APPROVED_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const riderDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Rider/Delete"
  // console.log(id)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: "RIDER_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "RIDER_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const riderDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: RIDER_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationRiderAction = (index, limit, filters) => {
  // console.log("filters :", filters)
  filters = filters ? new URLSearchParams(filters).toString() : ""

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Rider/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
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
          type: SERVER_SIDE_PAGINATION_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_RIDER,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationRiderFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_RIDER_FRESH,
      status: false,
      payload: null,
    })
}

export const getRiderByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + `/Rider/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_RIDER_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_RIDER_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getRiderByIdActionFresh = () => {
  console.log("=========hererererer=======")
  return dispatch =>
    dispatch({
      type: GET_RIDER_BY_ID_FRESH,
      status: false,
    })
}
