import {
  ADD_SLIDER,
  ADD_SLIDER_FRESH,
  GET_ALL_SLIDER,
  GET_ALL_SLIDER_FRESH,
  SLIDER_EDIT,
  SLIDER_EDIT_FRESH,
  SLIDER_DELETE,
  SLIDER_DELETE_FRESH,
  SLIDER_STATUS_EDIT,
  SLIDER_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for subscription type add
  add_slider_data: null,
  add_slider_error: null,
  add_slider_loading: false,

  // load all slider
  get_all_slider_data: null,
  get_all_slider_error: null,
  get_all_slider_loading: false,

  //slider edit
  slider_edit_data: null,
  slider_edit_loading: false,

  slider_status_edit_data: null,
  slider_status_edit_loading: false,

  slider_delete_loading: false,
}

const Sliders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SLIDER:
      state = {
        ...state,
        add_slider_data: action.payload,
        add_slider_error: null,
        add_slider_loading: action.status,
        get_all_slider_loading: false,
      }
      break

    case ADD_SLIDER_FRESH:
      state = {
        ...state,
        add_slider_loading: action.status,
      }
      break

    case GET_ALL_SLIDER:
      state = {
        ...state,
        get_all_slider_data: action.payload,
        get_all_slider_error: null,
        get_all_slider_loading: action.status,
      }
      break

    case GET_ALL_SLIDER_FRESH:
      state = {
        ...state,
        get_all_slider_loading: action.status,
      }
      break

    case SLIDER_EDIT:
      state = {
        ...state,
        slider_edit_data: action.payload,
        slider_edit_loading: action.status,
        get_all_slider_loading: false,
      }
      break

    case SLIDER_EDIT_FRESH:
      state = {
        ...state,
        slider_edit_loading: action.status,
      }
      break

    case SLIDER_STATUS_EDIT:
      state = {
        ...state,
        slider_status_edit_data: action.payload,
        slider_status_edit_loading: action.status,
        get_all_slider_loading: false,
      }
      break

    case SLIDER_STATUS_EDIT_FRESH:
      state = {
        ...state,
        slider_status_edit_loading: action.status,
      }
      break

    case SLIDER_DELETE:
      state = {
        ...state,
        slider_delete_loading: action.status,
        get_all_slider_loading: false,
      }
      break
    case SLIDER_DELETE_FRESH:
      state = {
        ...state,
        slider_delete_loading: action.status,
        get_all_slider_loading: false,
      }
  }
  return state
}

export default Sliders
