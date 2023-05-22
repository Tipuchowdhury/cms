import {
  ADD_REWARD_POINT,
  ADD_REWARD_POINT_FRESH,
  GET_ALL_REWARD_POINT,
  GET_ALL_REWARD_POINT_FRESH,
  REWARD_POINT_NAME_EDIT,
  REWARD_POINT_NAME_EDIT_FRESH,
  GET_REWARD_POINT_NAME_BY_ID,
  REWARD_POINT_DELETE,
  REWARD_POINT_DELETE_FRESH,
  EDIT_REWARD_STATUS,
  EDIT_REWARD_STATUS_FRESH,
} from "./actionTypes"

const initialState = {
  // for rewardPoint add
  add_rewardPoint_data: null,
  add_rewardPoint_error: null,
  add_rewardPoint_loading: false,

  // load all rewardPoint
  get_all_rewardPoint_data: null,
  get_all_rewardPoint_error: null,
  get_all_rewardPoint_loading: false,

  //rewardPoint name edit
  rewardPoint_name_edit_data: null,
  rewardPoint_name_edit_loading: false,

  edit_reward_status_loading: false,

  rewardPoint_delete_loading: false,
}

const RewardPoints = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REWARD_POINT:
      state = {
        ...state,
        add_rewardPoint_data: action.payload,
        add_rewardPoint_error: null,
        add_rewardPoint_loading: action.status,
        get_all_rewardPoint_loading: false,
      }
      break

    case ADD_REWARD_POINT_FRESH:
      state = {
        ...state,
        add_rewardPoint_loading: action.status,
      }
      break

    case GET_ALL_REWARD_POINT:
      state = {
        ...state,
        get_all_rewardPoint_data: action.payload,
        get_all_rewardPoint_error: null,
        get_all_rewardPoint_loading: action.status,
      }
      break

    case GET_ALL_REWARD_POINT_FRESH:
      state = {
        ...state,
        get_all_rewardPoint_loading: action.status,
      }
      break

    case REWARD_POINT_NAME_EDIT:
      state = {
        ...state,
        rewardPoint_name_edit_data: action.payload,
        rewardPoint_name_edit_loading: action.status,
        get_all_rewardPoint_loading: false,
      }
      break

    case REWARD_POINT_NAME_EDIT_FRESH:
      state = {
        ...state,
        rewardPoint_name_edit_loading: action.status,
      }
      break

    case EDIT_REWARD_STATUS:
      state = {
        ...state,
        edit_reward_status_loading: action.status,
        get_all_rewardPoint_loading: false,
      }
      break
    case EDIT_REWARD_STATUS_FRESH:
      state = {
        ...state,
        edit_reward_status_loading: action.status,
      }
      break

    case REWARD_POINT_DELETE:
      state = {
        ...state,
        rewardPoint_delete_loading: action.status,
        get_all_rewardPoint_loading: false,
      }
      break
    case REWARD_POINT_DELETE_FRESH:
      state = {
        ...state,
        rewardPoint_delete_loading: action.status,
        get_all_rewardPoint_loading: false,
      }
  }
  return state
}

export default RewardPoints
