import {
  ADD_COUPON,
  ADD_COUPON_FRESH,
  GET_ALL_COUPON,
  GET_ALL_COUPON_FRESH,
  COUPON_EDIT,
  COUPON_EDIT_FRESH,
  COUPON_DELETE,
  COUPON_DELETE_FRESH,
  COUPON_STATUS_EDIT,
  COUPON_STATUS_EDIT_FRESH,
} from "./actionTypes"
import axios from "axios"
import { convertToFormData } from "helpers/functions"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const addCouponAction = (
  id,
  data,
  selectedCouponType,
  selectedBranch,
  selectedCategory,
  selectedCuisine,
  selectedSubType,
  selectedUser,
  selectedZone,
  selectedMenu,
  gradual
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Post"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            branch_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCategory =
    selectedCategory?.length > 0
      ? selectedCategory.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            category_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCuisine =
    selectedCuisine?.length > 0
      ? selectedCuisine.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            cusine_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCategory =
    selectedCategory?.length > 0
      ? selectedCategory.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            category_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedUser =
    selectedUser?.length > 0
      ? selectedUser.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            customer_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedSubType =
    selectedSubType?.length > 0
      ? selectedSubType.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            subscription_type_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedZone =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            zone_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedMenu =
    selectedMenu?.length > 0
      ? selectedMenu.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            menu_item_id: item.value,
            coupon_id: id,
          }
        })
      : []

  gradual =
    gradual?.length > 0
      ? gradual.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            sequence: item.sequence,
            discount_percent: item.discount_percent,
            coupon_id: id,
          }
        })
      : []
  // const formData = {
  //   _id: id,
  //   ...data,
  //   coupon_type_name: selectedCouponType.value,
  //   branches: selectedBranchData,
  //   categories: selectedCategory,
  //   cuisines: selectedCuisine,
  //   customers: selectedUser,
  //   menu_items: [],
  //   subscription_types: selectedSubType,
  //   zones: selectedZone,
  //   gradual_informations: gradual,
  //   restaurants: [],
  // }

  const dataObject = {
    _id: id,
    ...data,
    coupon_type_name: selectedCouponType.value,
    branches: selectedBranchData,
    categories: selectedCategory,
    cuisines: selectedCuisine,
    customers: selectedUser,
    menu_items: selectedMenu,
    subscription_types: selectedSubType,
    zones: selectedZone,
    gradual_informations: gradual,
    restaurants: [],
  }
  const formData = convertToFormData(dataObject)
  return dispatch => {
    console.log("-in the dispatch----")

    const headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        console.log("response :", response)
        dispatch({
          type: ADD_COUPON,
          payload: response.data,
          status: "Success",
        })
        toast.success("Coupon Added Successfully")
      })

      .catch(error => {
        dispatch({
          type: ADD_COUPON,
          payload: error,
          status: "Failed",
        })
        toast.error("Failed to add")
      })
  }
}

export const addCouponFresh = () => {
  return dispatch =>
    dispatch({
      type: ADD_COUPON_FRESH,
      status: false,
    })
}

export const getAllCouponAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Get"
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_COUPON,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_COUPON,
          status: "Failed",
        })
      })
  }
}

export const getAllCouponFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_COUPON_FRESH,
      payload: null,
      status: "Success",
    })
  }
}

export const couponEditAction = (
  id,
  data,
  selectedCouponType,
  selectedBranch,
  selectedCategory,
  selectedCuisine,
  selectedSubType,
  selectedUser,
  selectedZone,
  selectedMenu,
  gradual
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Put"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            branch_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCategory =
    selectedCategory?.length > 0
      ? selectedCategory.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            category_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCuisine =
    selectedCuisine?.length > 0
      ? selectedCuisine.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            cusine_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedCategory =
    selectedCategory?.length > 0
      ? selectedCategory.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            category_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedUser =
    selectedUser?.length > 0
      ? selectedUser.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            customer_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedSubType =
    selectedSubType?.length > 0
      ? selectedSubType.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            subscription_type_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedZone =
    selectedZone?.length > 0
      ? selectedZone.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            zone_id: item.value,
            coupon_id: id,
          }
        })
      : []

  selectedMenu =
    selectedMenu?.length > 0
      ? selectedMenu.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            menu_item_id: item.value,
            coupon_id: id,
          }
        })
      : []

  gradual =
    gradual?.length > 0
      ? gradual.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            sequence: item.sequence,
            discount_percent: item.discount_percent,
            coupon_id: id,
          }
        })
      : []
  // const formData = {
  //   _id: id,
  //   ...data,
  //   coupon_type_name: selectedCouponType.value,
  //   branches: selectedBranchData,
  //   categories: selectedCategory,
  //   cuisines: selectedCuisine,
  //   customers: selectedUser,
  //   menu_items: [],
  //   subscription_types: selectedSubType,
  //   zones: selectedZone,
  //   gradual_informations: gradual,
  //   restaurants: [],
  // }

  const dataObject = {
    _id: id,
    ...data,
    coupon_type_name: selectedCouponType.value,
    branches: selectedBranchData,
    categories: selectedCategory,
    cuisines: selectedCuisine,
    customers: selectedUser,
    menu_items: selectedMenu,
    subscription_types: selectedSubType,
    zones: selectedZone,
    gradual_informations: gradual,
    restaurants: [],
  }
  const formData = convertToFormData(dataObject)
  return dispatch => {
    const headers = {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: COUPON_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponEditFresh = () => {
  return dispatch => {
    dispatch({
      type: COUPON_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const couponStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Put"
  const dataObject = data
  const formData = convertToFormData(dataObject)
  // console.log(formData)
  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: COUPON_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: COUPON_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const couponDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Coupon/Delete"
  console.log(id)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: COUPON_DELETE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: COUPON_DELETE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const couponDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: COUPON_DELETE_FRESH,
      status: false,
    })
}
