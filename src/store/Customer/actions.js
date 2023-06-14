import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_FRESH,
  GET_ALL_CUSTOMER,
  GET_ALL_CUSTOMER_FRESH,
  CUSTOMER_NAME_EDIT,
  CUSTOMER_NAME_EDIT_FRESH,
  CUSTOMER_DELETE,
  CUSTOMER_DELETE_FRESH,
  EDIT_CUSTOMER_STATUS,
  EDIT_CUSTOMER_STATUS_FRESH,
  SERVER_SIDE_PAGINATION_CUSTOMER,
  SERVER_SIDE_PAGINATION_CUSTOMER_FRESH,
  SERVER_SIDE_PAGINATION_CUSTOMER_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_CUSTOMER_FRESH,
  GET_CUSTOMER_BY_ID,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCustomerAction = (id, data, sub_id) => {
  console.log(id, data, sub_id)
  var url = process.env.REACT_APP_LOCALHOST + "/Customer/Post"

  let dataObject = {
    _id: id,
    ...data,
    subscription_type_id: sub_id,
  }

  const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      //"Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: ADD_CUSTOMER,
          payload: response.data,
          status: "Success",
        })
      })

      .catch(error => {
        dispatch({
          type: ADD_CUSTOMER,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addCustomerFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_CUSTOMER_FRESH,
      status: false,
    })
}

export const getAllCustomerAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Customer/Get"
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
          type: GET_ALL_CUSTOMER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_CUSTOMER,
          status: "Failed",
        })
      })
  }
}

export const getAllCustomerFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_CUSTOMER_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const customerEditAction = (id, data, sub_id) => {
  console.log(id, data, sub_id)
  var url = process.env.REACT_APP_LOCALHOST + "/Customer/Put"

  const dataObject = {
    ...data,
    _id: id,
    subscription_type_id: sub_id,
  }

  const formData = convertToFormData(dataObject)
  console.log(formData)
  return dispatch => {
    const headers = {
      //"Content-Type": "multipart/form-data",
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: CUSTOMER_NAME_EDIT,
          payload: response.data,
          status: "Success",
        })
        toast.success("Customer Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: CUSTOMER_NAME_EDIT,
          payload: error,
          status: "Failed",
        })
        toast.error("Customer Edit Failed")
      })
  }
}

export const customerEditFresh = () => {
  return dispatch => {
    dispatch({
      type: CUSTOMER_NAME_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const customerStatusEditAction = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Customer/isActive?id=${data._id}&is_active=${data.is_active}`

  const dataObject = data

  return dispatch => {
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, dataObject, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_CUSTOMER_STATUS,
          status: "Success",
        })
        // toast.success("Updated Successfully");
      })
      .catch(error => {
        dispatch({
          type: EDIT_CUSTOMER_STATUS,
          status: "Failed",
        })
        // toast.error("Something went wrong!!");
      })
  }
}

export const customerStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_CUSTOMER_STATUS_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const customerDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Customer/Delete"

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: CUSTOMER_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: CUSTOMER_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const customerDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: CUSTOMER_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationCustomerAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Customer/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_CUSTOMER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CUSTOMER,
          status: "Failed",
        })
      })
  }
}

export const serverSidePaginationCustomerFresh = () => {
  console.log("======= hello from fresh =========")
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_CUSTOMER_FRESH,
      status: false,
    })
}

export const getServerSidePaginationCustomerSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/Customer/Search?name=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CUSTOMER_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CUSTOMER_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchCustomerFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_CUSTOMER_FRESH,
      status: false,
      payload: null,
    })
}

export const getCustomerByIdAction = id => {
  //var url = process.env.REACT_APP_LOCALHOST + "/Zone/Get"
  var url = process.env.REACT_APP_LOCALHOST + `/Customer/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_CUSTOMER_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_CUSTOMER_BY_ID,
          status: "Failed",
        })
      })
  }
}
