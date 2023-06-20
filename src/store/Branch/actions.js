import {
  SERVER_SIDE_PAGINATION_BRANCH,
  SERVER_SIDE_PAGINATION_BRANCH_FRESH,
  GET_BRANCH_BY_ID,
  GET_BRANCH_BY_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToQueryParams } from "helpers/functions"

export const getServerSidePaginationBranchAction = (index, limit, filters) => {
  console.log("filters :", filters)
  filters = convertToQueryParams(filters)
  console.log("filters :", filters)

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Branch/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
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
          type: SERVER_SIDE_PAGINATION_BRANCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_BRANCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationBranchFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_BRANCH_FRESH,
      status: false,
      payload: null,
    })
}

export const getBranchByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/GetById?id=" + id

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
          type: GET_BRANCH_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        console.log("error :", error)
        dispatch({
          type: GET_BRANCH_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getBranchByIdFresh = () => {
  console.log("=======In the fresh ---------")
  return dispatch => {
    dispatch({
      type: GET_BRANCH_BY_ID_FRESH,
      status: false,
      payload: null,
    })
  }
}
