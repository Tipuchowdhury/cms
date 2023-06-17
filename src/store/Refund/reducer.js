import {
  ADD_REFUND,
  ADD_REFUND_FRESH,
  GET_ALL_REFUND,
  GET_ALL_REFUND_FRESH,
  REFUND_EDIT,
  REFUND_EDIT_FRESH,
  REFUND_DELETE,
  REFUND_DELETE_FRESH,
  REFUND_STATUS_EDIT,
  REFUND_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_REFUND,
  SERVER_SIDE_PAGINATION_REFUND_FRESH,
} from "./actionTypes"

const initialState = {
  // for refund type add
  add_refund_data: null,
  add_refund_error: null,
  add_refund_loading: false,

  // load all refund type
  get_all_refund_data: null,
  get_all_refund_error: null,
  get_all_refund_loading: false,

  //refund type edit
  refund_edit_data: null,
  refund_edit_loading: false,

  refund_status_edit_data: null,
  refund_status_edit_loading: false,

  refund_delete_loading: false,

  // server side pagination refund
  get_server_side_pagination_refund_data: null,
  get_server_side_pagination_refund_error: null,
  get_server_side_pagination_refund_loading: false,
}

const Refunds = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REFUND:
      state = {
        ...state,
        add_refund_data: action.payload,
        add_refund_error: null,
        add_refund_loading: action.status,
        get_all_refund_loading: false,
        get_server_side_pagination_refund_loading: false,
      }
      break

    case ADD_REFUND_FRESH:
      state = {
        ...state,
        add_refund_loading: action.status,
      }
      break

    case GET_ALL_REFUND:
      state = {
        ...state,
        get_all_refund_data: action.payload,
        get_all_refund_error: null,
        get_all_refund_loading: action.status,
      }
      break

    case GET_ALL_REFUND_FRESH:
      state = {
        ...state,
        get_all_refund_loading: action.status,
      }
      break

    case REFUND_EDIT:
      state = {
        ...state,
        refund_edit_data: action.payload,
        refund_edit_loading: action.status,
        get_all_refund_loading: false,
      }
      break

    case REFUND_EDIT_FRESH:
      state = {
        ...state,
        refund_edit_loading: action.status,
      }
      break

    case REFUND_STATUS_EDIT:
      state = {
        ...state,
        refund_status_edit_data: action.payload,
        refund_status_edit_loading: action.status,
        get_all_refund_loading: false,
      }
      break

    case REFUND_STATUS_EDIT_FRESH:
      state = {
        ...state,
        refund_status_edit_loading: action.status,
      }
      break

    case REFUND_DELETE:
      state = {
        ...state,
        refund_delete_loading: action.status,
        get_all_refund_loading: false,
      }
      break
    case REFUND_DELETE_FRESH:
      state = {
        ...state,
        refund_delete_loading: action.status,
        get_all_refund_loading: false,
      }
      break
    case SERVER_SIDE_PAGINATION_REFUND:
      state = {
        ...state,
        get_server_side_pagination_refund_data: action.payload,
        get_server_side_pagination_refund_error: null,
        get_server_side_pagination_refund_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_REFUND_FRESH:
      state = {
        ...state,
        get_server_side_pagination_refund_data: action.payload,
        get_server_side_pagination_refund_loading: action.status,
      }
      break
  }
  return state
}

export default Refunds
