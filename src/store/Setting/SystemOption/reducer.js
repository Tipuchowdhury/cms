import {
  ADD_SYSTEM_OPTION,
  ADD_SYSTEM_OPTION_FRESH,
  GET_ALL_SYSTEM_OPTION,
  GET_ALL_SYSTEM_OPTION_FRESH,
  SYSTEM_OPTION_EDIT,
  SYSTEM_OPTION_EDIT_FRESH,
  SYSTEM_OPTION_DELETE,
  SYSTEM_OPTION_DELETE_FRESH,
  SYSTEM_OPTION_STATUS_EDIT,
  SYSTEM_OPTION_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for system_option add
  add_system_option_data: null,
  add_system_option_error: null,
  add_system_option_loading: false,

  // load all system_option
  get_all_system_option_data: null,
  get_all_system_option_error: null,
  get_all_system_option_loading: false,

  //system_option edit
  system_option_edit_data: null,
  system_option_edit_loading: false,

  system_option_status_edit_data: null,
  system_option_status_edit_loading: false,

  system_option_delete_loading: false,
}

const SystemOption = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SYSTEM_OPTION:
      state = {
        ...state,
        add_system_option_data: action.payload,
        add_system_option_error: null,
        add_system_option_loading: action.status,
        get_all_system_option_loading: false,
      }
      break

    case ADD_SYSTEM_OPTION_FRESH:
      state = {
        ...state,
        add_system_option_loading: action.status,
      }
      break

    case GET_ALL_SYSTEM_OPTION:
      state = {
        ...state,
        get_all_system_option_data: action.payload,
        get_all_system_option_error: null,
        get_all_system_option_loading: action.status,
      }
      break

    case GET_ALL_SYSTEM_OPTION_FRESH:
      state = {
        ...state,
        get_all_system_option_loading: action.status,
      }
      break

    case SYSTEM_OPTION_EDIT:
      state = {
        ...state,
        system_option_edit_data: action.payload,
        system_option_edit_loading: action.status,
        get_all_system_option_loading: false,
      }
      break

    case SYSTEM_OPTION_EDIT_FRESH:
      state = {
        ...state,
        system_option_edit_loading: action.status,
      }
      break

    case SYSTEM_OPTION_STATUS_EDIT:
      state = {
        ...state,
        system_option_status_edit_data: action.payload,
        system_option_status_edit_loading: action.status,
        get_all_system_option_loading: false,
      }
      break

    case SYSTEM_OPTION_STATUS_EDIT_FRESH:
      state = {
        ...state,
        system_option_status_edit_loading: action.status,
      }
      break

    case SYSTEM_OPTION_DELETE:
      state = {
        ...state,
        system_option_delete_loading: action.status,
        get_all_system_option_loading: false,
      }
      break
    case SYSTEM_OPTION_DELETE_FRESH:
      state = {
        ...state,
        system_option_delete_loading: action.status,
        get_all_system_option_loading: false,
      }
  }
  return state
}

export default SystemOption
