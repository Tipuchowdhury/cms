import {
  ADD_QUEST,
  ADD_QUEST_FRESH,
  GET_ALL_QUEST,
  GET_ALL_QUEST_FRESH,
  QUEST_EDIT,
  QUEST_EDIT_FRESH,
  GET_QUEST_BY_ID,
  QUEST_DELETE,
  QUEST_DELETE_FRESH,
  QUEST_STATUS_EDIT,
  QUEST_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_QUEST,
  SERVER_SIDE_PAGINATION_QUEST_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_QUEST_FRESH,
  GET_QUEST_BY_ID_FRESH,
} from "./actionTypes"

const initialState = {
  // for quest add
  add_quest_data: null,
  add_quest_error: null,
  add_quest_loading: false,

  // load all quest
  get_all_quest_data: null,
  get_all_quest_error: null,
  get_all_quest_loading: false,

  //quest edit
  quest_edit_data: null,
  quest_edit_loading: false,

  quest_status_edit_data: null,
  quest_status_edit_loading: false,

  quest_delete_loading: false,

  // server side pagination QUEST
  get_server_side_pagination_quest_data: null,
  get_server_side_pagination_quest_error: null,
  get_server_side_pagination_quest_loading: false,

  get_server_side_pagination_quest_search_data: null,
  get_server_side_pagination_quest_search_loading: false,

  get_quest_by_id_data: null,
  get_quest_by_id_error: null,
  get_quest_by_id_loading: false,
}

const quest = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEST:
      state = {
        ...state,
        add_quest_data: action.payload,
        add_quest_error: null,
        add_quest_loading: action.status,
        get_all_quest_loading: false,
      }
      break

    case ADD_QUEST_FRESH:
      state = {
        ...state,
        add_quest_loading: action.status,
      }
      break

    case GET_ALL_QUEST:
      state = {
        ...state,
        get_all_quest_data: action.payload,
        get_all_quest_error: null,
        get_all_quest_loading: action.status,
      }
      break

    case GET_ALL_QUEST_FRESH:
      state = {
        ...state,
        get_all_quest_loading: action.status,
      }
      break

    case QUEST_EDIT:
      state = {
        ...state,
        quest_edit_data: action.payload,
        quest_edit_loading: action.status,
        get_all_quest_loading: false,
      }
      break

    case QUEST_EDIT_FRESH:
      state = {
        ...state,
        quest_edit_loading: action.status,
      }
      break

    case QUEST_STATUS_EDIT:
      state = {
        ...state,
        quest_status_edit_data: action.payload,
        quest_status_edit_loading: action.status,
        get_all_quest_loading: false,
      }
      break

    case QUEST_STATUS_EDIT_FRESH:
      state = {
        ...state,
        quest_status_edit_loading: action.status,
      }
      break

    case QUEST_DELETE:
      state = {
        ...state,
        quest_delete_loading: action.status,
        get_all_quest_loading: false,
      }
      break
    case QUEST_DELETE_FRESH:
      state = {
        ...state,
        quest_delete_loading: action.status,
        get_all_quest_loading: false,
      }
      break

    case SERVER_SIDE_PAGINATION_QUEST:
      state = {
        ...state,
        get_server_side_pagination_quest_data: action.payload,
        get_server_side_pagination_quest_error: null,
        get_server_side_pagination_quest_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_QUEST_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_quest_search_data: action.payload,
        get_server_side_pagination_quest_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_QUEST_FRESH:
      state = {
        ...state,
        get_server_side_pagination_quest_search_data: action.payload,
        get_server_side_pagination_quest_search_loading: action.status,
      }
      break

    case GET_QUEST_BY_ID:
      state = {
        ...state,
        get_quest_by_id_data: action.payload,
        get_quest_by_id_error: action.error,
        get_quest_by_id_loading: action.status,
      }
      break

    case GET_QUEST_BY_ID_FRESH:
      state = {
        ...state,
        get_quest_by_id_data: action.payload,
        get_quest_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default quest
