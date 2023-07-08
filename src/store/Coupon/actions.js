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
  SERVER_SIDE_PAGINATION_COUPON,
  SERVER_SIDE_PAGINATION_COUPON_FRESH,
  SERVER_SIDE_PAGINATION_COUPON_SEARCH,
  SERVER_SIDE_PAGINATION_COUPON_SEARCH_FRESH,
  GET_COUPON_BY_ID,
  GET_COUPON_BY_ID_FRESH,
  GET_VALID_COUPONS_FOR_CART,
  GET_VALID_COUPONS_FOR_CART_FRESH,
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

  // gradual =
  //   gradual?.length > 0
  //     ? gradual.map(item => {
  //         const val = uuidv4()
  //         return {
  //           _id: val,
  //           sequence: item.sequence,
  //           discount_percent: item.discount_percent,
  //           coupon_id: id,
  //         }
  //       })
  //     : []

  const gradual_data = gradual
    .filter(data => data.sequence != "")
    .map(item => {
      const val = uuidv4()
      return {
        _id: val,
        sequence: item.sequence,
        discount_percent: item.discount_percent,
        coupon_id: id,
      }
    })

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
    gradual_informations: gradual_data,
    restaurants: [],
  }

  // name: data.name,
  // image: data.image,
  // description: data.description,
  // coupon_type_id: data.coupon_type_id,
  // coupon_type_name: data.coupon_type_name,
  // is_gradual: data.is_gradual,
  // use_limit: data.use_limit,
  // is_auto_apply: true,
  // daily_use_limit: data.daily_use_limit,
  // is_percent: data.is_percent,
  // is_active: data.is_active,
  // is_free_delivery: data.is_free_delivery,
  // is_delivery: data.is_delivery,
  // is_pickup: data.is_pickup,
  // is_dine: data.is_dine,
  // discount_in_amount: data.discount_in_amount,
  // discount_in_percent: data.discount_in_percent,
  // minimum_order_amount: data.minimum_order_amount,
  // maximum_discount_amount: data.maximum_discount_amount,
  // total_coupon: data.total_coupon,
  // valid_time_in_a_day_start: data.valid_time_in_a_day_start,
  // valid_time_in_a_day_end: data.valid_time_in_a_day_end,
  // start_time: data.start_time,
  // end_time: data.end_time,

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

  gradual = gradual
    .filter(data => data.sequence != "")
    .map(item => {
      const val = uuidv4()
      return {
        _id: val,
        sequence: item.sequence,
        discount_percent: item.discount_percent,
        coupon_id: id,
      }
    })

  // const gradual_data = gradual
  //   .filter(data => data.sequence != "")
  //   .map(item => {
  //     const val = uuidv4()
  //     return {
  //       _id: val,
  //       sequence: item.sequence,
  //       discount_percent: item.discount_percent,
  //       coupon_id: id,
  //     }
  //   })
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
        toast.success("Coupon Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: COUPON_EDIT,
          payload: error,
          status: "Failed",
        })
        toast.error("Coupon Edited Fail")
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
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Coupon/isActive?id=${data._id}&is_active=${data.is_active}`

  //const formData = data
  const formData = {
    _id: data._id,
    is_active: data.is_active,
  }
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

export const getServerSidePaginationCouponAction = (index, limit) => {
  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Coupon/Search?page=${index}&limit=${limit}`

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
          type: SERVER_SIDE_PAGINATION_COUPON,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_COUPON,
          status: "Failed",
        })
      })
  }
}

export const serverSidePaginationCouponFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_COUPON_FRESH,
      status: false,
    })
}

export const getServerSidePaginationSearchCouponAction = name => {
  var url = process.env.REACT_APP_LOCALHOST + `/Coupon/Search?name=${name}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_COUPON_SEARCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_COUPON_SEARCH,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationSearchCouponFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_COUPON_SEARCH_FRESH,
      status: false,
      payload: null,
    })
}

export const getCouponByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + `/Coupon/GetById?id=${id}`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_COUPON_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_COUPON_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getCouponByIdActionFresh = () => {
  console.log("=========hererererer=======")
  return dispatch =>
    dispatch({
      type: GET_COUPON_BY_ID_FRESH,
      status: false,
    })
}

export const getValidCouponForCart = cart_data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Coupon/Get`
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_VALID_COUPONS_FOR_CART,
          payload: response.data,
          // payload: sampleData,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_VALID_COUPONS_FOR_CART,
          status: "Failed",
        })
      })
  }
}

export const getValidCouponForCartFresh = () => {
  return dispatch => {
    dispatch({
      type: GET_VALID_COUPONS_FOR_CART_FRESH,
      payload: null,
      status: "Success",
    })
  }
}
