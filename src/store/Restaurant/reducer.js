import {
    ADD_RESTAURANT,
    GET_ALL_RESTAURANT,
    RESTAURANT_NAME_UPDATE,
    GET_ALL_CUSINE,
    ADD_BRANCH,
    GET_ALL_BRANCH

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
                add_branch_loading: action.status

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

    }
    return state
}

export default Restaurant
