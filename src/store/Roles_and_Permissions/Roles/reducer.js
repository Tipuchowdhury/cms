import {
    ADD_ROLE, ADD_ROLE_FRESH, GET_ALL_ROLE, GET_ALL_ROLE_FRESH, ROLE_EDIT, ROLE_EDIT_FRESH, ROLE_DELETE, ROLE_DELETE_FRESH, ROLE_STATUS_EDIT, ROLE_STATUS_EDIT_FRESH
} from "./actionTypes";

const initialState = {

    // for role type add
    add_role_data: null,
    add_role_error: null,
    add_role_loading: false,

    // load all role type
    get_all_role_data: null,
    get_all_role_error: null,
    get_all_role_loading: false,

    //role type edit
    role_edit_data: null,
    role_edit_loading: false,

    role_status_edit_data: null,
    role_status_edit_loading: false,

    role_delete_loading: false
}

const Roles = (state = initialState, action) => {
    switch (action.type) {

        case ADD_ROLE:
            state = {
                ...state,
                add_role_data: action.payload,
                add_role_error: null,
                add_role_loading: action.status,
                get_all_role_loading: false
            }
            break;

        case ADD_ROLE_FRESH:
            state = {
                ...state,
                add_role_loading: action.status,
            }
            break;

        case GET_ALL_ROLE:
            state = {
                ...state,
                get_all_role_data: action.payload,
                get_all_role_error: null,
                get_all_role_loading: action.status,
            }
            break;

        case GET_ALL_ROLE_FRESH:
            state = {
                ...state,
                get_all_role_loading: action.status,
            }
            break;


        case ROLE_EDIT:
            state = {
                ...state,
                role_edit_data: action.payload,
                role_edit_loading: action.status,
                get_all_role_loading: false
            };
            break;

        case ROLE_EDIT_FRESH:
            state = {
                ...state,
                role_edit_loading: action.status,
            }
            break;

        case ROLE_STATUS_EDIT:
            state = {
                ...state,
                role_status_edit_data: action.payload,
                role_status_edit_loading: action.status,
                get_all_role_loading: false
            };
            break;

        case ROLE_STATUS_EDIT_FRESH:
            state = {
                ...state,
                role_status_edit_loading: action.status,
            }
            break;

        case ROLE_DELETE:
            state = {
                ...state,
                role_delete_loading: action.status,
                get_all_role_loading: false
            }
            break;
        case ROLE_DELETE_FRESH:
            state = {
                ...state,
                role_delete_loading: action.status,
                get_all_role_loading: false
            }
    }
    return state
}

export default Roles
