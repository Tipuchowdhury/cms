import {
  ADD_CAMPAIGN,
  ADD_CAMPAIGN_FRESH,
  GET_ALL_CAMPAIGN,
  GET_ALL_CAMPAIGN_FRESH,
  CAMPAIGN_EDIT,
  CAMPAIGN_EDIT_FRESH,
  CAMPAIGN_DELETE,
  CAMPAIGN_DELETE_FRESH,
  CAMPAIGN_STATUS_EDIT,
  CAMPAIGN_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_CAMPAIGN,
  SERVER_SIDE_PAGINATION_CAMPAIGN_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_CAMPAIGN_FRESH,
  GET_CAMPAIGN_BY_ID,
  GET_CAMPAIGN_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData } from "helpers/functions"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCampaignAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Campaign/Post"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            campaign_id: id,
          }
        })
      : null
  // console.log(selectedBranchData);
  // const formData = {
  //   _id: id,
  //   ...data,
  //   restaurants: selectedBranchData,
  // }

  const dataObject = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  //  console.log(dataObject)
  const formData = convertToFormData(dataObject)
  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: "ADD_CAMPAIGN",
          payload: response.data,
          status: "Success",
        })
        toast.success("Campaign Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: "ADD_CAMPAIGN",
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addCampaignFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_CAMPAIGN_FRESH,
      status: false,
    })
}

export const getAllCampaignAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Campaign/Get"
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
          type: GET_ALL_CAMPAIGN,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_CAMPAIGN,
          status: "Failed",
        })
      })
  }
}

export const getAllCampaignFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_CAMPAIGN_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const campaignEditAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Campaign/Put"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            campaign_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  //  console.log(dataObject)
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
          type: CAMPAIGN_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: CAMPAIGN_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const campaignEditFresh = () => {
  return dispatch => {
    dispatch({
      type: CAMPAIGN_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const campaignStatusEditAction = data => {
  // var url = process.env.REACT_APP_LOCALHOST + "/Campaign/Put"
  // let dataObject = { ...data }

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Campaign/isActive?id=${data._id}&is_active=${data.is_active}`

  //const formData = data
  const formData = {
    id: data._id,
    is_active: !data.is_active,
  }

  //const formData = convertToFormData(dataObject)
  // console.log(formData);
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
          type: CAMPAIGN_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: CAMPAIGN_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const campaignStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: CAMPAIGN_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const campaignDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Campaign/Delete"
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
          type: "CAMPAIGN_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "CAMPAIGN_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const campaignDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: CAMPAIGN_DELETE_FRESH,
      status: false,
    })
}

export const getServerSidePaginationCampaignAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Campaign/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_CAMPAIGN,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CAMPAIGN,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationCampaignSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/Campaign/Search?name=${name}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CAMPAIGN_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_CAMPAIGN_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchCampaignFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_CAMPAIGN_FRESH,
      status: false,
      payload: null,
    })
}

export const getCampaignByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + `/Campaign/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_CAMPAIGN_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_CAMPAIGN_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getCampaignByIdActionFresh = () => {
  console.log("=========hererererer=======")
  return dispatch =>
    dispatch({
      type: GET_CAMPAIGN_BY_ID_FRESH,
      status: false,
    })
}
