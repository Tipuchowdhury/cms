import {
  ADD_VEHICLE_TYPE,
  ADD_VEHICLE_TYPE_FRESH,
  GET_ALL_VEHICLE_TYPE,
  GET_ALL_VEHICLE_TYPE_FRESH,
  VEHICLE_TYPE_EDIT,
  VEHICLE_TYPE_EDIT_FRESH,
  VEHICLE_TYPE_DELETE,
  VEHICLE_TYPE_DELETE_FRESH,
  EDIT_VEHICLE_TYPE_STATUS,
  EDIT_VEHICLE_TYPE_STATUS_FRESH,
  SERVER_SIDE_PAGINATION_VEHICLE_TYPE,
  SERVER_SIDE_PAGINATION_VEHICLE_TYPE_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_VEHICLE_TYPE_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addVehicleTypeAction = (id, data) => {
  var url = process.env.REACT_APP_LOCALHOST + "/VehicleType/Post"

  let formData = {
    _id: id,
    ...data,
  }

  // console.log(dataObject);

  // const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: ADD_VEHICLE_TYPE,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_VEHICLE_TYPE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addVehicleTypeFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_VEHICLE_TYPE_FRESH,
      status: false,
    })
}

export const getAllVehicleTypeAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/VehicleType/Get"
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
          type: GET_ALL_VEHICLE_TYPE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_VEHICLE_TYPE,
          status: "Failed",
        })
      })
  }
}

export const getAllVehicleTypeFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_VEHICLE_TYPE_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const vehicleTypeEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/VehicleType/Put"

  const formData = {
    ...data,
  }

  // onst formData = convertToFormData(dataObject)
  // console.log(formData);
  return dispatch => {
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: VEHICLE_TYPE_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VEHICLE_TYPE_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const vehicleTypeEditFresh = () => {
  return dispatch => {
    dispatch({
      type: VEHICLE_TYPE_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const vehicleTypeStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/VehicleType/Put"

  const formData = data

  // const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_VEHICLE_TYPE_STATUS,
          status: "Success",
        })
        // toast.success("Updated Successfully");
      })
      .catch(error => {
        dispatch({
          type: EDIT_VEHICLE_TYPE_STATUS,
          status: "Failed",
        })
        // toast.error("Something went wrong!!");
      })
  }
}

export const vehicleTypeStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_VEHICLE_TYPE_STATUS_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const vehicleTypeDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/VehicleType/Delete"

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: VEHICLE_TYPE_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VEHICLE_TYPE_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const vehicleTypeDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: VEHICLE_TYPE_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationVehicleTypeAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/VehicleType/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_VEHICLE_TYPE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_VEHICLE_TYPE,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationVehicleTypeSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/VehicleType/Search?type=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_VEHICLE_TYPE_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_VEHICLE_TYPE_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchVehicleTypeFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_VEHICLE_TYPE_FRESH,
      status: false,
      payload: null,
    })
}
