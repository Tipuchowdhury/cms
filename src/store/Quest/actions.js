import {
  ADD_QUEST,
  ADD_QUEST_FRESH,
  GET_ALL_QUEST,
  GET_ALL_QUEST_FRESH,
  QUEST_EDIT,
  QUEST_EDIT_FRESH,
  QUEST_DELETE,
  QUEST_DELETE_FRESH,
  QUEST_STATUS_EDIT,
  QUEST_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_QUEST,
  SERVER_SIDE_PAGINATION_QUEST_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_QUEST_FRESH,
  GET_QUEST_BY_ID,
  GET_QUEST_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData } from "helpers/functions"

export const getServerSidePaginationQuestAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Quest/Search?page=${index}&limit=${limit}`
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
          type: SERVER_SIDE_PAGINATION_QUEST,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_QUEST,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationQuestSearchAction = name => {
  console.log(name)
  var url = process.env.REACT_APP_LOCALHOST + `/Quest/Search?zone_name=${name}`
  //var url = process.env.REACT_APP_LOCALHOST + `/City/Search?page=1&limit=2`;
  console.log(url)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_QUEST_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_QUEST_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchQuestFresh = () => {
  console.log(
    "======= hello from getServerSidePaginationSearchQuestFresh ========="
  )
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_SEARCH_QUEST_FRESH,
      status: false,
      payload: null,
    })
}

export const getQuestByIdAction = id => {
  console.log("quest by id")
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/GetById?id=" + id
  console.log("url :", url)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        console.log("response :", response)

        dispatch({
          type: GET_QUEST_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        console.log("error :", error)
        dispatch({
          type: GET_QUEST_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getQuestByIdFresh = () => {
  console.log("=======In the fresh ---------")
  return dispatch => {
    dispatch({
      type: GET_QUEST_BY_ID_FRESH,
      status: false,
      payload: null,
    })
  }
}

export const addQuestAction = (data, selectedZone) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/Post"
  const selectedZoneData =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          return {
            zone_id: item.value,
          }
        })
      : null

  const dataObject = {
    ...data,
    zones: selectedZoneData,
  }
  //  console.log(dataObject)
  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, dataObject, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: "ADD_QUEST",
          payload: response.data,
          status: "Success",
        })
        toast.success("Quest Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: "ADD_QUEST",
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addQuestFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_QUEST_FRESH,
      status: false,
    })
}

export const getAllQuestAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/Get"
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
          type: GET_ALL_QUEST,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_QUEST,
          status: "Failed",
        })
      })
  }
}

export const getAllQuestFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_QUEST_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const questEditAction = (id, data, selectedZone) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/Put"
  const selectedZoneData =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          return {
            zone_id: item.value,
          }
        })
      : null

  const dataObject = {
    ...data,
    zones: selectedZoneData,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, dataObject, { headers: headers })
      .then(response => {
        dispatch({
          type: QUEST_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: QUEST_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const questEditFresh = () => {
  return dispatch => {
    dispatch({
      type: QUEST_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const questStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/Put"
  let dataObject = { ...data }

  const formData = convertToFormData(dataObject)
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
          type: QUEST_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: QUEST_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const questStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: QUEST_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const questDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Quest/Delete"
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
          type: "QUEST_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "QUEST_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const questDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: QUEST_DELETE_FRESH,
      status: false,
    })
}
