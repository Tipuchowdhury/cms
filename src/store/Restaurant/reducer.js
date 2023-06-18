import {
  ADD_RESTAURANT,
  GET_ALL_RESTAURANT,
  RESTAURANT_NAME_UPDATE,
  RESTAURANT_STATUS_UPDATE,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_FRESH,
  GET_ALL_CUSINE,
  ADD_BRANCH,
  GET_ALL_BRANCH,
  GET_ALL_BRANCH_FRESH,
  ADD_ZONE,
  GET_ALL_ZONE,
  EDIT_ZONE,
  EDIT_ZONE_STATUS,
  ADD_ZONE_FRESH,
  EDIT_ZONE_FRESH,
  EDIT_ZONE_STATUS_FRESH,
  DELETE_ZONE,
  DELETE_ZONE_FRESH,
  ADD_BRANCH_FRESH,
  EDIT_BRANCH,
  EDIT_BRANCH_FRESH,
  EDIT_BRANCH_STATUS,
  EDIT_BRANCH_STATUS_FRESH,
  EDIT_BRANCH_POPULAR,
  EDIT_BRANCH_POPULAR_FRESH,
  DELETE_BRANCH,
  DELETE_BRANCH_FRESH,
  ADD_ONS_CATEGORY,
  ADD_CUISINE,
  GET_CUISINE,
  EDIT_CUISINE,
  EDIT_CUISINE_STATUS,
  DELETE_CUISINE,
  DELETE_CUISINE_FRESH,
  GET_ADD_ONS_CATEGORY,
  ADD_ONS_CATEGORY_FRESH,
  DELETE_ADD_ON_CATEGORY,
  DELETE_ADD_ON_CATEGORY_FRESH,
  ADD_RESTAURANT_MENU,
  GET_RESTAURANT_MENU,
  ADD_RESTAURANT_MENU_FRESH,
  EDIT_RESTAURANT_MENU,
  EDIT_RESTAURANT_MENU_FRESH,
  GET_CATEGORY_BY_BRANCH_ID,
  GET_CATEGORY_BY_BRANCH_ID_FRESH,
  EDIT_ADD_ONS_CATEGORY,
  EDIT_ADD_ONS_CATEGORY_FRESH,
  EDIT_ADD_ON_CATEGORY_STATUS,
  EDIT_ADD_ON_CATEGORY_STATUS_FRESH,
  ADD_MENU_TIME_SLOT,
  GET_ALL_MENU_TIME_SLOT,
  ADD_MENU_TIME_SLOT_FRESH,
  EDIT_MENU_TIME_SLOT,
  EDIT_MENU_TIME_SLOT_FRESH,
  EDIT_MENU_TIME_SLOT_STATUS,
  EDIT_MENU_TIME_SLOT_STATUS_FRESH,
  GET_TIME_SLOT_BY_BRANCH_ID,
  GET_TIME_SLOT_BY_BRANCH_ID_FRESH,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_BY_ID_FRESH,
  SERVER_SIDE_PAGINATION_ZONE,
  SERVER_SIDE_PAGINATION_ZONE_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_ZONE_FRESH,
  SERVER_SIDE_PAGINATION_CUISINE,
  SERVER_SIDE_PAGINATION_CUISINE_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_CUISINE_FRESH,
  SERVER_SIDE_PAGINATION_RESTAURANT,
  SERVER_SIDE_PAGINATION_RESTAURANT_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_RESTAURANT_FRESH,
  SERVER_SIDE_PAGINATION_BRANCH,
  SERVER_SIDE_PAGINATION_BRANCH_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_BRANCH_FRESH,
  DELETE_MENU_TIME_SLOT,
  DELETE_MENU_TIME_SLOT_FRESH,
  GET_ZONE_BY_ID,
  GET_ZONE_BY_ID_FRESH,
  GET_ZONE_BY_CITY_ID,
  GET_ZONE_BY_CITY_ID_FRESH,
  DELETE_RESTAURANT_MENU,
  DELETE_RESTAURANT_MENU_FRESH,
  RESTAURANT_MENU_STATUS_EDIT,
  RESTAURANT_MENU_STATUS_EDIT_FRESH,
  GET_RESTAURANT_MENU_BY_BRANCH_ID,
  SERVER_SIDE_PAGINATION_ADDONS_CATEGORY,
  SERVER_SIDE_PAGINATION_ADDONS_CATEGORY_SEARCH,
  SERVER_SIDE_PAGINATION_SEARCH_ADDONS_CATEGORY_FRESH,
  GET_ADD_ON_CATEGORY_BY_ID,
  GET_MENU_ITEM_BY_ID,
  GET_MENU_ITEM_BY_ID_FRESH,
  SERVER_SIDE_PAGINATION_MENU_ITEM_FRESH,
  SERVER_SIDE_PAGINATION_MENU_ITEM,
} from "./actionTypes"

