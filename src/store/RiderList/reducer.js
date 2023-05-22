import {
  ADD_RIDER_LIST,
  ADD_RIDER_LIST_FRESH,
  GET_ALL_RIDER_LIST,
  GET_ALL_RIDER_LIST_FRESH,
  RIDER_LIST_EDIT,
  RIDER_LIST_EDIT_FRESH,
  RIDER_LIST_DELETE,
  RIDER_LIST_DELETE_FRESH,
  RIDER_LIST_STATUS_EDIT,
  RIDER_LIST_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for rider list type add
  add_rider_list_data: null,
  add_rider_list_error: null,
  add_rider_list_loading: false,

  // load all rider list type
  get_all_rider_list_data: null,
  get_all_rider_list_error: null,
  get_all_rider_list_loading: false,

  //rider list type edit
  rider_list_edit_data: null,
  rider_list_edit_loading: false,

  rider_list_status_edit_data: null,
  rider_list_status_edit_loading: false,

  rider_list_delete_loading: false,
}

const RiderList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RIDER_LIST:
      state = {
        ...state,
        add_rider_list_data: action.payload,
        add_rider_list_error: null,
        add_rider_list_loading: action.status,
        get_all_rider_list_loading: false,
      }
      break

    case ADD_RIDER_LIST_FRESH:
      state = {
        ...state,
        add_rider_list_loading: action.status,
      }
      break

    case GET_ALL_RIDER_LIST:
      state = {
        ...state,
        get_all_rider_list_data: action.payload,
        get_all_rider_list_error: null,
        get_all_rider_list_loading: action.status,
      }
      break

    case GET_ALL_RIDER_LIST_FRESH:
      state = {
        ...state,
        get_all_rider_list_loading: action.status,
      }
      break

    case RIDER_LIST_EDIT:
      state = {
        ...state,
        rider_list_edit_data: action.payload,
        rider_list_edit_loading: action.status,
        get_all_rider_list_loading: false,
      }
      break

    case RIDER_LIST_EDIT_FRESH:
      state = {
        ...state,
        rider_list_edit_loading: action.status,
      }
      break

    case RIDER_LIST_STATUS_EDIT:
      state = {
        ...state,
        rider_list_status_edit_data: action.payload,
        rider_list_status_edit_loading: action.status,
        get_all_rider_list_loading: false,
      }
      break

    case RIDER_LIST_STATUS_EDIT_FRESH:
      state = {
        ...state,
        rider_list_status_edit_loading: action.status,
      }
      break

    case RIDER_LIST_DELETE:
      state = {
        ...state,
        rider_list_delete_loading: action.status,
        get_all_rider_list_loading: false,
      }
      break
    case RIDER_LIST_DELETE_FRESH:
      state = {
        ...state,
        rider_list_delete_loading: action.status,
        get_all_rider_list_loading: false,
      }
  }
  return state
}

export default RiderList
