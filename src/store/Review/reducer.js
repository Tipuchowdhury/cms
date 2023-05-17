import {
  ADD_REVIEW,
  ADD_REVIEW_FRESH,
  GET_ALL_REVIEW,
  GET_ALL_REVIEW_FRESH,
  REVIEW_EDIT,
  REVIEW_EDIT_FRESH,
  REVIEW_DELETE,
  REVIEW_DELETE_FRESH,
  REVIEW_STATUS_EDIT,
  REVIEW_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for review add
  add_review_data: null,
  add_review_error: null,
  add_review_loading: false,

  // load all review
  get_all_review_data: null,
  get_all_review_error: null,
  get_all_review_loading: false,

  //review edit
  review_edit_data: null,
  review_edit_loading: false,

  review_status_edit_data: null,
  review_status_edit_loading: false,

  review_delete_loading: false,
}

const Review = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      state = {
        ...state,
        add_review_data: action.payload,
        add_review_error: null,
        add_review_loading: action.status,
        get_all_review_loading: false,
      }
      break

    case ADD_REVIEW_FRESH:
      state = {
        ...state,
        add_review_loading: action.status,
      }
      break

    case GET_ALL_REVIEW:
      state = {
        ...state,
        get_all_review_data: action.payload,
        get_all_review_error: null,
        get_all_review_loading: action.status,
      }
      break

    case GET_ALL_REVIEW_FRESH:
      state = {
        ...state,
        get_all_review_loading: action.status,
      }
      break

    case REVIEW_EDIT:
      state = {
        ...state,
        review_edit_data: action.payload,
        review_edit_loading: action.status,
        get_all_review_loading: false,
      }
      break

    case REVIEW_EDIT_FRESH:
      state = {
        ...state,
        review_edit_loading: action.status,
      }
      break

    case REVIEW_STATUS_EDIT:
      state = {
        ...state,
        review_status_edit_data: action.payload,
        review_status_edit_loading: action.status,
        get_all_review_loading: false,
      }
      break

    case REVIEW_STATUS_EDIT_FRESH:
      state = {
        ...state,
        review_status_edit_loading: action.status,
      }
      break

    case REVIEW_DELETE:
      state = {
        ...state,
        review_delete_loading: action.status,
        get_all_review_loading: false,
      }
      break
    case REVIEW_DELETE_FRESH:
      state = {
        ...state,
        review_delete_loading: action.status,
        get_all_review_loading: false,
      }
  }
  return state
}

export default Review
