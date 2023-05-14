import {
    REGISTER_USER,
    REGISTER_USER_FRESH,
    UPLOAD_TOKEN,
    UPLOAD_TOKEN_FRESH,
    GET_PASSWORD_RECOVER_TOKEN_BY_MAIL,
    GET_PASSWORD_RECOVER_TOKEN_BY_MAIL_FRESH,
    GET_ALL_USERS,
    GET_ALL_ROLES,
    USER_UPDATE,
    USER_UPDATE_FRESH,
    USER_STATUS_UPDATE,
    USER_STATUS_UPDATE_FRESH,
    USER_DELETE,
    USER_DELETE_FRESH,
    SERVER_SIDE_PAGINATION_USER
} from "./actionTypes"

const initialState = {

    // for registration
    registration_data: null,
    registration_error: null,
    registration_loading: false,

    test_data: null,

    password_recover_token_by_mail_loading: false,

    get_all_user_roles_data: null,
    get_all_user_roles_loading: false,

    get_all_user_data: null,
    get_all_user_error: null,
    get_all_user_loading: false,

    user_update_data: null,
    user_update_error: null,
    user_update_loading: false,

    user_status_update_data: null,
    user_status_update_error: null,
    user_status_update_loading: false,

    user_delete_loading: false,

    get_server_side_pagination_user_data: null,
    get_server_side_pagination_user_error: null,
    get_server_side_pagination_user_loading: false,

}

const registerNew = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER:
            state = {
                ...state,
                registration_data: action.payload,
                registration_error: null,
                registration_loading: action.status,
            }
            break;
        case REGISTER_USER_FRESH:
            state = {
                ...state,
                registration_loading: action.status,
            }
            break;
        case UPLOAD_TOKEN:
            state = {
                ...state,
                upload_token_loading: action.status,
            }
            break;
        case UPLOAD_TOKEN_FRESH:
            state = {
                ...state,
                upload_token_loading: action.status,
            }
            break;
        case GET_PASSWORD_RECOVER_TOKEN_BY_MAIL:
            state = {
                ...state,
                password_recover_token_by_mail_loading: action.status,
            }
            break;
        case GET_PASSWORD_RECOVER_TOKEN_BY_MAIL_FRESH:
            state = {
                ...state,
                password_recover_token_by_mail_loading: action.status,
            }
            break;
        case GET_ALL_ROLES:
            state = {
                ...state,
                get_all_user_roles_data: action.payload,
                get_all_user_roles_loading: action.status,
            }
            break;
        case GET_ALL_USERS:
            state = {
                ...state,
                get_all_user_data: action.payload,
                get_all_user_error: null,
                get_all_user_loading: action.status,
            }
            break;
        case USER_UPDATE:
            state = {
                ...state,
                user_update_data: action.payload,
                user_update_error: null,
                user_update_loading: action.status,
                get_all_user_loading: false
            }
            break;
        case USER_UPDATE_FRESH:
            state = {
                ...state,
                user_update_loading: action.status,
            }
            break;

        case USER_STATUS_UPDATE:
            state = {
                ...state,
                user_status_update_data: action.payload,
                user_status_update_error: null,
                user_status_update_loading: action.status,
                get_all_user_loading: false
            };
            break;

        case USER_STATUS_UPDATE_FRESH:
            state = {
                ...state,
                user_status_update_loading: action.status,
            }
            break;
        case USER_DELETE:
            state = {
                ...state,
                user_delete_loading: action.status,
                get_all_user_loading: false
            }
            break;
        case USER_DELETE_FRESH:
            state = {
                ...state,
                user_delete_loading: action.status,
                get_all_user_loading: false
            }

        case SERVER_SIDE_PAGINATION_USER:
            state = {
                ...state,
                get_server_side_pagination_user_data: action.payload,
                get_server_side_pagination_user_error: null,
                get_server_side_pagination_user_loading: action.status,

            }
            break;

    }
    return state
}

export default registerNew
