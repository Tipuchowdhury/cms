import React from "react"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import PagesProfile from "pages/Utility/pages-profile"
import City from "pages/City/City"
import Zone from "pages/Zone/Zone"
import ManageUsers from "pages/ManageUsers/ManageUsers"
import SubscriptionTypes from "pages/SubscriptionTypes/SubscriptionTypes"
import Restaurant from "pages/Restaurant/Restaurant"
import Branch from "pages/Restaurant/Branch"
import BranchAdd from "pages/Restaurant/BranchAdd/BranchAdd"
import EmailForRecoverPassword from "pages/AuthenticationInner/Email-for-recover-password"
import Category from "pages/Category/Category"
import AddZone from "pages/Zone/AddZone/AddZone"
import Menu from "pages/Restaurant/Menu/Menu"
import Campaign from "pages/Campaign/Campaign"
import AddCampaign from "pages/Campaign/AddCampaign"
import AddOnsCategory from "pages/Restaurant/AddOnsCategory/AddOnsCategory"
import CategoryAdd from "pages/Restaurant/AddOnsCategory/CategoryAdd/CategoryAdd"
import Slider from "pages/Slider/Slider"
import SliderAdd from "pages/Slider/addSlider/SliderAdd"
import AddMenu from "pages/Restaurant/Menu/AddMenu/AddMenu"
import Cuisine from "pages/Restaurant/Cuisine/Cuisine"
import RewardPoint from "pages/CRM/RewardPoints/RewardPoint"
import Coupon from "pages/Coupon/Coupon"
import AddCoupon from "pages/Coupon/AddCoupon"
import MenuTimeSlot from "pages/Restaurant/MenuItemTimeSlot/MenuTimeSlot"
import AddTimeSlot from "pages/Restaurant/MenuItemTimeSlot/AddTimeSlot/AddTimeSlot"
import BranchAttribute from "pages/BranchAttribute/BranchAttribute"
import VoucherSetting from "pages/CRM/VoucherSetting/VoucherSetting"
import AddVoucherSetting from "pages/CRM/VoucherSetting/AddVoucherSetting"
import Popup from "pages/Popup/Popup"
import Notification from "pages/Notification/Notification"
import AddNotification from "pages/Notification/AddNotification"
import Review from "pages/Review/Review"
import Customer from "pages/Customer/Customer"
import SystemOnOffReason from "pages/Setting/SystemOnOffReason/SystemOnOffReason"
import PlatfromOperationTimeSlot from "pages/Setting/PlatfromOperationTimeSlot/PlatfromOperationTimeSlot"
import SystemOption from "pages/Setting/SystemOption/SystemOption"
import VehicleTypes from "pages/Rider/VehicleTypes/VehicleTypes"
import Riders from "pages/Rider/Riders/Riders"
import AddRider from "pages/Rider/Riders/AddRider"
import Permissions from "pages/roles_and_permissions/Permissions/Permissions"
import Roles from "pages/roles_and_permissions/Roles/Roles"
import Order from "pages/Order/Order"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // profile
  { path: "/profile", component: <UserProfile /> },

  // Zone & City
  { path: "/zone", component: <Zone /> },
  { path: "/add-zone", component: <AddZone /> },
  { path: "/city", component: <City /> },

  // Users
  { path: "/register", component: <Register1 /> },
  { path: "/manage-users", component: <ManageUsers /> },

  { path: "/customers", component: <Customer /> },

  { path: "/vehicle-types", component: <VehicleTypes /> },

  { path: "/riders", component: <Riders /> },
  { path: "/add-rider", component: <AddRider /> },

  { path: "/subscription-types", component: <SubscriptionTypes /> },

  // Restaurant
  { path: "/cuisine", component: <Cuisine /> },

  { path: "/restaurant", component: <Restaurant /> },

  { path: "/branch-attribute", component: <BranchAttribute /> },

  { path: "/manage-branch", component: <Branch /> },
  { path: "/branch-add", component: <BranchAdd /> },

  { path: "/category", component: <Category /> },

  { path: "/campaign", component: <Campaign /> },
  { path: "/add-campaign", component: <AddCampaign /> },

  { path: "/menu", component: <Menu /> },
  { path: "/add-menu", component: <AddMenu /> },

  { path: "/addons-category", component: <AddOnsCategory /> },
  { path: "/category-addons", component: <CategoryAdd /> },

  { path: "/time-slot", component: <MenuTimeSlot /> },
  { path: "/add-time-slot", component: <AddTimeSlot /> },

  // Sliders or Promotions
  { path: "/slider", component: <Slider /> },
  { path: "/add-slider", component: <SliderAdd /> },

  // CRM
  { path: "/reward-point-settings", component: <RewardPoint /> },
  { path: "/voucher_settings", component: <VoucherSetting /> },
  { path: "/add-voucher-settings", component: <AddVoucherSetting /> },

  // Coupon
  { path: "/coupon", component: <Coupon /> },
  { path: "/add-coupon", component: <AddCoupon /> },

  // Popup
  { path: "/popup-banner", component: <Popup /> },

  // Review
  { path: "/review", component: <Review /> },

  // Settings
  { path: "/reason", component: <SystemOnOffReason /> },
  { path: "/operation-time-slot", component: <PlatfromOperationTimeSlot /> },
  { path: "/system-option", component: <SystemOption /> },

  // Roles & Permissions
  { path: "/permissions", component: <Permissions /> },
  { path: "/roles", component: <Roles /> },

  // Orders
  { path: "/dispatch", component: <Order /> },

  // Notification
  { path: "/notification", component: <Notification /> },
  { path: "/add-notification", component: <AddNotification /> },

  //Utilit
  { path: "/pages-profile", component: <PagesProfile /> },

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login1 /> },
  { path: "/forgot-password-2", component: <ForgetPwd /> },
  { path: "/password-recover-email", component: <EmailForRecoverPassword /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  { path: "/upload-token", component: <Recoverpw /> },
  { path: "/forgot-password", component: <ForgetPwd1 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
]

export { userRoutes, authRoutes }