const initialState = {
  // for restaurant add
  add_restaurant_data: null,
  add_restaurant_error: null,
  add_restaurant_loading: false,

  get_all_restaurant_data: null,
  get_all_restaurant_error: null,
  get_all_restaurant_loading: false,

  restaurant_delete_loading: false,

  get_all_addOns_category_data: null,
  get_all_addOns_category_error: null,
  get_all_addOns_category_loading: false,

  get_all_cusine_data: null,
  get_all_cusine_error: null,
  get_all_cusine_loading: false,

  add_branch_data: null,
  add_branch_error: null,
  add_branch_loading: false,

  get_all_branch_data: null,
  get_all_branch_error: null,
  get_all_branch_loading: false,

  branch_delete_loading: false,

  add_zone_data: null,
  add_zone_error: null,
  add_zone_loading: false,

  get_all_zone_data: null,
  get_all_zone_error: null,
  get_all_zone_loading: false,

  edit_zone_loading: false,
  edit_zone_status_loading: false,

  zone_delete_loading: false,

  edit_branch_loading: false,
  edit_branch_status_loading: false,
  edit_branch_popular_loading: false,

  add_ons_category_data: null,
  add_ons_category_error: null,
  add_ons_category_loading: false,

  edit_add_on_category_status_loading: false,

  add_cuisine_data: null,
  add_cuisine_error: null,
  add_cuisine_loading: false,

  get_all_cuisine_data: null,
  get_all_cuisine_error: null,
  get_all_cuisine_loading: false,

  edit_cuisine_loading: false,
  edit_status_cuisine_loading: false,

  cuisine_delete_loading: false,

  add_restaurant_menu_data: null,
  add_restaurant_menu_error: null,
  add_restaurant_menu_loading: false,

  restaurant_menu_delete_loading: false,

  restaurant_menu_status_edit_data: null,
  restaurant_menu_status_edit_loading: false,

  edit_restaurant_menu_loading: false,

  get_all_menu_data: null,
  get_all_menu_error: null,
  get_all_menu_loading: false,

  get_menu_by_branch_id_data: null,
  get_menu_by_branch_id_error: null,
  get_menu_by_branch_id_loading: false,

  edit_addOn_category_loading: false,

  add_menu_time_slot_data: null,
  add_menu_time_slot_error: null,
  add_menu_time_slot_loading: false,

  get_all_menu_time_slot_data: null,
  get_all_menu_time_slot_error: null,
  get_all_menu_time_slot_loading: false,

  edit_menu_time_slot_loading: false,

  edit_menu_time_slot_status_loading: false,

  menu_time_slot_delete_loading: false,

  get_time_slot_by_branch_id_data: null,
  get_time_slot_by_branch_id_error: null,
  get_time_slot_by_branch_id_loading: false,

  get_category_by_id_data: null,
  get_category_by_id_error: null,
  get_category_by_id_loading: false,

  get_category_by_branch_id_data: null,
  get_category_by_branch_id_error: null,
  get_category_by_branch_id_loading: false,

  get_menu_item_by_id_data: null,
  get_menu_item_by_id_error: null,
  get_menu_item_by_id_loading: false,

  // server side pagination ZONE
  get_server_side_pagination_zone_data: null,
  get_server_side_pagination_zone_error: null,
  get_server_side_pagination_zone_loading: false,

  get_server_side_pagination_zone_search_data: null,
  get_server_side_pagination_zone_search_loading: false,

  // server side pagination CUISINE
  get_server_side_pagination_cuisine_data: null,
  get_server_side_pagination_cuisine_error: null,
  get_server_side_pagination_cuisine_loading: false,

  get_server_side_pagination_cuisine_search_data: null,
  get_server_side_pagination_cuisine_search_loading: false,

  // server side pagination restaurant
  get_server_side_pagination_restaurant_data: null,
  get_server_side_pagination_restaurant_error: null,
  get_server_side_pagination_restaurant_loading: false,

  get_server_side_pagination_restaurant_search_data: null,
  get_server_side_pagination_restaurant_search_loading: false,

  // server side pagination branch
  get_server_side_pagination_branch_data: null,
  get_server_side_pagination_branch_error: null,
  get_server_side_pagination_branch_loading: false,

  get_server_side_pagination_branch_search_data: null,
  get_server_side_pagination_branch_search_loading: false,

  // server side pagination addOns category
  get_server_side_pagination_addOns_category_data: null,
  get_server_side_pagination_addOns_category_error: null,
  get_server_side_pagination_addOns_category_loading: false,

  get_server_side_pagination_addOns_category_search_data: null,
  get_server_side_pagination_addOns_category_search_loading: false,

  // server side pagination menu item
  get_server_side_pagination_menu_item_data: null,
  get_server_side_pagination_menu_item_error: null,
  get_server_side_pagination_menu_item_loading: false,

  get_zone_by_id_data: null,
  get_zone_by_id_error: null,
  get_zone_by_id_loading: false,

  get_zone_by_city_id_data: null,
  get_zone_by_city_id_error: null,
  get_zone_by_city_id_loading: false,

  get_add_ons_by_id_data: null,
  get_add_ons_by_id_error: null,
  get_add_ons_by_id_loading: false,
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
      break

    case ADD_RESTAURANT:
      state = {
        ...state,
        add_restaurant_data: action.payload,
        add_restaurant_error: null,
        add_restaurant_loading: action.status,
        get_all_restaurant_loading: false,
      }
      break

    case RESTAURANT_NAME_UPDATE:
      state = {
        ...state,
        restaurant_name_update_loading: action.status,
        get_all_restaurant_loading: false,
      }
      break

    case RESTAURANT_STATUS_UPDATE:
      state = {
        ...state,
        restaurant_status_update_loading: action.status,
        get_all_restaurant_loading: false,
      }
      break
    case DELETE_RESTAURANT:
      state = {
        ...state,
        restaurant_delete_loading: action.status,
        get_all_restaurant_loading: false,
      }
      break
    case DELETE_RESTAURANT_FRESH:
      state = {
        ...state,
        restaurant_delete_loading: action.status,
        get_all_restaurant_loading: false,
      }

    case GET_ALL_CUSINE:
      state = {
        ...state,
        get_all_cusine_data: action.payload,
        get_all_cusine_error: null,
        get_all_cusine_loading: action.status,
      }
      break
    case ADD_BRANCH:
      state = {
        ...state,
        add_branch_data: action.payload,
        add_branch_error: null,
        add_branch_loading: action.status,
        get_all_branch_loading: false,
      }
      break

    case GET_ALL_BRANCH:
      state = {
        ...state,
        get_all_branch_data: action.payload,
        get_all_branch_error: null,
        get_all_branch_loading: action.status,
      }
      break

    case GET_ALL_BRANCH_FRESH:
      state = {
        ...state,
        get_all_branch_loading: action.status,
      }
      break

    case DELETE_BRANCH:
      state = {
        ...state,
        branch_delete_loading: action.status,
        get_all_branch_loading: false,
      }
      break
    case DELETE_BRANCH_FRESH:
      state = {
        ...state,
        branch_delete_loading: action.status,
        get_all_branch_loading: false,
      }

    case ADD_ZONE:
      state = {
        ...state,
        add_zone_data: action.payload,
        add_zone_error: null,
        add_zone_loading: action.status,
        //get_all_zone_loading: false
        get_server_side_pagination_zone_loading: false,
      }
      break

    case GET_ALL_ZONE:
      state = {
        ...state,
        get_all_zone_data: action.payload,
        get_all_zone_error: null,
        get_all_zone_loading: action.status,
      }
      break

    case EDIT_ZONE:
      state = {
        ...state,
        edit_zone_loading: action.status,
        get_all_zone_loading: false,
      }
      break

    case EDIT_ZONE_STATUS:
      state = {
        ...state,
        edit_zone_status_loading: action.status,
        get_all_zone_loading: false,
      }
      break

    case ADD_ZONE_FRESH:
      state = {
        ...state,
        add_zone_loading: action.status,
      }
      break

    case EDIT_ZONE_FRESH:
      state = {
        ...state,
        edit_zone_loading: action.status,
      }
      break

    case EDIT_ZONE_STATUS_FRESH:
      state = {
        ...state,
        edit_zone_status_loading: action.status,
      }
      break

    case DELETE_ZONE:
      state = {
        ...state,
        zone_delete_loading: action.status,
        get_all_zone_loading: false,
      }
      break
    case DELETE_ZONE_FRESH:
      state = {
        ...state,
        zone_delete_loading: action.status,
        get_all_zone_loading: false,
      }

    case ADD_BRANCH_FRESH:
      state = {
        ...state,
        add_branch_loading: action.status,
      }
      break
    case EDIT_BRANCH:
      state = {
        ...state,
        edit_branch_loading: action.status,
        get_all_branch_loading: false,
      }
      break
    case EDIT_BRANCH_FRESH:
      state = {
        ...state,
        edit_branch_loading: action.status,
      }
      break

    case EDIT_BRANCH_STATUS:
      state = {
        ...state,
        edit_branch_status_loading: action.status,
        get_all_branch_loading: false,
      }
      break
    case EDIT_BRANCH_STATUS_FRESH:
      state = {
        ...state,
        edit_branch_status_loading: action.status,
      }
      break

    case EDIT_BRANCH_POPULAR:
      state = {
        ...state,
        edit_branch_popular_loading: action.status,
        get_all_branch_loading: false,
      }
      break
    case EDIT_BRANCH_POPULAR_FRESH:
      state = {
        ...state,
        edit_branch_popular_loading: action.status,
      }
      break

    case ADD_ONS_CATEGORY:
      state = {
        ...state,
        add_ons_category_data: action.payload,
        add_ons_category_error: action.error,
        add_ons_category_loading: action.status,
        get_all_addOns_category_loading: false,
      }
      break

    case ADD_ONS_CATEGORY_FRESH:
      state = {
        ...state,
        add_ons_category_loading: action.status,
      }
      break

    case ADD_CUISINE:
      state = {
        ...state,
        add_cuisine_data: action.payload,
        add_cuisine_error: action.error,
        add_cuisine_loading: action.status,
        get_all_cuisine_loading: false,
      }
      break

    case GET_CUISINE:
      state = {
        ...state,
        get_all_cuisine_data: action.payload,
        get_all_cuisine_error: action.error,
        get_all_cuisine_loading: action.status,
      }
      break

    case EDIT_CUISINE:
      state = {
        ...state,
        edit_cuisine_loading: action.status,
        get_all_cuisine_loading: false,
      }
      break

    case EDIT_CUISINE_STATUS:
      state = {
        ...state,
        edit_status_cuisine_loading: action.status,
        get_all_cuisine_loading: false,
      }
      break

    case DELETE_CUISINE:
      state = {
        ...state,
        cuisine_delete_loading: action.status,
        get_all_cuisine_loading: false,
      }
      break

    case DELETE_CUISINE_FRESH:
      state = {
        ...state,
        cuisine_delete_loading: action.status,
        get_all_cuisine_loading: false,
      }

      break

    case GET_ADD_ONS_CATEGORY:
      state = {
        ...state,
        get_all_addOns_category_data: action.payload,
        get_all_addOns_category_error: null,
        get_all_addOns_category_loading: action.status,
      }
      break

    case DELETE_ADD_ON_CATEGORY:
      state = {
        ...state,
        add_on_category_delete_loading: action.status,
        get_all_addOns_category_loading: false,
      }
      break

    case DELETE_ADD_ON_CATEGORY_FRESH:
      state = {
        ...state,
        add_on_category_delete_loading: action.status,
        get_all_addOns_category_loading: false,
      }

    case EDIT_ADD_ON_CATEGORY_STATUS:
      state = {
        ...state,
        edit_add_on_category_status_loading: action.status,
        get_all_addOns_category_loading: false,
      }
      break
    case EDIT_ADD_ON_CATEGORY_STATUS_FRESH:
      state = {
        ...state,
        edit_add_on_category_status_loading: action.status,
      }
      break

    case ADD_RESTAURANT_MENU:
      state = {
        ...state,
        add_restaurant_menu_data: action.payload,
        add_restaurant_menu_error: null,
        add_restaurant_menu_loading: action.status,
        get_all_menu_loading: false,
        get_server_side_pagination_menu_item_loading: false,
      }
      break
    case ADD_RESTAURANT_MENU_FRESH:
      state = {
        ...state,
        add_restaurant_menu_loading: action.status,
      }
      break
    case GET_RESTAURANT_MENU:
      state = {
        ...state,
        get_all_menu_data: action.payload,
        get_all_menu_error: action.error,
        get_all_menu_loading: action.status,
      }
      break

    case GET_RESTAURANT_MENU_BY_BRANCH_ID:
      state = {
        ...state,
        get_menu_by_branch_id_data: action.payload,
        get_menu_by_branch_id_error: action.error,
        get_menu_by_branch_id_loading: action.status,
      }
      break

    case DELETE_RESTAURANT_MENU:
      state = {
        ...state,
        restaurant_menu_delete_loading: action.status,
        get_all_menu_loading: false,
        get_server_side_pagination_menu_item_loading: false,
      }
      break
    case DELETE_RESTAURANT_MENU_FRESH:
      state = {
        ...state,
        restaurant_menu_delete_loading: action.status,
        get_all_menu_loading: false,
      }

    case RESTAURANT_MENU_STATUS_EDIT:
      state = {
        ...state,
        restaurant_menu_status_edit_data: action.payload,
        restaurant_menu_status_edit_loading: action.status,
        get_all_campaign_loading: false,
        get_server_side_pagination_menu_item_loading: false,
      }
      break

    case RESTAURANT_MENU_STATUS_EDIT_FRESH:
      state = {
        ...state,
        restaurant_menu_status_edit_loading: action.status,
        get_all_menu_loading: false,
      }
      break

    case EDIT_RESTAURANT_MENU:
      state = {
        ...state,

        edit_restaurant_menu_loading: action.status,
        get_all_menu_loading: false,
        get_server_side_pagination_menu_item_loading: false,

        // edit_branch_popular_loading: action.status,
        // get_all_branch_loading: false,
      }
      break
    case EDIT_RESTAURANT_MENU_FRESH:
      state = {
        ...state,
        edit_restaurant_menu_loading: action.status,
      }
      break

    case GET_CATEGORY_BY_BRANCH_ID:
      state = {
        ...state,

        get_category_by_branch_id_data: action.payload,
        get_category_by_branch_id_error: action.error,
        get_category_by_branch_id_loading: action.status,
      }
      break

    case GET_CATEGORY_BY_BRANCH_ID_FRESH:
      state = {
        ...state,

        get_category_by_branch_id_data: action.payload,
        get_category_by_branch_id_loading: action.status,
      }
      break

    case EDIT_ADD_ONS_CATEGORY:
      state = {
        ...state,
        edit_addOn_category_loading: action.status,
        //get_all_branch_loading: false,
        get_all_addOns_category_loading: false,
      }
      break

    case EDIT_ADD_ONS_CATEGORY_FRESH:
      state = {
        ...state,
        edit_addOn_category_loading: action.status,
      }
      break

    case ADD_MENU_TIME_SLOT:
      state = {
        ...state,
        add_menu_time_slot_data: action.payload,
        add_menu_time_slot_error: null,
        add_menu_time_slot_loading: action.status,
        get_all_menu_time_slot_loading: false,
      }

      break

    case GET_ALL_MENU_TIME_SLOT:
      state = {
        ...state,
        get_all_menu_time_slot_data: action.payload,
        get_all_menu_time_slot_error: action.error,
        get_all_menu_time_slot_loading: action.status,
      }
      break

    case ADD_MENU_TIME_SLOT_FRESH:
      state = {
        ...state,
        add_menu_time_slot_loading: action.status,
      }
      break

    case EDIT_MENU_TIME_SLOT:
      state = {
        ...state,
        edit_menu_time_slot_loading: action.status,
        get_all_menu_time_slot_loading: false,
      }
      break

    case EDIT_MENU_TIME_SLOT_FRESH:
      state = {
        ...state,
        edit_menu_time_slot_loading: action.status,
      }
      break

    case EDIT_MENU_TIME_SLOT_STATUS:
      state = {
        ...state,
        edit_menu_time_slot_status_loading: action.status,
        get_all_menu_time_slot_loading: false,
      }
      break

    case EDIT_MENU_TIME_SLOT_STATUS_FRESH:
      state = {
        ...state,
        edit_menu_time_slot_status_loading: action.status,
      }
      break

    case DELETE_MENU_TIME_SLOT:
      state = {
        ...state,
        menu_time_slot_delete_loading: action.status,
        get_all_menu_time_slot_loading: false,
      }
      break

    case DELETE_MENU_TIME_SLOT_FRESH:
      state = {
        ...state,
        menu_time_slot_delete_loading: action.status,
        get_all_menu_time_slot_loading: false,
      }

      break

    case GET_TIME_SLOT_BY_BRANCH_ID:
      state = {
        ...state,
        get_time_slot_by_branch_id_data: action.payload,
        get_time_slot_by_branch_id_error: action.error,
        get_time_slot_by_branch_id_loading: action.status,
      }
      break

    case GET_TIME_SLOT_BY_BRANCH_ID_FRESH:
      state = {
        ...state,
        get_time_slot_by_branch_id_data: action.payload,
        get_time_slot_by_branch_id_loading: action.status,
      }
      break

    case GET_CATEGORY_BY_ID:
      state = {
        ...state,
        get_category_by_id_data: action.payload,
        get_category_by_id_error: action.error,
        get_category_by_id_loading: action.status,
      }
      break

    case GET_CATEGORY_BY_ID_FRESH:
      state = {
        ...state,
        get_category_by_id_data: action.payload,
        get_category_by_id_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ZONE:
      state = {
        ...state,
        get_server_side_pagination_zone_data: action.payload,
        get_server_side_pagination_zone_error: null,
        get_server_side_pagination_zone_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ZONE_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_zone_search_data: action.payload,
        get_server_side_pagination_zone_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_ZONE_FRESH:
      state = {
        ...state,
        get_server_side_pagination_zone_search_data: action.payload,
        get_server_side_pagination_zone_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_CUISINE:
      state = {
        ...state,
        get_server_side_pagination_cuisine_data: action.payload,
        get_server_side_pagination_cuisine_error: null,
        get_server_side_pagination_cuisine_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_CUISINE_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_cuisine_search_data: action.payload,
        get_server_side_pagination_cuisine_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_CUISINE_FRESH:
      state = {
        ...state,
        get_server_side_pagination_cuisine_search_data: action.payload,
        get_server_side_pagination_cuisine_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_RESTAURANT:
      state = {
        ...state,
        get_server_side_pagination_restaurant_data: action.payload,
        get_server_side_pagination_restaurant_error: null,
        get_server_side_pagination_restaurant_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_RESTAURANT_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_restaurant_search_data: action.payload,
        get_server_side_pagination_restaurant_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_RESTAURANT_FRESH:
      state = {
        ...state,
        get_server_side_pagination_restaurant_search_data: action.payload,
        get_server_side_pagination_restaurant_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_BRANCH:
      state = {
        ...state,
        get_server_side_pagination_branch_data: action.payload,
        get_server_side_pagination_branch_error: null,
        get_server_side_pagination_branch_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_BRANCH_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_branch_search_data: action.payload,
        get_server_side_pagination_branch_search_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_SEARCH_BRANCH_FRESH:
      state = {
        ...state,
        get_server_side_pagination_branch_search_data: action.payload,
        get_server_side_pagination_branch_search_loading: action.status,
      }
      break

    case GET_ZONE_BY_ID:
      state = {
        ...state,
        get_zone_by_id_data: action.payload,
        get_zone_by_id_error: null,
        get_zone_by_id_loading: action.status,
      }
      break

    case GET_ZONE_BY_ID_FRESH:
      state = {
        ...state,
        get_zone_by_id_data: null,
        get_zone_by_id_loading: action.status,
      }
      break
    case GET_ZONE_BY_CITY_ID:
      state = {
        ...state,

        get_zone_by_city_id_data: action.payload,
        get_zone_by_city_id_error: action.error,
        get_zone_by_city_id_loading: action.status,
      }
      break

    case GET_ZONE_BY_CITY_ID_FRESH:
      state = {
        ...state,

        get_zone_by_city_id_data: action.payload,
        get_zone_by_city_id_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ADDONS_CATEGORY:
      state = {
        ...state,
        get_server_side_pagination_addOns_category_data: action.payload,
        get_server_side_pagination_addOns_category_error: null,
        get_server_side_pagination_addOns_category_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_ADDONS_CATEGORY_SEARCH:
      state = {
        ...state,
        get_server_side_pagination_addOns_category_search_data: action.payload,
        get_server_side_pagination_addOns_category_search_loading:
          action.status,
      }
      break
    case SERVER_SIDE_PAGINATION_SEARCH_ADDONS_CATEGORY_FRESH:
      state = {
        ...state,
        get_server_side_pagination_addOns_category_search_data: action.payload,
        get_server_side_pagination_addOns_category_search_loading:
          action.status,
      }
      break
    case GET_ADD_ON_CATEGORY_BY_ID:
      state = {
        ...state,
        get_add_ons_by_id_data: action.payload,
        get_add_ons_by_id_error: null,
        get_add_ons_by_id_loading: action.status,
      }
      break

    case GET_MENU_ITEM_BY_ID:
      state = {
        ...state,
        get_menu_item_by_id_data: action.payload,
        get_menu_item_by_id_error: action.error,
        get_menu_item_by_id_loading: action.status,
      }
      break

    case GET_MENU_ITEM_BY_ID_FRESH:
      state = {
        ...state,
        get_menu_item_by_id_data: action.payload,
        get_menu_item_by_id_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_MENU_ITEM:
      state = {
        ...state,
        get_server_side_pagination_menu_item_data: action.payload,
        get_server_side_pagination_menu_item_error: null,
        get_server_side_pagination_menu_item_loading: action.status,
      }
      break

    case SERVER_SIDE_PAGINATION_MENU_ITEM_FRESH:
      state = {
        ...state,
        get_server_side_pagination_menu_item_data: action.payload,
        get_server_side_pagination_menu_item_loading: action.status,
      }
      break
  }
  return state
}

export default Restaurant
