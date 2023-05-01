import {
    ADD_REASON, ADD_REASON_FRESH, GET_ALL_REASON, GET_ALL_REASON_FRESH, REASON_EDIT, REASON_EDIT_FRESH, REASON_DELETE, REASON_DELETE_FRESH, REASON_STATUS_EDIT, REASON_STATUS_EDIT_FRESH
} from "./actionTypes";

const initialState = {

    // for reason add
    add_reason_data: null,
    add_reason_error: null,
    add_reason_loading: false,

    // load all reason
    get_all_reason_data: null,
    get_all_reason_error: null,
    get_all_reason_loading: false,

    //reason edit
    reason_edit_data: null,
    reason_edit_loading: false,

    reason_status_edit_data: null,
    reason_status_edit_loading: false,

    reason_delete_loading: false
}

const Reason = (state = initialState, action) => {
    switch (action.type) {

        case ADD_REASON:
            state = {
                ...state,
                add_reason_data: action.payload,
                add_reason_error: null,
                add_reason_loading: action.status,
                get_all_reason_loading: false
            }
            break;

        case ADD_REASON_FRESH:
            state = {
                ...state,
                add_reason_loading: action.status,
            }
            break;

        case GET_ALL_REASON:
            state = {
                ...state,
                get_all_reason_data: action.payload,
                get_all_reason_error: null,
                get_all_reason_loading: action.status,
            }
            break;

        case GET_ALL_REASON_FRESH:
            state = {
                ...state,
                get_all_reason_loading: action.status,
            }
            break;


        case REASON_EDIT:
            state = {
                ...state,
                reason_edit_data: action.payload,
                reason_edit_loading: action.status,
                get_all_reason_loading: false
            };
            break;

        case REASON_EDIT_FRESH:
            state = {
                ...state,
                reason_edit_loading: action.status,
            }
            break;

        case REASON_STATUS_EDIT:
            state = {
                ...state,
                reason_status_edit_data: action.payload,
                reason_status_edit_loading: action.status,
                get_all_reason_loading: false
            };
            break;

        case REASON_STATUS_EDIT_FRESH:
            state = {
                ...state,
                reason_status_edit_loading: action.status,
            }
            break;

        case REASON_DELETE:
            state = {
                ...state,
                reason_delete_loading: action.status,
                get_all_reason_loading: false
            }
            break;
        case REASON_DELETE_FRESH:
            state = {
                ...state,
                reason_delete_loading: action.status,
                get_all_reason_loading: false
            }
    }
    return state
}

export default Reason
