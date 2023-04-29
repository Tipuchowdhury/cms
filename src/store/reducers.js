import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import registerNew from "./register-new/reducer"
import zoneCity from "./zoneCity/reducer"
import Restaurant from "./Restaurant/reducer"
import Category from "./Category/reducer"
import Campaign from "./Campaign/reducer"
import SubscriptionTypes from "./SubscriptionTypes/reducer"
import RewardPoints from "./CRM/RewardPoints/reducer"
import VoucherSetting from "./CRM/VoucherSetting/reducer"
import Coupon from "./Coupon/reducer"

import Sliders from "./slider/reducer"
import BranchAttribute from "./BranchAttribute/reducer"
//Calendar
import calendar from "./calendar/reducer"

import Popup from "./Popup/reducer"

// Notification
import Notification from "./Notification/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  registerNew,
  zoneCity,
  Restaurant,
  Category,
  Campaign,
  SubscriptionTypes,
  RewardPoints,
  VoucherSetting,
  Coupon,
  Sliders,
  BranchAttribute,
  Popup,
  Notification,
})

export default rootReducer
