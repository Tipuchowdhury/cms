import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  USER_LOGIN,
  TEST_DATA,
  USER_LOGIN_FRESH,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FRESH
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,

  // for registration
  login_data: null,
  login_error: null,
  login_loading: false,

  //forget password
  forget_password_loading: false,

  test_data: null,

}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case USER_LOGIN:
      state = {
        ...state,
        login_data: action.payload,
        login_error: null,
        login_loading: action.status,
      }

    case FORGET_PASSWORD:
      state = {
        ...state,
        forget_password_loading: action.status,
      }

    case FORGET_PASSWORD_FRESH:
      state = {
        ...state,
        forget_password_loading: action.status,
      }

    case USER_LOGIN_FRESH:
      state = {
        ...state,
        login_loading: action.status,
      }
    case TEST_DATA:
      state = {
        ...state,
        test_data: action.payload,

      }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
