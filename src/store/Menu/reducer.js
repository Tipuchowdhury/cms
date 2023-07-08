import {
  GET_AVAILABLE_MENU_BY_BRANCH_ID,
  GET_AVAILABLE_MENU_BY_BRANCH_ID_FRESH,
} from "./actionTypes"

const initialState = {
  get_available_menu_by_branch_id_data: null,
  get_available_menu_by_branch_id_error: null,
  get_available_menu_by_branch_id_loading: false,
}

const menu = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_MENU_BY_BRANCH_ID:
      state = {
        ...state,
        get_available_menu_by_branch_id_data: action.payload,
        get_available_menu_by_branch_id_error: null,
        get_available_menu_by_branch_id_loading: action.status,
      }
      break

    case GET_AVAILABLE_MENU_BY_BRANCH_ID_FRESH:
      state = {
        ...state,
        get_available_menu_by_branch_id_loading: action.status,
      }
      break
  }
  return state
}

export default menu
