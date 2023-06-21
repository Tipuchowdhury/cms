import {
  ADD_VOUCHER_REQUEST,
  ADD_VOUCHER_REQUEST_FRESH,
  GET_ALL_VOUCHER_REQUEST,
  GET_ALL_VOUCHER_REQUEST_FRESH,
  VOUCHER_REQUEST_EDIT,
  VOUCHER_REQUEST_EDIT_FRESH,
  VOUCHER_REQUEST_DELETE,
  VOUCHER_REQUEST_DELETE_FRESH,
  VOUCHER_REQUEST_STATUS_EDIT,
  VOUCHER_REQUEST_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_VOUCHER_REQUEST,
  SERVER_SIDE_PAGINATION_VOUCHER_REQUEST_FRESH,
} from "./actionTypes"

const initialState = {
  // for voucher_request type add
  add_voucher_request_data: null,
  add_voucher_request_error: null,
  add_voucher_request_loading: false,

  // load all voucher_request type
  get_all_voucher_request_data: null,
  get_all_voucher_request_error: null,
  get_all_voucher_request_loading: false,

  //voucher_request type edit
  voucher_request_edit_data: null,
  voucher_request_edit_loading: false,

  voucher_request_status_edit_data: null,
  voucher_request_status_edit_loading: false,

  voucher_request_delete_loading: false,

  // server side pagination voucher_request
  get_server_side_pagination_voucher_request_data: null,
  get_server_side_pagination_voucher_request_error: null,
  get_server_side_pagination_voucher_request_loading: false,
}

const VoucherRequest = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VOUCHER_REQUEST:
      state = {
        ...state,
        add_voucher_request_data: action.payload,
        add_voucher_request_error: null,
        add_voucher_request_loading: action.status,
        get_all_voucher_request_loading: false,
        get_server_side_pagination_voucher_request_loading: false,
      }
      break

    case ADD_VOUCHER_REQUEST_FRESH:
      state = {
        ...state,
        add_voucher_request_loading: action.status,
      }
      break

    case GET_ALL_VOUCHER_REQUEST:
      state = {
        ...state,
        get_all_voucher_request_data: action.payload,
        get_all_voucher_request_error: null,
        get_all_voucher_request_loading: action.status,
      }
      break

    case GET_ALL_VOUCHER_REQUEST_FRESH:
      state = {
        ...state,
        get_all_voucher_request_loading: action.status,
      }
      break

    case VOUCHER_REQUEST_EDIT:
      state = {
        ...state,
        voucher_request_edit_data: action.payload,
        voucher_request_edit_loading: action.status,
        get_all_voucher_request_loading: false,
      }
      break

    case VOUCHER_REQUEST_EDIT_FRESH:
      state = {
        ...state,
        voucher_request_edit_loading: action.status,
      }
      break

    case VOUCHER_REQUEST_STATUS_EDIT:
      state = {
        ...state,
        voucher_request_status_edit_data: action.payload,
        voucher_request_status_edit_loading: action.status,
        get_all_voucher_request_loading: false,
      }
      break

    case VOUCHER_REQUEST_STATUS_EDIT_FRESH:
      state = {
        ...state,
        voucher_request_status_edit_loading: action.status,
      }
      break

    case VOUCHER_REQUEST_DELETE:
      state = {
        ...state,
        voucher_request_delete_loading: action.status,
        get_all_voucher_request_loading: false,
      }
      break
    case VOUCHER_REQUEST_DELETE_FRESH:
      state = {
        ...state,
        voucher_request_delete_loading: action.status,
        get_all_voucher_request_loading: false,
      }
      break
    case SERVER_SIDE_PAGINATION_VOUCHER_REQUEST:
      state = {
        ...state,
        get_server_side_pagination_voucher_request_data: action.payload,
        get_server_side_pagination_voucher_request_error: null,
        get_server_side_pagination_voucher_request_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_VOUCHER_REQUEST_FRESH:
      state = {
        ...state,
        get_server_side_pagination_voucher_request_data: action.payload,
        get_server_side_pagination_voucher_request_loading: action.status,
      }
      break
  }
  return state
}

export default VoucherRequest
