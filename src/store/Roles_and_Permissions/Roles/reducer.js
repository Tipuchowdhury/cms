import {
    ADD_PERMISSION, ADD_PERMISSION_FRESH, GET_ALL_PERMISSION, GET_ALL_PERMISSION_FRESH, PERMISSION_EDIT, PERMISSION_EDIT_FRESH, PERMISSION_DELETE, PERMISSION_DELETE_FRESH, PERMISSION_STATUS_EDIT, PERMISSION_STATUS_EDIT_FRESH
} from "./actionTypes";

const initialState = {

    // for permission type add
    add_permission_data: null,
    add_permission_error: null,
    add_permission_loading: false,

    // load all permission type
    get_all_permission_data: null,
    get_all_permission_error: null,
    get_all_permission_loading: false,

    //permission type edit
    permission_edit_data: null,
    permission_edit_loading: false,

    permission_status_edit_data: null,
    permission_status_edit_loading: false,

    permission_delete_loading: false
}

const Permissions = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PERMISSION:
            state = {
                ...state,
                add_permission_data: action.payload,
                add_permission_error: null,
                add_permission_loading: action.status,
                get_all_permission_loading: false
            }
            break;

        case ADD_PERMISSION_FRESH:
            state = {
                ...state,
                add_permission_loading: action.status,
            }
            break;

        case GET_ALL_PERMISSION:
            state = {
                ...state,
                get_all_permission_data: action.payload,
                get_all_permission_error: null,
                get_all_permission_loading: action.status,
            }
            break;

        case GET_ALL_PERMISSION_FRESH:
            state = {
                ...state,
                get_all_permission_loading: action.status,
            }
            break;


        case PERMISSION_EDIT:
            state = {
                ...state,
                permission_edit_data: action.payload,
                permission_edit_loading: action.status,
                get_all_permission_loading: false
            };
            break;

        case PERMISSION_EDIT_FRESH:
            state = {
                ...state,
                permission_edit_loading: action.status,
            }
            break;

        case PERMISSION_STATUS_EDIT:
            state = {
                ...state,
                permission_status_edit_data: action.payload,
                permission_status_edit_loading: action.status,
                get_all_permission_loading: false
            };
            break;

        case PERMISSION_STATUS_EDIT_FRESH:
            state = {
                ...state,
                permission_status_edit_loading: action.status,
            }
            break;

        case PERMISSION_DELETE:
            state = {
                ...state,
                permission_delete_loading: action.status,
                get_all_permission_loading: false
            }
            break;
        case PERMISSION_DELETE_FRESH:
            state = {
                ...state,
                permission_delete_loading: action.status,
                get_all_permission_loading: false
            }
    }
    return state
}

export default Permissions
