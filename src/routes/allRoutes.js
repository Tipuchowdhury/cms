import React from "react"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read"
import EmailCompose from "../pages/Email/email-compose"

import Emailtemplatealert from "../pages/EmailTemplate/email-template-alert"
import Emailtemplatebasic from "../pages/EmailTemplate/email-template-basic"
import Emailtemplatebilling from "../pages/EmailTemplate/email-template-billing"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
// Charts
import ChartApex from "../pages/Charts/Apexcharts"
import ChartistChart from "../pages/Charts/ChartistChart"
import ChartjsChart from "../pages/Charts/ChartjsChart"
import EChart from "../pages/Charts/EChart"
import SparklineChart from "../pages/Charts/SparklineChart"

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"
import MapsLeaflet from "../pages/Maps/MapsLeaflet"

//Icons
import IconDripicons from "../pages/Icons/IconDripicons"
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import TypiconsIcon from "../pages/Icons/IconTypicons"
import IconIon from "../pages/Icons/IconIon"
import ThemifyIcon from "../pages/Icons/IconThemify"
import IconFontawesome from "../pages/Icons/IconFontawesome"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormMask from "../pages/Forms/FormMask"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import FormWizard from "../pages/Forms/FormWizard"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiUtilities from "pages/Ui/UiUtilities"
import UiOffcanvas from "pages/Ui/UiOffcanvas"

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesInvoice from "../pages/Utility/PagesInvoice"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import PagesGallery from "../pages/Utility/PagesGallery"
import PagesDirectory from "../pages/Utility/PagesDirectory"
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
import EditZone from "pages/Zone/AddZone/EditZone2"
import Menu from "pages/Restaurant/Menu/Menu"
import Campaign from "pages/Campaign/Campaign"
import AddCampaign from "pages/Campaign/AddCampaign"
import EditCampaign from "pages/Campaign/EditCampaign"
import AddOnsCategory from "pages/Restaurant/AddOnsCategory/AddOnsCategory"
import CategoryAdd from "pages/Restaurant/AddOnsCategory/CategoryAdd/CategoryAdd"
import Slider from "pages/Slider/Slider"
import SliderAdd from "pages/Slider/addSlider/SliderAdd"
import EditSlider from "pages/Slider/addSlider/EditSlider"
import AddMenu from "pages/Restaurant/Menu/AddMenu/AddMenu"
import AddMenuCopy from "pages/Restaurant/Menu/AddMenu/AddMenu copy"
import EditMenu from "pages/Restaurant/Menu/AddMenu/EditMenu"
import Cuisine from "pages/Restaurant/Cuisine/Cuisine"
import RewardPoint from "pages/CRM/RewardPoints/RewardPoint"
import Coupon from "pages/Coupon/Coupon"
import AddCoupon from "pages/Coupon/AddCoupon"
import EditCoupon from "pages/Coupon/EditCoupon"
import MenuTimeSlot from "pages/Restaurant/MenuItemTimeSlot/MenuTimeSlot"
import AddTimeSlot from "pages/Restaurant/MenuItemTimeSlot/AddTimeSlot/AddTimeSlot"
import BranchAttribute from "pages/BranchAttribute/BranchAttribute"
import VoucherSetting from "pages/CRM/VoucherSetting/VoucherSetting"
import AddVoucherSetting from "pages/CRM/VoucherSetting/AddVoucherSetting"
import Popup from "pages/Popup/Popup"
import EditPopup from "pages/Popup/EditPopup"
import Notification from "pages/Notification/Notification"
import AddNotification from "pages/Notification/AddNotification"
import EditNotification from "pages/Notification/EditNotification"
import Review from "pages/Review/Review"
import Customer from "pages/Customer/Customer"
import SystemOnOffReason from "pages/Setting/SystemOnOffReason/SystemOnOffReason"
import PlatfromOperationTimeSlot from "pages/Setting/PlatfromOperationTimeSlot/PlatfromOperationTimeSlot"
import SystemOption from "pages/Setting/SystemOption/SystemOption"
import VehicleTypes from "pages/Rider/VehicleTypes/VehicleTypes"
import Riders from "pages/Rider/Riders/Riders"
import AddRider from "pages/Rider/Riders/AddRider"
import EditRider from "pages/Rider/Riders/EditRider"
import Permissions from "pages/roles_and_permissions/Permissions/Permissions"
import Roles from "pages/roles_and_permissions/Roles/Roles"
import Order from "pages/Order/Order"
import Refund from "pages/Refund/Refund"
import ZoneUtilization from "pages/ZoneUtilization/ZoneUtilization"
import RiderList from "pages/ZoneUtilization/RiderList"
import Quest from "pages/Quest/Quest"
import AddQuest from "pages/Quest/AddQuest"
import Wallet from "pages/Wallet/Wallet"
import RiderWalletDetail from "pages/Wallet/RiderWalletDetail"
import Invoice from "pages/Order/Invoice"
import RiderInvoice from "pages/Order/RiderInvoice"
import EditUser from "pages/ManageUsers/EditUser"
import CustomerEdit from "pages/Customer/CustomerEdit"
import CategoryEdit from "pages/Restaurant/AddOnsCategory/CategoryAdd/CategoryEdit"
import DineInGallery from "pages/DineInGallery/DineInGallery"
import DineInGalleryAdd from "pages/DineInGallery/DineInGalleryAdd"
import DineInGalleryEdit from "pages/DineInGallery/DineInGalleryEdit"
import RewardLabel from "pages/RewardLevel/RewardLabel"
import VoucherRequest from "pages/VoucherRequest/VoucherRequest"
import TrackRider from "pages/Order/TrackRider"
import TrackRider3 from "pages/Order/TrackRider3"
import FAQ from "../pages/FAQ/FAQ"
import AddRestaurant from "pages/Restaurant/AddRestaurant"

