import {
  ADD_POPUP,
  ADD_POPUP_FRESH,
  GET_ALL_POPUP,
  GET_ALL_POPUP_FRESH,
  POPUP_EDIT,
  POPUP_EDIT_FRESH,
  POPUP_DELETE,
  POPUP_DELETE_FRESH,
  POPUP_STATUS_EDIT,
  POPUP_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_POPUP,
  SERVER_SIDE_PAGINATION_POPUP_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_POPUP_FRESH,
} from "./actionTypes"

const initialState = {
  // for subscription type add
  add_popup_data: null,
  add_popup_error: null,
  add_popup_loading: false,

  // load all popup
  get_all_popup_data: null,
  get_all_popup_error: null,
  get_all_popup_loading: false,

  //popup edit
  popup_edit_data: null,
  popup_edit_loading: false,

  popup_status_edit_data: null,
  popup_status_edit_loading: false,

  popup_delete_loading: false,

  // server side pagination popup
  get_server_side_pagination_popup_data: null,
  get_server_side_pagination_popup_error: null,
  get_server_side_pagination_popup_loading: false,

  get_server_side_pagination_popup_search_data: null,
  get_server_side_pagination_popup_search_loading: false,
}

const Popup = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POPUP:
      state = {
        ...state,
        add_popup_data: action.payload,
        add_popup_error: null,
        add_popup_loading: action.status,
        get_all_popup_loading: false,
      }
      break

    case ADD_POPUP_FRESH:
      state = {
        ...state,
        add_popup_loading: action.status,
      }
      break

    case GET_ALL_POPUP:
      state = {
        ...state,
        get_all_popup_data: action.payload,
        get_all_popup_error: null,
        get_all_popup_loading: action.status,
      }
      break

    case GET_ALL_POPUP_FRESH:
      state = {
        ...state,
        get_all_popup_loading: action.status,
      }
      break

    case POPUP_EDIT:
      state = {
        ...state,
        popup_edit_data: action.payload,
        popup_edit_loading: action.status,
        get_all_popup_loading: false,
      }
      break

    case POPUP_EDIT_FRESH:
      state = {
        ...state,
        popup_edit_loading: action.status,
      }
      break

    case POPUP_STATUS_EDIT:
      state = {
        ...state,
        popup_status_edit_data: action.payload,
        popup_status_edit_loading: action.status,
        get_all_popup_loading: false,
      }
      break

    case POPUP_STATUS_EDIT_FRESH:
      state = {
        ...state,
        popup_status_edit_loading: action.status,
      }
      break

    case POPUP_DELETE:
      state = {
        ...state,
        popup_delete_loading: action.status,
        get_all_popup_loading: false,
      }
      break
    case POPUP_DELETE_FRESH:
      state = {
        ...state,
        popup_delete_loading: action.status,
        get_all_popup_loading: false,
      }
      break

    case SERVER_SIDE_PAGINATION_POPUP:
      state = {
        ...state,
        get_server_side_pagination_popup_data: action.payload,
        get_server_side_pagination_popup_error: null,
        get_server_side_pagination_popup_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_POPUP_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_popup_search_data: action.payload,
        get_server_side_pagination_popup_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_POPUP_FRESH:
      state = {
        ...state,
        get_server_side_pagination_popup_search_data: action.payload,
        get_server_side_pagination_popup_search_loading: action.status,
      }
      break
  }
  return state
}

export default Popup
