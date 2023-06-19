import {
  SERVER_SIDE_PAGINATION_BRANCH,
  SERVER_SIDE_PAGINATION_BRANCH_FRESH,
  GET_BRANCH_BY_ID,
  GET_BRANCH_BY_ID_FRESH,
} from "./actionTypes"

const initialState = {
  // pagination
  get_server_side_pagination_branch_data: null,
  get_server_side_pagination_branch_error: null,
  get_server_side_pagination_branch_loading: false,

  // get by id
  get_branch_by_id_data: null,
  get_branch_by_id_error: null,
  get_branch_by_id_loading: false,
}

const branch = (state = initialState, action) => {
  switch (action.type) {
    case SERVER_SIDE_PAGINATION_BRANCH:
      state = {
        ...state,
        get_server_side_pagination_branch_data: action.payload,
        get_server_side_pagination_branch_error: null,
        get_server_side_pagination_branch_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_BRANCH_FRESH:
      state = {
        ...state,
        get_server_side_pagination_branch_data: action.payload,
        get_server_side_pagination_branch_loading: action.status,
      }
      break

    case GET_BRANCH_BY_ID:
      state = {
        ...state,
        get_branch_by_id_data: action.payload,
        get_branch_by_id_error: action.error,
        get_branch_by_id_loading: action.status,
      }
      break

    case GET_BRANCH_BY_ID_FRESH:
      state = {
        ...state,
        get_branch_by_id_data: action.payload,
        get_branch_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default branch
