import {
  ADD_COUPON,
  ADD_COUPON_FRESH,
  GET_ALL_COUPON,
  GET_ALL_COUPON_FRESH,
  COUPON_EDIT,
  COUPON_EDIT_FRESH,
  GET_COUPON_BY_ID,
  COUPON_DELETE,
  COUPON_DELETE_FRESH,
  COUPON_STATUS_EDIT,
  COUPON_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for coupon add
  add_coupon_data: null,
  add_coupon_error: null,
  add_coupon_loading: false,

  // load all coupon
  get_all_coupon_data: null,
  get_all_coupon_error: null,
  get_all_coupon_loading: false,

  //coupon edit
  coupon_edit_data: null,
  coupon_edit_loading: false,

  coupon_status_edit_data: null,
  coupon_status_edit_loading: false,

  coupon_delete_loading: false,
}

const Coupon = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUPON:
      state = {
        ...state,
        add_coupon_data: action.payload,
        add_coupon_error: null,
        add_coupon_loading: action.status,
        get_all_coupon_loading: false,
      }
      break

    case ADD_COUPON_FRESH:
      state = {
        ...state,
        add_coupon_loading: action.status,
      }
      break

    case GET_ALL_COUPON:
      state = {
        ...state,
        get_all_coupon_data: action.payload,
        get_all_coupon_error: null,
        get_all_coupon_loading: action.status,
      }
      break

    case GET_ALL_COUPON_FRESH:
      state = {
        ...state,
        get_all_coupon_loading: action.status,
      }
      break

    case COUPON_EDIT:
      state = {
        ...state,
        coupon_edit_data: action.payload,
        coupon_edit_loading: action.status,
        get_all_coupon_loading: false,
      }
      break

    case COUPON_EDIT_FRESH:
      state = {
        ...state,
        coupon_edit_loading: action.status,
      }
      break

    case COUPON_STATUS_EDIT:
      state = {
        ...state,
        coupon_status_edit_data: action.payload,
        coupon_status_edit_loading: action.status,
        get_all_coupon_loading: false,
      }
      break

    case COUPON_STATUS_EDIT_FRESH:
      state = {
        ...state,
        coupon_status_edit_loading: action.status,
      }
      break

    case COUPON_DELETE:
      state = {
        ...state,
        coupon_delete_loading: action.status,
        get_all_coupon_loading: false,
      }
      break
    case COUPON_DELETE_FRESH:
      state = {
        ...state,
        coupon_delete_loading: action.status,
        get_all_coupon_loading: false,
      }
  }
  return state
}

export default Coupon
