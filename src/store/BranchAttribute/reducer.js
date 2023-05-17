import {
  ADD_BRANCH_ATTRIBUTE,
  ADD_BRANCH_ATTRIBUTE_FRESH,
  GET_ALL_BRANCH_ATTRIBUTE,
  GET_ALL_BRANCH_ATTRIBUTE_FRESH,
  BRANCH_ATTRIBUTE_EDIT,
  BRANCH_ATTRIBUTE_EDIT_FRESH,
  BRANCH_ATTRIBUTE_DELETE,
  BRANCH_ATTRIBUTE_DELETE_FRESH,
  BRANCH_ATTRIBUTE_STATUS_EDIT,
  BRANCH_ATTRIBUTE_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for subscription type add
  add_branch_attribute_data: null,
  add_branch_attribute_error: null,
  add_branch_attribute_loading: false,

  // load all subscription type
  get_all_branch_attribute_data: null,
  get_all_branch_attribute_error: null,
  get_all_branch_attribute_loading: false,

  //subscription type edit
  branch_attribute_edit_data: null,
  branch_attribute_edit_loading: false,

  branch_attribute_status_edit_data: null,
  branch_attribute_status_edit_loading: false,

  branch_attribute_delete_loading: false,
}

const BranchAttribute = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BRANCH_ATTRIBUTE:
      state = {
        ...state,
        add_branch_attribute_data: action.payload,
        add_branch_attribute_error: null,
        add_branch_attribute_loading: action.status,
        get_all_branch_attribute_loading: false,
      }
      break

    case ADD_BRANCH_ATTRIBUTE_FRESH:
      state = {
        ...state,
        add_branch_attribute_loading: action.status,
      }
      break

    case GET_ALL_BRANCH_ATTRIBUTE:
      state = {
        ...state,
        get_all_branch_attribute_data: action.payload,
        get_all_branch_attribute_error: null,
        get_all_branch_attribute_loading: action.status,
      }
      break

    case GET_ALL_BRANCH_ATTRIBUTE_FRESH:
      state = {
        ...state,
        get_all_branch_attribute_loading: action.status,
      }
      break

    case BRANCH_ATTRIBUTE_EDIT:
      state = {
        ...state,
        branch_attribute_edit_data: action.payload,
        branch_attribute_edit_loading: action.status,
        get_all_branch_attribute_loading: false,
      }
      break

    case BRANCH_ATTRIBUTE_EDIT_FRESH:
      state = {
        ...state,
        branch_attribute_edit_loading: action.status,
      }
      break

    case BRANCH_ATTRIBUTE_STATUS_EDIT:
      state = {
        ...state,
        branch_attribute_status_edit_data: action.payload,
        branch_attribute_status_edit_loading: action.status,
        get_all_branch_attribute_loading: false,
      }
      break

    case BRANCH_ATTRIBUTE_STATUS_EDIT_FRESH:
      state = {
        ...state,
        branch_attribute_status_edit_loading: action.status,
      }
      break

    case BRANCH_ATTRIBUTE_DELETE:
      state = {
        ...state,
        branch_attribute_delete_loading: action.status,
        get_all_branch_attribute_loading: false,
      }
      break
    case BRANCH_ATTRIBUTE_DELETE_FRESH:
      state = {
        ...state,
        branch_attribute_delete_loading: action.status,
        get_all_branch_attribute_loading: false,
      }
  }
  return state
}

export default BranchAttribute
