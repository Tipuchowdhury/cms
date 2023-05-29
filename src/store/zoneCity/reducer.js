import {
  ADD_CITY,
  ADD_CITY_FRESH,
  GET_ALL_CITY,
  GET_ALL_CITY_FRESH,
  CITY_NAME_EDIT,
  CITY_NAME_EDIT_FRESH,
  GET_CITY_NAME_BY_ID,
  CITY_DELETE,
  CITY_DELETE_FRESH,
  CITY_STATUS_EDIT,
  CITY_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION,
  SERVER_SIDE_PAGINATION_FRESH,
  SERVER_SIDE_PAGINATION_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_FRESH,
} from "./actionTypes"

const initialState = {
  // for city add
  add_city_data: null,
  add_city_error: null,
  add_city_loading: false,

  // load all city
  get_all_city_data: null,
  get_all_city_error: null,
  get_all_city_loading: false,

  //city name edit
  city_name_edit_data: null,
  city_name_edit_loading: false,

  city_status_edit_data: null,
  city_status_edit_loading: false,

  city_delete_loading: false,

  get_server_side_pagination_data: null,
  get_server_side_pagination_error: null,
  get_server_side_pagination_loading: false,

  get_server_side_pagination_search_data: null,
  get_server_side_pagination_search_loading: false,
}

const zoneCity = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      state = {
        ...state,
        add_city_data: action.payload,
        add_city_error: null,
        add_city_loading: action.status,
        //get_all_city_loading: false,
        get_server_side_pagination_loading: false,
      }
      break

    case ADD_CITY_FRESH:
      state = {
        ...state,
        add_city_loading: action.status,
        get_all_city_loading: action.status,
      }
      break

    case GET_ALL_CITY:
      state = {
        ...state,
        get_all_city_data: action.payload,
        get_all_city_error: null,
        get_all_city_loading: action.status,
      }
      break

    case GET_ALL_CITY_FRESH:
      state = {
        ...state,
        get_all_city_loading: action.status,
      }
      break

    case CITY_NAME_EDIT:
      state = {
        ...state,
        city_name_edit_data: action.payload,
        city_name_edit_loading: action.status,
        get_all_city_loading: false,
      }
      break

    case CITY_NAME_EDIT_FRESH:
      state = {
        ...state,
        city_name_edit_loading: action.status,
      }
      break

    case CITY_STATUS_EDIT:
      state = {
        ...state,
        city_status_edit_data: action.payload,
        city_status_edit_loading: action.status,
        get_all_city_loading: false,
      }
      break

    case CITY_STATUS_EDIT_FRESH:
      state = {
        ...state,
        city_status_edit_loading: action.status,
      }
      break

    case CITY_DELETE:
      state = {
        ...state,
        city_delete_loading: action.status,
        get_all_city_loading: false,
      }
      break
    case CITY_DELETE_FRESH:
      state = {
        ...state,
        city_delete_loading: action.status,
        get_all_city_loading: false,
      }
      break
    case SERVER_SIDE_PAGINATION:
      state = {
        ...state,
        get_server_side_pagination_data: action.payload,
        get_server_side_pagination_error: null,
        get_server_side_pagination_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_FRESH:
      state = {
        ...state,
        get_server_side_pagination_loading: action.status,
        //get_all_city_loading: false
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_search_data: action.payload,
        get_server_side_pagination_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_FRESH:
      state = {
        ...state,
        get_server_side_pagination_search_data: action.payload,
        get_server_side_pagination_search_loading: action.status,
      }
      break
  }
  return state
}

export default zoneCity
