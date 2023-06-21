import {
  ADD_DINE_IN_CARD,
  ADD_DINE_IN_CARD_FRESH,
  GET_ALL_DINE_IN_CARD,
  GET_ALL_DINE_IN_CARD_FRESH,
  DINE_IN_CARD_EDIT,
  DINE_IN_CARD_EDIT_FRESH,
  GET_DINE_IN_CARD_BY_ID,
  GET_DINE_IN_CARD_BY_ID_FRESH,
  DINE_IN_CARD_DELETE,
  DINE_IN_CARD_DELETE_FRESH,
  DINE_IN_CARD_STATUS_EDIT,
  DINE_IN_CARD_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_DINE_IN_CARD,
  SERVER_SIDE_PAGINATION_DINE_IN_CARD_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_DINE_IN_CARD_FRESH,
} from "./actionTypes"

const initialState = {
  // for dine_in_card add
  add_dine_in_card_data: null,
  add_dine_in_card_error: null,
  add_dine_in_card_loading: false,

  // load all dine_in_card
  get_all_dine_in_card_data: null,
  get_all_dine_in_card_error: null,
  get_all_dine_in_card_loading: false,

  //dine_in_card edit
  dine_in_card_edit_data: null,
  dine_in_card_edit_loading: false,

  dine_in_card_status_edit_data: null,
  dine_in_card_status_edit_loading: false,

  dine_in_card_delete_loading: false,

  // server side pagination dine_in_card
  get_server_side_pagination_dine_in_card_data: null,
  get_server_side_pagination_dine_in_card_error: null,
  get_server_side_pagination_dine_in_card_loading: false,

  get_server_side_pagination_dine_in_card_search_data: null,
  get_server_side_pagination_dine_in_card_search_loading: false,

  get_dine_in_card_by_id_data: null,
  get_dine_in_card_by_id_error: null,
  get_dine_in_card_by_id_loading: false,
}

const dineInCard = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DINE_IN_CARD:
      state = {
        ...state,
        add_dine_in_card_data: action.payload,
        add_dine_in_card_error: null,
        add_dine_in_card_loading: action.status,
        get_all_dine_in_card_loading: false,
      }
      break

    case ADD_DINE_IN_CARD_FRESH:
      state = {
        ...state,
        add_dine_in_card_loading: action.status,
      }
      break

    case GET_ALL_DINE_IN_CARD:
      state = {
        ...state,
        get_all_dine_in_card_data: action.payload,
        get_all_dine_in_card_error: null,
        get_all_dine_in_card_loading: action.status,
      }
      break

    case GET_ALL_DINE_IN_CARD_FRESH:
      state = {
        ...state,
        get_all_dine_in_card_loading: action.status,
      }
      break

    case DINE_IN_CARD_EDIT:
      state = {
        ...state,
        dine_in_card_edit_data: action.payload,
        dine_in_card_edit_loading: action.status,
        get_all_dine_in_card_loading: false,
      }
      break

    case DINE_IN_CARD_EDIT_FRESH:
      state = {
        ...state,
        dine_in_card_edit_loading: action.status,
      }
      break

    case DINE_IN_CARD_STATUS_EDIT:
      state = {
        ...state,
        dine_in_card_status_edit_data: action.payload,
        dine_in_card_status_edit_loading: action.status,
        get_all_dine_in_card_loading: false,
      }
      break

    case DINE_IN_CARD_STATUS_EDIT_FRESH:
      state = {
        ...state,
        dine_in_card_status_edit_loading: action.status,
      }
      break

    case DINE_IN_CARD_DELETE:
      state = {
        ...state,
        dine_in_card_delete_loading: action.status,
        get_all_dine_in_card_loading: false,
      }
      break
    case DINE_IN_CARD_DELETE_FRESH:
      state = {
        ...state,
        dine_in_card_delete_loading: action.status,
        get_all_dine_in_card_loading: false,
      }
      break

    case SERVER_SIDE_PAGINATION_DINE_IN_CARD:
      state = {
        ...state,
        get_server_side_pagination_dine_in_card_data: action.payload,
        get_server_side_pagination_dine_in_card_error: null,
        get_server_side_pagination_dine_in_card_loading: action.status,
      }
      break
    case SERVER_SIDE_PAGINATION_DINE_IN_CARD_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_dine_in_card_search_data: action.payload,
        get_server_side_pagination_dine_in_card_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_DINE_IN_CARD_FRESH:
      state = {
        ...state,
        get_server_side_pagination_dine_in_card_search_data: action.payload,
        get_server_side_pagination_dine_in_card_search_loading: action.status,
      }
      break

    case GET_DINE_IN_CARD_BY_ID:
      state = {
        ...state,
        get_dine_in_card_by_id_data: action.payload,
        get_dine_in_card_by_id_error: null,
        get_dine_in_card_by_id_loading: action.status,
      }
      break

    case GET_DINE_IN_CARD_BY_ID_FRESH:
      state = {
        ...state,
        get_dine_in_card_by_id_data: null,
        get_dine_in_card_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default dineInCard
