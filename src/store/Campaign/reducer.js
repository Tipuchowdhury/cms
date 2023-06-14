import {
  ADD_CAMPAIGN,
  ADD_CAMPAIGN_FRESH,
  GET_ALL_CAMPAIGN,
  GET_ALL_CAMPAIGN_FRESH,
  CAMPAIGN_EDIT,
  CAMPAIGN_EDIT_FRESH,
  GET_CAMPAIGN_BY_ID,
  GET_CAMPAIGN_BY_ID_FRESH,
  CAMPAIGN_DELETE,
  CAMPAIGN_DELETE_FRESH,
  CAMPAIGN_STATUS_EDIT,
  CAMPAIGN_STATUS_EDIT_FRESH,
  SERVER_SIDE_PAGINATION_CAMPAIGN,
  SERVER_SIDE_PAGINATION_CAMPAIGN_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_CAMPAIGN_FRESH,
} from "./actionTypes"

const initialState = {
  // for campaign add
  add_campaign_data: null,
  add_campaign_error: null,
  add_campaign_loading: false,

  // load all campaign
  get_all_campaign_data: null,
  get_all_campaign_error: null,
  get_all_campaign_loading: false,

  //campaign edit
  campaign_edit_data: null,
  campaign_edit_loading: false,

  campaign_status_edit_data: null,
  campaign_status_edit_loading: false,

  campaign_delete_loading: false,

  // server side pagination campaign
  get_server_side_pagination_campaign_data: null,
  get_server_side_pagination_campaign_error: null,
  get_server_side_pagination_campaign_loading: false,

  get_server_side_pagination_campaign_search_data: null,
  get_server_side_pagination_campaign_search_loading: false,

  get_campaign_by_id_data: null,
  get_campaign_by_id_error: null,
  get_campaign_by_id_loading: false,
}

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAMPAIGN:
      state = {
        ...state,
        add_campaign_data: action.payload,
        add_campaign_error: null,
        add_campaign_loading: action.status,
        get_all_campaign_loading: false,
      }
      break

    case ADD_CAMPAIGN_FRESH:
      state = {
        ...state,
        add_campaign_loading: action.status,
      }
      break

    case GET_ALL_CAMPAIGN:
      state = {
        ...state,
        get_all_campaign_data: action.payload,
        get_all_campaign_error: null,
        get_all_campaign_loading: action.status,
      }
      break

    case GET_ALL_CAMPAIGN_FRESH:
      state = {
        ...state,
        get_all_campaign_loading: action.status,
      }
      break

    case CAMPAIGN_EDIT:
      state = {
        ...state,
        campaign_edit_data: action.payload,
        campaign_edit_loading: action.status,
        get_all_campaign_loading: false,
      }
      break

    case CAMPAIGN_EDIT_FRESH:
      state = {
        ...state,
        campaign_edit_loading: action.status,
      }
      break

    case CAMPAIGN_STATUS_EDIT:
      state = {
        ...state,
        campaign_status_edit_data: action.payload,
        campaign_status_edit_loading: action.status,
        get_all_campaign_loading: false,
      }
      break

    case CAMPAIGN_STATUS_EDIT_FRESH:
      state = {
        ...state,
        campaign_status_edit_loading: action.status,
      }
      break

    case CAMPAIGN_DELETE:
      state = {
        ...state,
        campaign_delete_loading: action.status,
        get_all_campaign_loading: false,
      }
      break
    case CAMPAIGN_DELETE_FRESH:
      state = {
        ...state,
        campaign_delete_loading: action.status,
        get_all_campaign_loading: false,
      }
      break
    case SERVER_SIDE_PAGINATION_CAMPAIGN:
      state = {
        ...state,
        get_server_side_pagination_campaign_data: action.payload,
        get_server_side_paginationcampaignu_error: null,
        get_server_side_pagination_campaign_loading: action.status,
      }
      break
    case SERVER_SIDE_PAGINATION_CAMPAIGN_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_campaign_search_data: action.payload,
        get_server_side_pagination_campaign_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_CAMPAIGN_FRESH:
      state = {
        ...state,
        get_server_side_pagination_campaign_search_data: action.payload,
        get_server_side_pagination_campaign_search_loading: action.status,
      }
      break

    case GET_CAMPAIGN_BY_ID:
      state = {
        ...state,
        get_campaign_by_id_data: action.payload,
        get_campaign_by_id_error: null,
        get_campaign_by_id_loading: action.status,
      }
      break

    case GET_CAMPAIGN_BY_ID_FRESH:
      state = {
        ...state,
        get_campaign_by_id_data: null,
        get_campaign_by_id_loading: action.status,
      }
      break
  }
  return state
}

export default campaign
