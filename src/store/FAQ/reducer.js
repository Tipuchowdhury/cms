import {
  ADD_FAQ,
  ADD_FAQ_FRESH,
  GET_ALL_FAQ,
  GET_ALL_FAQ_FRESH,
  FAQ_EDIT,
  FAQ_EDIT_FRESH,
  FAQ_DELETE,
  FAQ_DELETE_FRESH,
  FAQ_STATUS_EDIT,
  FAQ_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_FAQ,
  SERVER_SIDE_PAGINATION_FAQ_FRESH,
  GET_FAQ_BY_ID,
  GET_FAQ_BY_ID_FRESH,
} from "./actionTypes"

const initialState = {
  // for subscription type add
  add_faq_data: null,
  add_faq_error: null,
  add_faq_loading: false,

  // load all faq
  get_all_faq_data: null,
  get_all_faq_error: null,
  get_all_faq_loading: false,

  //faq edit
  faq_edit_data: null,
  faq_edit_loading: false,

  faq_status_edit_data: null,
  faq_status_edit_loading: false,

  faq_delete_loading: false,

  // server side pagination faq
  get_server_side_pagination_faq_data: null,
  get_server_side_pagination_faq_error: null,
  get_server_side_pagination_faq_loading: false,

  get_faq_by_id_data: null,
  get_faq_by_id_error: null,
  get_faq_by_id_loading: false,
}

const Faq = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAQ:
      state = {
        ...state,
        add_faq_data: action.payload,
        add_faq_error: null,
        add_faq_loading: action.status,
        get_all_faq_loading: false,
        get_server_side_pagination_faq_loading: false,
      }
      break

    case ADD_FAQ_FRESH:
      state = {
        ...state,
        add_faq_loading: action.status,
      }
      break

    case GET_ALL_FAQ:
      state = {
        ...state,
        get_all_faq_data: action.payload,
        get_all_faq_error: null,
        get_all_faq_loading: action.status,
      }
      break

    case GET_ALL_FAQ_FRESH:
      state = {
        ...state,
        get_all_faq_loading: action.status,
      }
      break

    case FAQ_EDIT:
      state = {
        ...state,
        faq_edit_data: action.payload,
        faq_edit_loading: action.status,
        get_all_faq_loading: false,
        get_server_side_pagination_faq_loading: false,
      }
      break

    case FAQ_EDIT_FRESH:
      state = {
        ...state,
        faq_edit_loading: action.status,
      }
      break

    case FAQ_STATUS_EDIT:
      state = {
        ...state,
        faq_status_edit_data: action.payload,
        faq_status_edit_loading: action.status,
        get_all_faq_loading: false,
        get_server_side_pagination_faq_loading: false,
      }
      break

    case FAQ_STATUS_EDIT_FRESH:
      state = {
        ...state,
        faq_status_edit_loading: action.status,
      }
      break

    case FAQ_DELETE:
      state = {
        ...state,
        faq_delete_loading: action.status,
        get_all_faq_loading: false,
        get_server_side_pagination_faq_loading: false,
      }
      break
    case FAQ_DELETE_FRESH:
      state = {
        ...state,
        faq_delete_loading: action.status,
        get_all_faq_loading: false,
      }
      break

    case SERVER_SIDE_PAGINATION_FAQ:
      state = {
        ...state,
        get_server_side_pagination_faq_data: action.payload,
        get_server_side_pagination_faq_error: null,
        get_server_side_pagination_faq_loading: action.status,
      }
      break
    case SERVER_SIDE_PAGINATION_FAQ_FRESH:
      state = {
        ...state,
        get_server_side_pagination_faq_data: action.payload,
        get_server_side_pagination_faq_loading: action.status,
      }
      break

    case GET_FAQ_BY_ID:
      state = {
        ...state,
        get_faq_by_id_data: action.payload,
        get_faq_by_id_error: null,
        get_faq_by_id_loading: action.status,
      }
      break

    case GET_FAQ_BY_ID_FRESH:
      state = {
        ...state,
        get_faq_by_id_data: null,
        get_faq_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default Faq
