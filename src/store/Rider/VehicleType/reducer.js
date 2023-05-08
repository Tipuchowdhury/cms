import {
  ADD_VEHICLE_TYPE,
  ADD_VEHICLE_TYPE_FRESH,
  GET_ALL_VEHICLE_TYPE,
  GET_ALL_VEHICLE_TYPE_FRESH,
  VEHICLE_TYPE_EDIT,
  VEHICLE_TYPE_EDIT_FRESH,
  GET_VEHICLE_TYPE_BY_ID,
  VEHICLE_TYPE_DELETE,
  VEHICLE_TYPE_DELETE_FRESH,
  EDIT_VEHICLE_TYPE_STATUS,
  EDIT_VEHICLE_TYPE_STATUS_FRESH

} from "./actionTypes"

const initialState = {
  // for vehicle_type add
  add_vehicle_type_data: null,
  add_vehicle_type_error: null,
  add_vehicle_type_loading: false,

  // load all vehicle_type
  get_all_vehicle_type_data: null,
  get_all_vehicle_type_error: null,
  get_all_vehicle_type_loading: false,

  //vehicle_type edit
  vehicle_type_edit_data: null,
  vehicle_type_edit_loading: false,

  edit_vehicle_type_status_loading: false,

  vehicle_type_delete_loading: false,
}

const VehicleType = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE_TYPE:
      state = {
        ...state,
        add_vehicle_type_data: action.payload,
        add_vehicle_type_error: null,
        add_vehicle_type_loading: action.status,
        get_all_vehicle_type_loading: false,
      }
      break

    case ADD_VEHICLE_TYPE_FRESH:
      state = {
        ...state,
        add_vehicle_type_loading: action.status,
      }
      break

    case GET_ALL_VEHICLE_TYPE:
      state = {
        ...state,
        get_all_vehicle_type_data: action.payload,
        get_all_vehicle_type_error: null,
        get_all_vehicle_type_loading: action.status,
      }
      break

    case GET_ALL_VEHICLE_TYPE_FRESH:
      state = {
        ...state,
        get_all_vehicle_type_loading: action.status,
      }
      break

    case VEHICLE_TYPE_EDIT:
      state = {
        ...state,
        vehicle_type_edit_data: action.payload,
        vehicle_type_edit_loading: action.status,
        get_all_vehicle_type_loading: false,
      }
      break

    case VEHICLE_TYPE_EDIT_FRESH:
      state = {
        ...state,
        vehicle_type_edit_loading: action.status,
      }
      break

    case EDIT_VEHICLE_TYPE_STATUS:
      state = {
        ...state,
        edit_vehicle_type_status_loading: action.status,
        get_all_vehicle_type_loading: false,
      }
      break;
    case EDIT_VEHICLE_TYPE_STATUS_FRESH:
      state = {
        ...state,
        edit_vehicle_type_status_loading: action.status,
      }
      break;

    case VEHICLE_TYPE_DELETE:
      state = {
        ...state,
        vehicle_type_delete_loading: action.status,
        get_all_vehicle_type_loading: false,
      }
      break
    case VEHICLE_TYPE_DELETE_FRESH:
      state = {
        ...state,
        vehicle_type_delete_loading: action.status,
        get_all_vehicle_type_loading: false,
      }
  }
  return state
}

export default VehicleType
