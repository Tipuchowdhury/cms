import {
  ADD_ORDER,
  ADD_ORDER_FRESH,
  GET_ALL_ORDER,
  GET_ALL_ORDER_FRESH,
  ORDER_EDIT,
  ORDER_EDIT_FRESH,
  GET_ORDER_BY_ID,
  ORDER_DELETE,
  ORDER_DELETE_FRESH,
  ORDER_STATUS_EDIT,
  ORDER_STATUS_EDIT_FRESH,
  GET_AVAILABLE_RIDER,
  ASSIGN_RIDER,
  ASSIGN_RIDER_FRESH,
  SERVER_SIDE_PAGINATION_ORDER,
  SERVER_SIDE_PAGINATION_ORDER_FRESH,
  GET_ORDER_INVOICE,
  GET_ORDER_INVOICE_FRESH,
  GET_RIDER_INVOICE,
  GET_RIDER_INVOICE_FRESH,
} from "./actionTypes"

const initialState = {
  // for getting available riders
  get_available_rider_data: null,
  get_available_rider_error: null,
  get_available_rider_loading: false,

  // load all order
  get_all_order_data: null,
  get_all_order_error: null,
  get_all_order_loading: false,

  //order edit
  order_edit_data: null,
  order_edit_loading: false,

  order_status_edit_data: null,
  order_status_edit_loading: false,

  order_delete_loading: false,

  order_assign_rider_data: null,
  order_assign_rider_error: null,
  order_assign_rider_loading: false,

  get_server_side_pagination_order_data: null,
  get_server_side_pagination_order_error: null,
  get_server_side_pagination_order_loading: false,

  // order invoice
  get_order_invoice_data: null,
  get_order_invoice_error: null,
  get_order_invoice_loading: false,

  // rider invoice
  get_rider_invoice_data: null,
  get_rider_invoice_error: null,
  get_rider_invoice_loading: false,
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      state = {
        ...state,
        get_all_order_data: action.payload,
        get_all_order_error: null,
        get_all_order_loading: action.status,
      }
      break

    case GET_ALL_ORDER_FRESH:
      state = {
        ...state,
        get_all_order_loading: action.status,
      }
      break

    case ORDER_EDIT:
      state = {
        ...state,
        order_edit_data: action.payload,
        order_edit_loading: action.status,
        get_all_order_loading: false,
      }
      break

    case ORDER_EDIT_FRESH:
      state = {
        ...state,
        order_edit_loading: action.status,
      }
      break

    case ORDER_STATUS_EDIT:
      state = {
        ...state,
        order_status_edit_data: action.payload,
        order_status_edit_loading: action.status,
        get_all_order_loading: false,
      }
      break

    case ORDER_STATUS_EDIT_FRESH:
      state = {
        ...state,
        order_status_edit_loading: action.status,
      }
      break

    case ORDER_DELETE:
      state = {
        ...state,
        order_delete_loading: action.status,
        get_all_order_loading: false,
      }
      break
    case ORDER_DELETE_FRESH:
      state = {
        ...state,
        order_delete_loading: action.status,
        get_all_order_loading: false,
      }

    case GET_AVAILABLE_RIDER:
      state = {
        ...state,
        get_available_rider_data: action.payload,
        get_available_rider_error: null,
        get_available_rider_loading: action.status,
      }
      break

    case ASSIGN_RIDER:
      state = {
        ...state,
        order_assign_rider_data: action.payload,
        order_assign_rider_error: null,
        order_assign_rider_loading: action.status,
      }
      break

    case ASSIGN_RIDER_FRESH:
      state = {
        ...state,
        get_all_order_loading: false,
        order_assign_rider_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ORDER:
      state = {
        ...state,
        get_server_side_pagination_order_data: action.payload,
        get_server_side_pagination_order_error: null,
        get_server_side_pagination_order_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ORDER_FRESH:
      state = {
        ...state,
        get_server_side_pagination_order_data: action.payload,
        get_server_side_pagination_order_loading: action.status,
      }
      break

    case GET_ORDER_INVOICE:
      state = {
        ...state,
        get_order_invoice_data: action.payload,
        get_order_invoice_error: null,
        get_order_invoice_loading: action.status,
      }
      break

    case GET_ORDER_INVOICE_FRESH:
      state = {
        ...state,
        get_order_invoice_data: action.payload,
        get_order_invoice_loading: action.status,
      }
      break

    case GET_RIDER_INVOICE:
      state = {
        ...state,
        get_rider_invoice_data: action.payload,
        get_rider_invoice_error: null,
        get_rider_invoice_loading: action.status,
      }
      break

    case GET_RIDER_INVOICE_FRESH:
      state = {
        ...state,
        get_rider_invoice_data: action.payload,
        get_rider_invoice_loading: action.status,
      }
      break
  }
  return state
}

export default order
