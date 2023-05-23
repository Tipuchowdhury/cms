import {
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_FRESH,
  GET_ALL_NOTIFICATION,
  GET_ALL_NOTIFICATION_FRESH,
  NOTIFICATION_EDIT,
  NOTIFICATION_EDIT_FRESH,
  GET_NOTIFICATION_BY_ID,
  NOTIFICATION_DELETE,
  NOTIFICATION_DELETE_FRESH,
  NOTIFICATION_STATUS_EDIT,
  NOTIFICATION_STATUS_EDIT_FRESH,

  SERVER_SIDE_PAGINATION_NOTIFICATION,
  SERVER_SIDE_PAGINATION_NOTIFICATION_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_NOTIFICATION_FRESH,
} from "./actionTypes"

const initialState = {
  // for notification add
  add_notification_data: null,
  add_notification_error: null,
  add_notification_loading: false,

  // load all notification
  get_all_notification_data: null,
  get_all_notification_error: null,
  get_all_notification_loading: false,

  //notification edit
  notification_edit_data: null,
  notification_edit_loading: false,

  notification_status_edit_data: null,
  notification_status_edit_loading: false,

  notification_delete_loading: false,

  // server side pagination notification
  get_server_side_pagination_notification_data: null,
  get_server_side_pagination_notification_error: null,
  get_server_side_pagination_notification_loading: false,

  get_server_side_pagination_notification_search_data: null,
  get_server_side_pagination_notification_search_loading: false,
}

const notification = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      state = {
        ...state,
        add_notification_data: action.payload,
        add_notification_error: null,
        add_notification_loading: action.status,
        get_all_notification_loading: false,
      }
      break

    case ADD_NOTIFICATION_FRESH:
      state = {
        ...state,
        add_notification_loading: action.status,
      }
      break

    case GET_ALL_NOTIFICATION:
      state = {
        ...state,
        get_all_notification_data: action.payload,
        get_all_notification_error: null,
        get_all_notification_loading: action.status,
      }
      break

    case GET_ALL_NOTIFICATION_FRESH:
      state = {
        ...state,
        get_all_notification_loading: action.status,
      }
      break

    case NOTIFICATION_EDIT:
      state = {
        ...state,
        notification_edit_data: action.payload,
        notification_edit_loading: action.status,
        get_all_notification_loading: false,
      }
      break

    case NOTIFICATION_EDIT_FRESH:
      state = {
        ...state,
        notification_edit_loading: action.status,
      }
      break

    case NOTIFICATION_STATUS_EDIT:
      state = {
        ...state,
        notification_status_edit_data: action.payload,
        notification_status_edit_loading: action.status,
        get_all_notification_loading: false,
      }
      break

    case NOTIFICATION_STATUS_EDIT_FRESH:
      state = {
        ...state,
        notification_status_edit_loading: action.status,
      }
      break

    case NOTIFICATION_DELETE:
      state = {
        ...state,
        notification_delete_loading: action.status,
        get_all_notification_loading: false,
      }
      break
    case NOTIFICATION_DELETE_FRESH:
      state = {
        ...state,
        notification_delete_loading: action.status,
        get_all_notification_loading: false,
      }
      break;

    case SERVER_SIDE_PAGINATION_NOTIFICATION:
      state = {
        ...state,
        get_server_side_pagination_notification_data: action.payload,
        get_server_side_pagination_notification_error: null,
        get_server_side_pagination_notification_loading: action.status,
      }
      break;
    case SERVER_SIDE_PAGINATION_NOTIFICATION_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_notification_search_data: action.payload,
        get_server_side_pagination_notification_search_loading: action.status,
      }
      break;

    case SERVER_SIDE_PAGINATION_SEARCH_NOTIFICATION_FRESH:
      state = {
        ...state,
        get_server_side_pagination_notification_search_data: action.payload,
        get_server_side_pagination_notification_search_loading: action.status,
      }
      break;
  }
  return state
}

export default notification
