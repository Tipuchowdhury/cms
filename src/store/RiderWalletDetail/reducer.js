import {
  ADD_RIDER_WALLET_DETAIL,
  ADD_RIDER_WALLET_DETAIL_FRESH,
  GET_ALL_RIDER_WALLET_DETAIL,
  GET_ALL_RIDER_WALLET_DETAIL_FRESH,
  RIDER_WALLET_DETAIL_EDIT,
  RIDER_WALLET_DETAIL_EDIT_FRESH,
  RIDER_WALLET_DETAIL_DELETE,
  RIDER_WALLET_DETAIL_DELETE_FRESH,
  RIDER_WALLET_DETAIL_STATUS_EDIT,
  RIDER_WALLET_DETAIL_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for rider list type add
  add_rider_wallet_detail_data: null,
  add_rider_wallet_detail_error: null,
  add_rider_wallet_detail_loading: false,

  // load all rider list type
  get_all_rider_wallet_detail_data: null,
  get_all_rider_wallet_detail_error: null,
  get_all_rider_wallet_detail_loading: false,

  //rider list type edit
  rider_wallet_detail_edit_data: null,
  rider_wallet_detail_edit_loading: false,

  rider_wallet_detail_status_edit_data: null,
  rider_wallet_detail_status_edit_loading: false,

  rider_wallet_detail_delete_loading: false,
}

const RiderWalletDetail = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RIDER_WALLET_DETAIL:
      state = {
        ...state,
        add_rider_wallet_detail_data: action.payload,
        add_rider_wallet_detail_error: null,
        add_rider_wallet_detail_loading: action.status,
        get_all_rider_wallet_detail_loading: false,
      }
      break

    case ADD_RIDER_WALLET_DETAIL_FRESH:
      state = {
        ...state,
        add_rider_wallet_detail_loading: action.status,
      }
      break

    case GET_ALL_RIDER_WALLET_DETAIL:
      state = {
        ...state,
        get_all_rider_wallet_detail_data: action.payload,
        get_all_rider_wallet_detail_error: null,
        get_all_rider_wallet_detail_loading: action.status,
      }
      break

    case GET_ALL_RIDER_WALLET_DETAIL_FRESH:
      state = {
        ...state,
        get_all_rider_wallet_detail_loading: action.status,
      }
      break

    case RIDER_WALLET_DETAIL_EDIT:
      state = {
        ...state,
        rider_wallet_detail_edit_data: action.payload,
        rider_wallet_detail_edit_loading: action.status,
        get_all_rider_wallet_detail_loading: false,
      }
      break

    case RIDER_WALLET_DETAIL_EDIT_FRESH:
      state = {
        ...state,
        rider_wallet_detail_edit_loading: action.status,
      }
      break

    case RIDER_WALLET_DETAIL_STATUS_EDIT:
      state = {
        ...state,
        rider_wallet_detail_status_edit_data: action.payload,
        rider_wallet_detail_status_edit_loading: action.status,
        get_all_rider_wallet_detail_loading: false,
      }
      break

    case RIDER_WALLET_DETAIL_STATUS_EDIT_FRESH:
      state = {
        ...state,
        rider_wallet_detail_status_edit_loading: action.status,
      }
      break

    case RIDER_WALLET_DETAIL_DELETE:
      state = {
        ...state,
        rider_wallet_detail_delete_loading: action.status,
        get_all_rider_wallet_detail_loading: false,
      }
      break
    case RIDER_WALLET_DETAIL_DELETE_FRESH:
      state = {
        ...state,
        rider_wallet_detail_delete_loading: action.status,
        get_all_rider_wallet_detail_loading: false,
      }
  }
  return state
}

export default RiderWalletDetail
