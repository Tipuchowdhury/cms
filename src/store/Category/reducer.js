import {
  ADD_CATEGORY,
  ADD_CATEGORY_FRESH,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_FRESH,
  CATEGORY_NAME_EDIT,
  CATEGORY_NAME_EDIT_FRESH,
  GET_CATEGORY_NAME_BY_ID,
  CATEGORY_DELETE,
  CATEGORY_DELETE_FRESH,
} from "./actionTypes"

const initialState = {
  // for category add
  add_category_data: null,
  add_category_error: null,
  add_category_loading: false,

  // load all category
  get_all_category_data: null,
  get_all_category_error: null,
  get_all_category_loading: false,

  //category name edit
  category_name_edit_data: null,
  category_name_edit_loading: false,

  category_delete_loading: false,
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      state = {
        ...state,
        add_category_data: action.payload,
        add_category_error: null,
        add_category_loading: action.status,
        get_all_category_loading: false,
      }
      break

    case ADD_CATEGORY_FRESH:
      state = {
        ...state,
        add_category_loading: action.status,
      }
      break

    case GET_ALL_CATEGORY:
      state = {
        ...state,
        get_all_category_data: action.payload,
        get_all_category_error: null,
        get_all_category_loading: action.status,
      }
      break

    case GET_ALL_CATEGORY_FRESH:
      state = {
        ...state,
        get_all_category_loading: action.status,
      }
      break

    case CATEGORY_NAME_EDIT:
      state = {
        ...state,
        category_name_edit_data: action.payload,
        category_name_edit_loading: action.status,
        get_all_category_loading: false,
      }
      break

    case CATEGORY_NAME_EDIT_FRESH:
      state = {
        ...state,
        category_name_edit_loading: action.status,
      }
      break

    case CATEGORY_DELETE:
      state = {
        ...state,
        category_delete_loading: action.status,
        get_all_category_loading: false,
      }
      break
    case CATEGORY_DELETE_FRESH:
      state = {
        ...state,
        category_delete_loading: action.status,
        get_all_category_loading: false,
      }
  }
  return state
}

export default category
