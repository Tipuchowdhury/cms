import {
  ADD_RIDER,
  ADD_RIDER_FRESH,
  GET_ALL_RIDER,
  GET_ALL_RIDER_FRESH,
  RIDER_EDIT,
  RIDER_EDIT_FRESH,
  RIDER_DELETE,
  RIDER_DELETE_FRESH,
  RIDER_STATUS_EDIT,
  RIDER_STATUS_EDIT_FRESH,
  RIDER_APPROVED_EDIT,
  RIDER_APPROVED_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_RIDER,
  SERVER_SIDE_PAGINATION_RIDER_FRESH,
  GET_RIDER_BY_ID,
  GET_RIDER_BY_ID_FRESH,
} from "./actionTypes"

const initialState = {
  // for rider add
  add_rider_data: null,
  add_rider_error: null,
  add_rider_loading: false,

  // load all rider
  get_all_rider_data: null,
  get_all_rider_error: null,
  get_all_rider_loading: false,

  //rider edit
  rider_edit_data: null,
  rider_edit_loading: false,

  rider_status_edit_data: null,
  rider_status_edit_loading: false,

  rider_approved_edit_data: null,
  rider_approved_edit_loading: false,

  rider_delete_loading: false,

  // server side pagination rider
  get_server_side_pagination_rider_data: null,
  get_server_side_pagination_rider_error: null,
  get_server_side_pagination_rider_loading: false,

  get_rider_by_id_data: null,
  get_rider_by_id_error: null,
  get_rider_by_id_loading: false,
}

const Rider = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RIDER:
      state = {
        ...state,
        add_rider_data: action.payload,
        add_rider_error: null,
        add_rider_loading: action.status,
        get_all_rider_loading: false,
      }
      break

    case ADD_RIDER_FRESH:
      state = {
        ...state,
        add_rider_loading: action.status,
      }
      break

    case GET_ALL_RIDER:
      state = {
        ...state,
        get_all_rider_data: action.payload,
        get_all_rider_error: null,
        get_all_rider_loading: action.status,
      }
      break

    case GET_ALL_RIDER_FRESH:
      state = {
        ...state,
        get_all_rider_loading: action.status,
      }
      break

    case RIDER_EDIT:
      state = {
        ...state,
        rider_edit_data: action.payload,
        rider_edit_loading: action.status,
        get_all_rider_loading: false,
      }
      break

    case RIDER_EDIT_FRESH:
      state = {
        ...state,
        rider_edit_loading: action.status,
      }
      break

    case RIDER_STATUS_EDIT:
      state = {
        ...state,
        rider_status_edit_data: action.payload,
        rider_status_edit_loading: action.status,
        get_all_rider_loading: false,
        get_server_side_pagination_rider_loading: false,
      }
      break

    case RIDER_STATUS_EDIT_FRESH:
      state = {
        ...state,
        rider_status_edit_loading: action.status,
      }
      break

    case RIDER_APPROVED_EDIT:
      state = {
        ...state,
        rider_approved_edit_data: action.payload,
        rider_approved_edit_loading: action.status,
        get_all_rider_loading: false,
        get_server_side_pagination_rider_loading: false,
      }
      break

    case RIDER_APPROVED_EDIT_FRESH:
      state = {
        ...state,
        rider_approved_edit_loading: action.status,
      }
      break

    case RIDER_DELETE:
      state = {
        ...state,
        rider_delete_loading: action.status,
        get_all_rider_loading: false,
        get_server_side_pagination_rider_loading: false,
      }
      break
    case RIDER_DELETE_FRESH:
      state = {
        ...state,
        rider_delete_loading: action.status,
        get_all_rider_loading: false,
        get_server_side_pagination_rider_loading: false,
      }
      break
    case SERVER_SIDE_PAGINATION_RIDER:
      state = {
        ...state,
        get_server_side_pagination_rider_data: action.payload,
        get_server_side_pagination_rider_error: null,
        get_server_side_pagination_rider_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_RIDER_FRESH:
      state = {
        ...state,
        get_server_side_pagination_rider_data: action.payload,
        get_server_side_pagination_rider_loading: action.status,
      }
      break

    case GET_RIDER_BY_ID:
      state = {
        ...state,
        get_rider_by_id_data: action.payload,
        get_rider_by_id_error: null,
        get_rider_by_id_loading: action.status,
      }
      break

    case GET_RIDER_BY_ID_FRESH:
      state = {
        ...state,
        get_rider_by_id_data: null,
        get_rider_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default Rider
