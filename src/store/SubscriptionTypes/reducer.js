import {
    ADD_SUBSCRIPTION_TYPE, ADD_SUBSCRIPTION_TYPE_FRESH, GET_ALL_SUBSCRIPTION_TYPE, GET_ALL_SUBSCRIPTION_TYPE_FRESH, SUBSCRIPTION_TYPE_EDIT, SUBSCRIPTION_TYPE_EDIT_FRESH, SUBSCRIPTION_TYPE_DELETE, SUBSCRIPTION_TYPE_DELETE_FRESH, SUBSCRIPTION_TYPE_STATUS_EDIT, SUBSCRIPTION_TYPE_STATUS_EDIT_FRESH,

} from "./actionTypes";

const initialState = {

    // for subscription type add
    add_subscription_type_data: null,
    add_subscription_type_error: null,
    add_subscription_type_loading: false,

    // load all subscription type
    get_all_subscription_type_data: null,
    get_all_subscription_type_error: null,
    get_all_subscription_type_loading: false,

    //subscription type edit
    subscription_type_edit_data: null,
    subscription_type_edit_loading: false,

    subscription_type_status_edit_data: null,
    subscription_type_status_edit_loading: false,

    subscription_type_delete_loading: false,


}

const SubscriptionTypes = (state = initialState, action) => {
    switch (action.type) {

        case ADD_SUBSCRIPTION_TYPE:
            state = {
                ...state,
                add_subscription_type_data: action.payload,
                add_subscription_type_error: null,
                add_subscription_type_loading: action.status,
                get_all_subscription_type_loading: false
            }
            break;

        case ADD_SUBSCRIPTION_TYPE_FRESH:
            state = {
                ...state,
                add_subscription_type_loading: action.status,
            }
            break;

        case GET_ALL_SUBSCRIPTION_TYPE:
            state = {
                ...state,
                get_all_subscription_type_data: action.payload,
                get_all_subscription_type_error: null,
                get_all_subscription_type_loading: action.status,
            }
            break;

        case GET_ALL_SUBSCRIPTION_TYPE_FRESH:
            state = {
                ...state,
                get_all_subscription_type_loading: action.status,
            }
            break;


        case SUBSCRIPTION_TYPE_EDIT:
            state = {
                ...state,
                subscription_type_edit_data: action.payload,
                subscription_type_edit_loading: action.status,
                get_all_subscription_type_loading: false
            };
            break;

        case SUBSCRIPTION_TYPE_EDIT_FRESH:
            state = {
                ...state,
                subscription_type_edit_loading: action.status,
            }
            break;

        case SUBSCRIPTION_TYPE_STATUS_EDIT:
            state = {
                ...state,
                subscription_type_status_edit_data: action.payload,
                subscription_type_status_edit_loading: action.status,
                get_all_subscription_type_loading: false
            };
            break;

        case SUBSCRIPTION_TYPE_STATUS_EDIT_FRESH:
            state = {
                ...state,
                subscription_type_status_edit_loading: action.status,
            }
            break;

        case SUBSCRIPTION_TYPE_DELETE:
            state = {
                ...state,
                subscription_type_delete_loading: action.status,
                get_all_subscription_type_loading: false
            }
            break;
        case SUBSCRIPTION_TYPE_DELETE_FRESH:
            state = {
                ...state,
                subscription_type_delete_loading: action.status,
                get_all_subscription_type_loading: false
            }
            bresk;


    }
    return state
}

export default SubscriptionTypes
