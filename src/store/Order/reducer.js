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
        order_assign_rider_loading: action.status,
      }
      break
  }
  return state
}

export default order