import {
  ADD_WALLET,
  ADD_WALLET_FRESH,
  GET_ALL_WALLET,
  GET_ALL_WALLET_FRESH,
  WALLET_EDIT,
  WALLET_EDIT_FRESH,
  WALLET_DELETE,
  WALLET_DELETE_FRESH,
  WALLET_STATUS_EDIT,
  WALLET_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for wallet type add
  add_wallet_data: null,
  add_wallet_error: null,
  add_wallet_loading: false,

  // load all wallet type
  get_all_wallet_data: null,
  get_all_wallet_error: null,
  get_all_wallet_loading: false,

  //wallet type edit
  wallet_edit_data: null,
  wallet_edit_loading: false,

  wallet_status_edit_data: null,
  wallet_status_edit_loading: false,

  wallet_delete_loading: false,
}

const Wallet = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WALLET:
      state = {
        ...state,
        add_wallet_data: action.payload,
        add_wallet_error: null,
        add_wallet_loading: action.status,
        get_all_wallet_loading: false,
      }
      break

    case ADD_WALLET_FRESH:
      state = {
        ...state,
        add_wallet_loading: action.status,
      }
      break

    case GET_ALL_WALLET:
      state = {
        ...state,
        get_all_wallet_data: action.payload,
        get_all_wallet_error: null,
        get_all_wallet_loading: action.status,
      }
      break

    case GET_ALL_WALLET_FRESH:
      state = {
        ...state,
        get_all_wallet_loading: action.status,
      }
      break

    case WALLET_EDIT:
      state = {
        ...state,
        wallet_edit_data: action.payload,
        wallet_edit_loading: action.status,
        get_all_wallet_loading: false,
      }
      break

    case WALLET_EDIT_FRESH:
      state = {
        ...state,
        wallet_edit_loading: action.status,
      }
      break

    case WALLET_STATUS_EDIT:
      state = {
        ...state,
        wallet_status_edit_data: action.payload,
        wallet_status_edit_loading: action.status,
        get_all_wallet_loading: false,
      }
      break

    case WALLET_STATUS_EDIT_FRESH:
      state = {
        ...state,
        wallet_status_edit_loading: action.status,
      }
      break

    case WALLET_DELETE:
      state = {
        ...state,
        wallet_delete_loading: action.status,
        get_all_wallet_loading: false,
      }
      break
    case WALLET_DELETE_FRESH:
      state = {
        ...state,
        wallet_delete_loading: action.status,
        get_all_wallet_loading: false,
      }
  }
  return state
}

export default Wallet
