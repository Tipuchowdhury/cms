import {
  ADD_ZONE_UTILIZATION,
  ADD_ZONE_UTILIZATION_FRESH,
  GET_ALL_ZONE_UTILIZATION,
  GET_ALL_ZONE_UTILIZATION_FRESH,
  ZONE_UTILIZATION_EDIT,
  ZONE_UTILIZATION_EDIT_FRESH,
  ZONE_UTILIZATION_DELETE,
  ZONE_UTILIZATION_DELETE_FRESH,
  ZONE_UTILIZATION_STATUS_EDIT,
  ZONE_UTILIZATION_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for zone utilization type add
  add_zone_utilization_data: null,
  add_zone_utilization_error: null,
  add_zone_utilization_loading: false,

  // load all zone utilization type
  get_all_zone_utilization_data: null,
  get_all_zone_utilization_error: null,
  get_all_zone_utilization_loading: false,

  //zone utilization type edit
  zone_utilization_edit_data: null,
  zone_utilization_edit_loading: false,

  zone_utilization_status_edit_data: null,
  zone_utilization_status_edit_loading: false,

  zone_utilization_delete_loading: false,
}

const ZoneUtilization = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ZONE_UTILIZATION:
      state = {
        ...state,
        add_zone_utilization_data: action.payload,
        add_zone_utilization_error: null,
        add_zone_utilization_loading: action.status,
        get_all_zone_utilization_loading: false,
      }
      break

    case ADD_ZONE_UTILIZATION_FRESH:
      state = {
        ...state,
        add_zone_utilization_loading: action.status,
      }
      break

    case GET_ALL_ZONE_UTILIZATION:
      state = {
        ...state,
        get_all_zone_utilization_data: action.payload,
        get_all_zone_utilization_error: null,
        get_all_zone_utilization_loading: action.status,
      }
      break

    case GET_ALL_ZONE_UTILIZATION_FRESH:
      state = {
        ...state,
        get_all_zone_utilization_loading: action.status,
      }
      break

    case ZONE_UTILIZATION_EDIT:
      state = {
        ...state,
        zone_utilization_edit_data: action.payload,
        zone_utilization_edit_loading: action.status,
        get_all_zone_utilization_loading: false,
      }
      break

    case ZONE_UTILIZATION_EDIT_FRESH:
      state = {
        ...state,
        zone_utilization_edit_loading: action.status,
      }
      break

    case ZONE_UTILIZATION_STATUS_EDIT:
      state = {
        ...state,
        zone_utilization_status_edit_data: action.payload,
        zone_utilization_status_edit_loading: action.status,
        get_all_zone_utilization_loading: false,
      }
      break

    case ZONE_UTILIZATION_STATUS_EDIT_FRESH:
      state = {
        ...state,
        zone_utilization_status_edit_loading: action.status,
      }
      break

    case ZONE_UTILIZATION_DELETE:
      state = {
        ...state,
        zone_utilization_delete_loading: action.status,
        get_all_zone_utilization_loading: false,
      }
      break
    case ZONE_UTILIZATION_DELETE_FRESH:
      state = {
        ...state,
        zone_utilization_delete_loading: action.status,
        get_all_zone_utilization_loading: false,
      }
  }
  return state
}

export default ZoneUtilization
