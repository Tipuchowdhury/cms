import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_FRESH,
  GET_ALL_CUSTOMER,
  GET_ALL_CUSTOMER_FRESH,
  CUSTOMER_NAME_EDIT,
  CUSTOMER_NAME_EDIT_FRESH,
  GET_CUSTOMER_NAME_BY_ID,
  CUSTOMER_DELETE,
  CUSTOMER_DELETE_FRESH,
  EDIT_CUSTOMER_STATUS,
  EDIT_CUSTOMER_STATUS_FRESH,
} from "./actionTypes"

const initialState = {
  // for customer add
  add_customer_data: null,
  add_customer_error: null,
  add_customer_loading: false,

  // load all customer
  get_all_customer_data: null,
  get_all_customer_error: null,
  get_all_customer_loading: false,

  //customer edit
  customer_edit_data: null,
  customer_edit_loading: false,

  edit_cutomer_status_loading: false,

  customer_delete_loading: false,
}

const Customer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      state = {
        ...state,
        add_customer_data: action.payload,
        add_customer_error: null,
        add_customer_loading: action.status,
        get_all_customer_loading: false,
      }
      break

    case ADD_CUSTOMER_FRESH:
      state = {
        ...state,
        add_customer_loading: action.status,
      }
      break

    case GET_ALL_CUSTOMER:
      state = {
        ...state,
        get_all_customer_data: action.payload,
        get_all_customer_error: null,
        get_all_customer_loading: action.status,
      }
      break

    case GET_ALL_CUSTOMER_FRESH:
      state = {
        ...state,
        get_all_customer_loading: action.status,
      }
      break

    case CUSTOMER_NAME_EDIT:
      state = {
        ...state,
        customer_edit_data: action.payload,
        customer_edit_loading: action.status,
        get_all_customer_loading: false,
      }
      break

    case CUSTOMER_NAME_EDIT_FRESH:
      state = {
        ...state,
        customer_edit_loading: action.status,
      }
      break

    case EDIT_CUSTOMER_STATUS:
      state = {
        ...state,
        edit_cutomer_status_loading: action.status,
        get_all_customer_loading: false,
      }
      break
    case EDIT_CUSTOMER_STATUS_FRESH:
      state = {
        ...state,
        edit_cutomer_status_loading: action.status,
      }
      break

    case CUSTOMER_DELETE:
      state = {
        ...state,
        customer_delete_loading: action.status,
        get_all_customer_loading: false,
      }
      break
    case CUSTOMER_DELETE_FRESH:
      state = {
        ...state,
        customer_delete_loading: action.status,
        get_all_customer_loading: false,
      }
  }
  return state
}

export default Customer
