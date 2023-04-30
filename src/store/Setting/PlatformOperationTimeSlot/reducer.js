import {
    ADD_OPERATION_TIME_SLOT, ADD_OPERATION_TIME_SLOT_FRESH, GET_ALL_OPERATION_TIME_SLOT, GET_ALL_OPERATION_TIME_SLOT_FRESH, OPERATION_TIME_SLOT_EDIT, OPERATION_TIME_SLOT_EDIT_FRESH, OPERATION_TIME_SLOT_DELETE, OPERATION_TIME_SLOT_DELETE_FRESH, OPERATION_TIME_SLOT_STATUS_EDIT, OPERATION_TIME_SLOT_STATUS_EDIT_FRESH
} from "./actionTypes";

const initialState = {

    // for operation_time_slot add
    add_operation_time_slot_data: null,
    add_operation_time_slot_error: null,
    add_operation_time_slot_loading: false,

    // load all operation_time_slot
    get_all_operation_time_slot_data: null,
    get_all_operation_time_slot_error: null,
    get_all_operation_time_slot_loading: false,

    //operation_time_slot edit
    operation_time_slot_edit_data: null,
    operation_time_slot_edit_loading: false,

    operation_time_slot_status_edit_data: null,
    operation_time_slot_status_edit_loading: false,

    operation_time_slot_delete_loading: false
}

const OperationTimeSlot = (state = initialState, action) => {
    switch (action.type) {

        case ADD_OPERATION_TIME_SLOT:
            state = {
                ...state,
                add_operation_time_slot_data: action.payload,
                add_operation_time_slot_error: null,
                add_operation_time_slot_loading: action.status,
                get_all_operation_time_slot_loading: false
            }
            break;

        case ADD_OPERATION_TIME_SLOT_FRESH:
            state = {
                ...state,
                add_operation_time_slot_loading: action.status,
            }
            break;

        case GET_ALL_OPERATION_TIME_SLOT:
            state = {
                ...state,
                get_all_operation_time_slot_data: action.payload,
                get_all_operation_time_slot_error: null,
                get_all_operation_time_slot_loading: action.status,
            }
            break;

        case GET_ALL_OPERATION_TIME_SLOT_FRESH:
            state = {
                ...state,
                get_all_operation_time_slot_loading: action.status,
            }
            break;


        case OPERATION_TIME_SLOT_EDIT:
            state = {
                ...state,
                operation_time_slot_edit_data: action.payload,
                operation_time_slot_edit_loading: action.status,
                get_all_operation_time_slot_loading: false
            };
            break;

        case OPERATION_TIME_SLOT_EDIT_FRESH:
            state = {
                ...state,
                operation_time_slot_edit_loading: action.status,
            }
            break;

        case OPERATION_TIME_SLOT_STATUS_EDIT:
            state = {
                ...state,
                operation_time_slot_status_edit_data: action.payload,
                operation_time_slot_status_edit_loading: action.status,
                get_all_operation_time_slot_loading: false
            };
            break;

        case OPERATION_TIME_SLOT_STATUS_EDIT_FRESH:
            state = {
                ...state,
                operation_time_slot_status_edit_loading: action.status,
            }
            break;

        case OPERATION_TIME_SLOT_DELETE:
            state = {
                ...state,
                operation_time_slot_delete_loading: action.status,
                get_all_operation_time_slot_loading: false
            }
            break;
        case OPERATION_TIME_SLOT_DELETE_FRESH:
            state = {
                ...state,
                operation_time_slot_delete_loading: action.status,
                get_all_operation_time_slot_loading: false
            }
    }
    return state
}

export default OperationTimeSlot