const userRoutes = [
  // { path: "/dashboard", component: <Dashboard /> },

  // calendar
  { path: "/calendar", component: <Calendar /> },

  // profile
  { path: "/profile", component: <UserProfile /> },

  // Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read", component: <EmailRead /> },
  { path: "/email-compose", component: <EmailCompose /> },

  // Email Template
  { path: "/email-template-alert", component: <Emailtemplatealert /> },
  { path: "/email-template-basic", component: <Emailtemplatebasic /> },
  { path: "/email-template-billing", component: <Emailtemplatebilling /> },

  // Zone & City
  { path: "/zone", component: <Zone /> },
  { path: "/add-zone", component: <AddZone /> },
  { path: "/edit-zone", component: <EditZone /> },
  { path: "/city", component: <City /> },

  // Users
  { path: "/register", component: <Register1 /> },
  { path: "/manage-users", component: <ManageUsers /> },
  { path: "/edit-user", component: <EditUser /> },

  { path: "/customers", component: <Customer /> },
  { path: "/customer-edit", component: <CustomerEdit /> },

  { path: "/vehicle-types", component: <VehicleTypes /> },

  { path: "/riders", component: <Riders /> },
  { path: "/add-rider", component: <AddRider /> },
  { path: "/edit-rider", component: <EditRider /> },

  { path: "/subscription-types", component: <SubscriptionTypes /> },

  // Restaurant
  { path: "/cuisine", component: <Cuisine /> },

  { path: "/restaurant", component: <Restaurant /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/edit-restaurant", component: <AddRestaurant /> },

  { path: "/branch-attribute", component: <BranchAttribute /> },

  { path: "/manage-branch", component: <Branch /> },
  { path: "/branch-add", component: <BranchAdd /> },
  { path: "/track-rider/:order_id", component: <TrackRider /> },
  { path: "/track-rider3", component: <TrackRider3 /> },

  { path: "/category", component: <Category /> },

  { path: "/all-campaign", component: <Campaign /> },
  { path: "/campaign", component: <AddCampaign /> },
  { path: "/edit-campaign", component: <EditCampaign /> },

  { path: "/menu", component: <Menu /> },
  { path: "/add-menu", component: <AddMenu /> },
  { path: "/add-multi-menu", component: <AddMenuCopy /> },

  { path: "/edit-menu", component: <EditMenu /> },

  { path: "/addons-category", component: <AddOnsCategory /> },
  { path: "/category-addons", component: <CategoryAdd /> },
  { path: "/category-addons-edit/:id", component: <CategoryEdit /> },

  { path: "/time-slot", component: <MenuTimeSlot /> },
  { path: "/add-time-slot", component: <AddTimeSlot /> },

  // Sliders or Promotions
  { path: "/slider", component: <Slider /> },
  { path: "/add-slider", component: <SliderAdd /> },
  { path: "/edit-slider", component: <EditSlider /> },

  // CRM
  { path: "/reward-point-settings", component: <RewardPoint /> },
  { path: "/voucher_settings", component: <VoucherSetting /> },
  { path: "/add-voucher-settings", component: <AddVoucherSetting /> },

  // Coupon
  { path: "/coupon", component: <Coupon /> },
  { path: "/add-coupon", component: <AddCoupon /> },
  { path: "/edit-coupon", component: <EditCoupon /> },

  // Popup
  { path: "/popup-banner", component: <Popup /> },
  { path: "/edit-popup-banner", component: <EditPopup /> },

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
  { path: "/invoice/:orderID", component: <Invoice /> },
  { path: "/rider_invoice/:orderID", component: <RiderInvoice /> },

  // Refund
  { path: "/refund", component: <Refund /> },

  // Refund
  { path: "/wallet", component: <Wallet /> },
  { path: "/rider-wallet-details/:rider_id", component: <RiderWalletDetail /> },

  // Zone Utilization
  { path: "/zone-utilization", component: <ZoneUtilization /> },
  { path: "/rider-list", component: <RiderList /> },

  // Notification
  { path: "/notification", component: <Notification /> },
  { path: "/add-notification", component: <AddNotification /> },
  { path: "/edit-notification", component: <EditNotification /> },

  // Quests
  { path: "/quests", component: <Quest /> },
  { path: "/add-quest", component: <AddQuest /> },
  { path: "/edit-quest", component: <AddQuest /> },

  // Dine in gallery
  { path: "/dine-in-gallery", component: <DineInGallery /> },
  { path: "/add-dine-in-gallery", component: <DineInGalleryAdd /> },
  { path: "/edit-dine-in-gallery", component: <DineInGalleryEdit /> },

  // Reward Label
  { path: "/reward-label", component: <RewardLabel /> },
  { path: "/voucher-request", component: <VoucherRequest /> },

  // FAQ
  { path: "/faq", component: <FAQ /> },

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartist-charts", component: <ChartistChart /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },

  { path: "/sparkline-charts", component: <SparklineChart /> },

  // Icons
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icons-ion", component: <IconIon /> },
  { path: "/icons-themify", component: <ThemifyIcon /> },
  { path: "/icons-typicons", component: <TypiconsIcon /> },

  // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },
  { path: "/tables-responsive", component: <ResponsiveTables /> },
  { path: "/tables-editable", component: <EditableTables /> },

  // Maps
  { path: "/maps-google", component: <MapsGoogle /> },
  { path: "/maps-vector", component: <MapsVector /> },
  { path: "/maps-leaflet", component: <MapsLeaflet /> },

  // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-xeditable", component: <FormXeditable /> },

  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },

  //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-invoice", component: <PagesInvoice /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },
  { path: "/pages-gallery", component: <PagesGallery /> },
  { path: "/pages-profile", component: <PagesProfile /> },

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  //{ path: "/login", component: <Login /> },
  { path: "/login", component: <Login1 /> },
  { path: "/forgot-password-2", component: <ForgetPwd /> },
  //{ path: "/register", component: <Register /> },
  // { path: "/register", component: <Register1 /> },
  { path: "/password-recover-email", component: <EmailForRecoverPassword /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  //{ path: "/pages-login", component: <Login1 /> },
  //{ path: "/pages-register", component: <Register1 /> },
  { path: "/pages-register-2", component: <Register2 /> },
  // { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/upload-token", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/forgot-password", component: <ForgetPwd1 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  {
    path: "/auth-two-step-verification-2",
    component: <TwostepVerification2 />,
  },
]

export { userRoutes, authRoutes }
