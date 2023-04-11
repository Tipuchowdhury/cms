import {
  ADD_CAMPAIGN,
  ADD_CAMPAIGN_FRESH,
  GET_ALL_CAMPAIGN,
  GET_ALL_CAMPAIGN_FRESH,
  CAMPAIGN_EDIT,
  CAMPAIGN_EDIT_FRESH,
  GET_CAMPAIGN_BY_ID,
  CAMPAIGN_DELETE,
  CAMPAIGN_DELETE_FRESH,
  CAMPAIGN_STATUS_EDIT,
  CAMPAIGN_STATUS_EDIT_FRESH,
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
  }
  return state
}

export default campaign
