import {
  ADD_REWARD_LABEL,
  ADD_REWARD_LABEL_FRESH,
  GET_ALL_REWARD_LABEL,
  GET_ALL_REWARD_LABEL_FRESH,
  REWARD_LABEL_EDIT,
  REWARD_LABEL_EDIT_FRESH,
  REWARD_LABEL_DELETE,
  REWARD_LABEL_DELETE_FRESH,
  REWARD_LABEL_STATUS_EDIT,
  REWARD_LABEL_STATUS_EDIT_FRESH,
} from "./actionTypes"

const initialState = {
  // for reward_label add
  add_reward_label_data: null,
  add_reward_label_error: null,
  add_reward_label_loading: false,

  // load all reward_label
  get_all_reward_label_data: null,
  get_all_reward_label_error: null,
  get_all_reward_label_loading: false,

  //reward_label edit
  reward_label_edit_data: null,
  reward_label_edit_loading: false,

  reward_label_status_edit_data: null,
  reward_label_status_edit_loading: false,

  reward_label_delete_loading: false,
}

const RewardLabel = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REWARD_LABEL:
      state = {
        ...state,
        add_reward_label_data: action.payload,
        add_reward_label_error: null,
        add_reward_label_loading: action.status,
        get_all_reward_label_loading: false,
      }
      break

    case ADD_REWARD_LABEL_FRESH:
      state = {
        ...state,
        add_reward_label_loading: action.status,
      }
      break

    case GET_ALL_REWARD_LABEL:
      state = {
        ...state,
        get_all_reward_label_data: action.payload,
        get_all_reward_label_error: null,
        get_all_reward_label_loading: action.status,
      }
      break

    case GET_ALL_REWARD_LABEL_FRESH:
      state = {
        ...state,
        get_all_reward_label_loading: action.status,
      }
      break

    case REWARD_LABEL_EDIT:
      state = {
        ...state,
        reward_label_edit_data: action.payload,
        reward_label_edit_loading: action.status,
        get_all_reward_label_loading: false,
      }
      break

    case REWARD_LABEL_EDIT_FRESH:
      state = {
        ...state,
        reward_label_edit_loading: action.status,
      }
      break

    case REWARD_LABEL_STATUS_EDIT:
      state = {
        ...state,
        reward_label_status_edit_data: action.payload,
        reward_label_status_edit_loading: action.status,
        get_all_reward_label_loading: false,
      }
      break

    case REWARD_LABEL_STATUS_EDIT_FRESH:
      state = {
        ...state,
        reward_label_status_edit_loading: action.status,
      }
      break

    case REWARD_LABEL_DELETE:
      state = {
        ...state,
        reward_label_delete_loading: action.status,
        get_all_reward_label_loading: false,
      }
      break
    case REWARD_LABEL_DELETE_FRESH:
      state = {
        ...state,
        reward_label_delete_loading: action.status,
        get_all_reward_label_loading: false,
      }
  }
  return state
}

export default RewardLabel
