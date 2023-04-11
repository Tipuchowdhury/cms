import {
    ADD_RESTAURANT,
    GET_ALL_RESTAURANT,
    RESTAURANT_NAME_UPDATE,
    RESTAURANT_STATUS_UPDATE,
    GET_ALL_CUSINE,
    ADD_BRANCH,
    GET_ALL_BRANCH,
    ADD_ZONE,
    GET_ALL_ZONE,
    EDIT_ZONE,
    ADD_ZONE_FRESH,
    EDIT_ZONE_FRESH,
    ADD_BRANCH_FRESH,
    EDIT_BRANCH,
    EDIT_BRANCH_FRESH,
    ADD_ONS_CATEGORY,
    ADD_CUISINE,
    GET_CUISINE,
    EDIT_CUISINE

} from "./actionTypes"

const initialState = {

    // for restaurant add
    add_restaurant_data: null,
    add_restaurant_error: null,
    add_restaurant_loading: false,

    get_all_restaurant_data: null,
    get_all_restaurant_error: null,
    get_all_restaurant_loading: false,

    get_all_cusine_data: null,
    get_all_cusine_error: null,
    get_all_cusine_loading: false,

    add_branch_data: null,
    add_branch_error: null,
    add_branch_loading: false,

    get_all_branch_data: null,
    get_all_branch_error: null,
    get_all_branch_loading: false,

    add_zone_data: null,
    add_zone_error: null,
    add_zone_loading: false,

    get_all_zone_data: null,
    get_all_zone_error: null,
    get_all_zone_loading: false,

    edit_zone_loading: false,
    edit_branch_loading: false,

    add_ons_category_data: null,
    add_ons_category_error: null,
    add_ons_category_loading: false,

    add_cuisine_data: null,
    add_cuisine_error: null,
    add_cuisine_loading: false,

    get_all_cuisine_data: null,
    get_all_cuisine_error: null,
    get_all_cuisine_loading: false,

    edit_cuisine_loading: false,
}

const Restaurant = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RESTAURANT:
            state = {
                ...state,
                get_all_restaurant_data: action.payload,
                get_all_restaurant_error: null,
                get_all_restaurant_loading: action.status,

            }
            break;

        case ADD_RESTAURANT:
            state = {
                ...state,
                add_restaurant_data: action.payload,
                add_restaurant_error: null,
                add_restaurant_loading: action.status,
                get_all_restaurant_loading: false

            }
            break;

        case RESTAURANT_NAME_UPDATE:
            state = {
                ...state,
                restaurant_name_update_loading: action.status,
                get_all_restaurant_loading: false
            }
            break;

        case RESTAURANT_STATUS_UPDATE:
            state = {
                ...state,
                restaurant_status_update_loading: action.status,
                get_all_restaurant_loading: false
            }
            break;

        case GET_ALL_CUSINE:
            state = {
                ...state,
                get_all_cusine_data: action.payload,
                get_all_cusine_error: null,
                get_all_cusine_loading: action.status,

            }
            break;
        case ADD_BRANCH:
            state = {
                ...state,
                add_branch_data: action.payload,
                add_branch_error: null,
                add_branch_loading: action.status,
                get_all_branch_loading: false
            }
            break;

        case GET_ALL_BRANCH:
            state = {
                ...state,
                get_all_branch_data: action.payload,
                get_all_branch_error: null,
                get_all_branch_loading: action.status

            }
            break;

        case ADD_ZONE:
            state = {
                ...state,
                add_zone_data: action.payload,
                add_zone_error: null,
                add_zone_loading: action.status,
                get_all_zone_loading: false
            }
            break;

        case GET_ALL_ZONE:
            state = {
                ...state,
                get_all_zone_data: action.payload,
                get_all_zone_error: null,
                get_all_zone_loading: action.status

            }
            break;

        case EDIT_ZONE:
            state = {
                ...state,
                edit_zone_loading: action.status,
                get_all_zone_loading: false
            }
            break;

        case ADD_ZONE_FRESH:
            state = {
                ...state,
                add_zone_loading: action.status,
            }
            break;

        case EDIT_ZONE_FRESH:
            state = {
                ...state,
                edit_zone_loading: action.status,
            }
            break;

        case ADD_BRANCH_FRESH:
            state = {
                ...state,
                add_branch_loading: action.status,
            }
            break;
        case EDIT_BRANCH:
            state = {
                ...state,
                edit_branch_loading: action.status,
                get_all_branch_loading: false,
            }
            break;
        case EDIT_BRANCH_FRESH:
            state = {
                ...state,
                edit_branch_loading: action.status,
            }
            break;

        case ADD_ONS_CATEGORY:
            state = {
                ...state,
                add_ons_category_data: action.payload,
                add_ons_category_error: action.error,
                add_ons_category_loading: action.status,
            }
            break;

        case ADD_CUISINE:
            state = {
                ...state,
                add_cuisine_data: action.payload,
                add_cuisine_error: action.error,
                add_cuisine_loading: action.status,
                get_all_cuisine_loading: false
            }
            break;

        case GET_CUISINE:
            state = {
                ...state,
                get_all_cuisine_data: action.payload,
                get_all_cuisine_error: action.error,
                get_all_cuisine_loading: action.status

            }
            break;

        case EDIT_CUISINE:
            state = {
                ...state,
                edit_cuisine_loading: action.status,
                get_all_cuisine_loading: false
            }
            break;

    }
    return state
}

export default Restaurant
