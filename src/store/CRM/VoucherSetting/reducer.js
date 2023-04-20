import {
  ADD_VOUCHER_SETTING,
  ADD_VOUCHER_SETTING_FRESH,
  GET_ALL_VOUCHER_SETTING,
  GET_ALL_VOUCHER_SETTING_FRESH,
  VOUCHER_SETTING_EDIT,
  VOUCHER_SETTING_EDIT_FRESH,
  GET_VOUCHER_SETTING_BY_ID,
  VOUCHER_SETTING_DELETE,
  VOUCHER_SETTING_DELETE_FRESH,
  VOUCHER_SETTING_STATUS_EDIT,
  VOUCHER_SETTING_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for voucher add
  add_voucher_setting_data: null,
  add_voucher_setting_error: null,
  add_voucher_setting_loading: false,

  // load all voucher
  get_all_voucher_setting_data: null,
  get_all_voucher_setting_error: null,
  get_all_voucher_setting_loading: false,

  //voucher edit
  voucher_setting_edit_data: null,
  voucher_setting_edit_loading: false,

  voucher_setting_status_edit_data: null,
  voucher_setting_status_edit_loading: false,

  voucher_setting_delete_loading: false,
}

const VoucherSetting = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VOUCHER_SETTING:
      state = {
        ...state,
        add_voucher_setting_data: action.payload,
        add_voucher_setting_error: null,
        add_voucher_setting_loading: action.status,
        get_all_voucher_setting_loading: false,
      }
      break

    case ADD_VOUCHER_SETTING_FRESH:
      state = {
        ...state,
        add_voucher_setting_loading: action.status,
      }
      break

    case GET_ALL_VOUCHER_SETTING:
      state = {
        ...state,
        get_all_voucher_setting_data: action.payload,
        get_all_voucher_setting_error: null,
        get_all_voucher_setting_loading: action.status,
      }
      break

    case GET_ALL_VOUCHER_SETTING_FRESH:
      state = {
        ...state,
        get_all_voucher_setting_loading: action.status,
      }
      break

    case VOUCHER_SETTING_EDIT:
      state = {
        ...state,
        voucher_setting_edit_data: action.payload,
        voucher_setting_edit_loading: action.status,
        get_all_voucher_setting_loading: false,
      }
      break

    case VOUCHER_SETTING_EDIT_FRESH:
      state = {
        ...state,
        voucher_setting_edit_loading: action.status,
      }
      break

    case VOUCHER_SETTING_STATUS_EDIT:
      state = {
        ...state,
        voucher_setting_status_edit_data: action.payload,
        voucher_setting_status_edit_loading: action.status,
        get_all_voucher_setting_loading: false,
      }
      break

    case VOUCHER_SETTING_STATUS_EDIT_FRESH:
      state = {
        ...state,
        voucher_setting_status_edit_loading: action.status,
      }
      break

    case VOUCHER_SETTING_DELETE:
      state = {
        ...state,
        voucher_setting_delete_loading: action.status,
        get_all_voucher_setting_loading: false,
      }
      break
    case VOUCHER_SETTING_DELETE_FRESH:
      state = {
        ...state,
        voucher_setting_delete_loading: action.status,
        get_all_voucher_setting_loading: false,
      }
  }
  return state
}

export default VoucherSetting
