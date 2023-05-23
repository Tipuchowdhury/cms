import {
  ADD_VOUCHER_SETTING,
  ADD_VOUCHER_SETTING_FRESH,
  GET_ALL_VOUCHER_SETTING,
  GET_ALL_VOUCHER_SETTING_FRESH,
  VOUCHER_SETTING_EDIT,
  VOUCHER_SETTING_EDIT_FRESH,
  VOUCHER_SETTING_DELETE,
  VOUCHER_SETTING_DELETE_FRESH,
  VOUCHER_SETTING_STATUS_EDIT,
  VOUCHER_SETTING_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addVoucherSettingAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherSetting/Post"

  const restaurants =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            voucher_setting_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    restaurants: restaurants,
  }
  // console.log(formData)
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
          type: "ADD_VOUCHER_SETTING",
          payload: response.data,
          status: "Success",
        })
        toast.success("Voucher Setting Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: "ADD_VOUCHER_SETTING",
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addVoucherSettingFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_VOUCHER_SETTING_FRESH,
      status: false,
    })
}

export const getAllVoucherSettingAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherSetting/Get"
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
          type: GET_ALL_VOUCHER_SETTING,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_VOUCHER_SETTING,
          status: "Failed",
        })
      })
  }
}

export const getAllVoucherSettingFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_VOUCHER_SETTING_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const voucherSettingEditAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherSetting/Put"

  const restaurants =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            voucher_setting_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    restaurants: restaurants,
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
          type: VOUCHER_SETTING_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VOUCHER_SETTING_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherSettingEditFresh = () => {
  return dispatch => {
    dispatch({
      type: VOUCHER_SETTING_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const voucherSettingStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherSetting/Put"
  const dataObject = data
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
          type: VOUCHER_SETTING_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: VOUCHER_SETTING_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherSettingStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: VOUCHER_SETTING_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const voucherSettingDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/VoucherSetting/Delete"
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
          type: "VOUCHER_SETTING_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "VOUCHER_SETTING_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const voucherSettingDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: VOUCHER_SETTING_DELETE_FRESH,
      status: false,
    })
}
