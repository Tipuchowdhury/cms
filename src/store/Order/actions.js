import {
  ADD_ORDER,
  ADD_ORDER_FRESH,
  GET_ALL_ORDER,
  GET_ALL_ORDER_FRESH,
  ORDER_EDIT,
  ORDER_EDIT_FRESH,
  ORDER_DELETE,
  ORDER_DELETE_FRESH,
  ORDER_STATUS_EDIT,
  ORDER_STATUS_EDIT_FRESH,
  GET_AVAILABLE_RIDER,
  ASSIGN_RIDER,
  ASSIGN_RIDER_FRESH,
  SERVER_SIDE_PAGINATION_ORDER,
  SERVER_SIDE_PAGINATION_ORDER_FRESH,
  GET_ORDER_INVOICE,
  GET_ORDER_INVOICE_FRESH,
  GET_RIDER_INVOICE,
  GET_RIDER_INVOICE_FRESH,
  GET_CHECK_CART,
  GET_CHECK_CART_FRESH,
  TRACK_RIDER,
  TRACK_RIDER_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData, convertToQueryParams } from "helpers/functions"

// token
var token = JSON.parse(localStorage.getItem("jwt"))
//console.log(token.jwt);

export const getAllOrderAction = (page, countPerPage) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/Search?page=${page}&limit=${countPerPage}`
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
          type: GET_ALL_ORDER,
          payload: response.data,
          // payload: sampleData,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_ORDER,
          status: "Failed",
        })
      })
  }
}

export const getAllOrderFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_ALL_ORDER_FRESH",
      payload: null,
      status: "Success",
    })
  }
}

export const orderEditAction = (id, data, selectedBranch) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Put"
  const selectedBranchData =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
          const val = uuidv4()
          return {
            _id: val,
            res_id: item.value,
            order_id: id,
          }
        })
      : null

  const dataObject = {
    _id: id,
    ...data,
    restaurants: selectedBranchData,
  }
  //  console.log(dataObject)
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
          type: ORDER_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ORDER_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderEditFresh = () => {
  return dispatch => {
    dispatch({
      type: ORDER_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const orderStatusEditAction = data => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/ChangeOrderStatus?order_id=${data._id}&order_status=${data.status}`
  let formData = { order_id: data._id, order_status: data.status }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, { headers: headers })
      .then(response => {
        dispatch({
          type: ORDER_STATUS_EDIT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ORDER_STATUS_EDIT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderStatusEditFresh = () => {
  return dispatch => {
    dispatch({
      type: ORDER_STATUS_EDIT_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const orderDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Delete"
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
          type: "ORDER_DELETE",
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: "ORDER_DELETE",
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const orderDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: ORDER_DELETE_FRESH,
      status: false,
    })
}

export const getAvailableRider = order_id => {
  console.log("order_id :", order_id)
  var url =
    process.env.REACT_APP_LOCALHOST +
    "/Order/GetCustomBranchRidersWithLocationByOrderId"
  const params = { order_id: order_id }
  // const mockdata = {
  //   branch: {
  //     _id: "241dc76a-9320-4b47-b7af-aacb9aaea235",
  //     name: "Kutumbari",
  //     address: "GEC Circle",
  //     mobile_number: "01833623472",
  //     location: { lat: 23.8655, lng: 90.435 },
  //   },
  //   customer: {
  //     _id: "241dc76a-9320-4b47-b7af-aacb9aae1135",
  //     first_name: "Jhon",
  //     last_name: "Doe",
  //     address: "Mehedibag",
  //     mobile_number: "01872721234",
  //     location: { lat: 23.8155, lng: 90.435 },
  //     distance_in_meter: {
  //       from_branch: 3321,
  //     },
  //   },
  //   riders: [
  //     {
  //       _id: "241dc76a-9320-4b47-b7af-aacb9aae1146",
  //       first_name: "Sultan",
  //       last_name: "Mirza",
  //       mobile_number: "01533819558",
  //       location: { lat: 23.8153, lng: 90.4165 },
  //       current_order: 2,
  //       distance_in_meter: {
  //         from_branch: 1223,
  //       },
  //     },
  //     {
  //       _id: "241dc76a-9320-4b47-b7af-aacb9aae2246",
  //       first_name: "Hasan",
  //       last_name: "Raza",
  //       mobile_number: "019284923993",
  //       location: { lat: 23.9455, lng: 90.544 },
  //       current_order: 1,
  //       distance_in_meter: {
  //         from_branch: 765,
  //       },
  //     },
  //   ],
  // }
  // return dispatch => {
  //   dispatch({
  //     type: GET_AVAILABLE_RIDER,
  //     payload: mockdata,
  //     status: "Success",
  //   })
  // }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_AVAILABLE_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_AVAILABLE_RIDER,
          status: "Failed",
        })
      })
  }
}

export const orderAssignRider = (order_id, rider_id) => {
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/AssaignRider?order_id=${order_id}&rider_id=${rider_id}`

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, { headers: headers })
      .then(response => {
        dispatch({
          type: ASSIGN_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: ASSIGN_RIDER,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const assignRiderFresh = () => {
  return dispatch => {
    dispatch({
      type: ASSIGN_RIDER_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const getServerSidePaginationOrderAction = (index, limit, filters) => {
  console.log("filters :", filters)
  filters = convertToQueryParams(filters)
  console.log("filters :", filters)

  var url =
    process.env.REACT_APP_LOCALHOST +
    `/Order/Search?page=${index}&limit=${limit}${filters ? "&" + filters : ""}`
  //var url = process.env.REACT_APP_LOCALHOST + `/City/Search?page=${index}&limit=4`;
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
          type: SERVER_SIDE_PAGINATION_ORDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: SERVER_SIDE_PAGINATION_ORDER,
          status: "Failed",
        })
      })
  }
}

export const getServerSidePaginationOrderFresh = () => {
  return dispatch =>
    dispatch({
      type: SERVER_SIDE_PAGINATION_ORDER_FRESH,
      status: false,
      payload: null,
    })
}

export const getOrderInvoice = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/Invoice"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_ORDER_INVOICE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INVOICE,
          status: "Failed",
        })
      })
  }
}

export const getOrderInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_ORDER_INVOICE_FRESH,
      status: false,
      payload: null,
    })
}

export const getRiderInvoice = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/RiderInvoice"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_RIDER_INVOICE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_RIDER_INVOICE,
          status: "Failed",
        })
      })
  }
}

export const getRiderInvoiceFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_RIDER_INVOICE_FRESH,
      status: false,
      payload: null,
    })
}

// check Cart
export const getCheckCart = (branch_id, zone_id, coupon_name, menu_data) => {
  const mockData = {
    status: 0,
    data: {
      restaurant_id: "1b9870f9-9b4a-4db3-a3de-392e2204a9b4",
      long: 91.8244893,
      lat: 22.3538999,
      coupon_name: "",
      menu_data: [
        {
          _id: "dc78f41b-430e-4d49-a6b5-541894bb8b53",
          menu_item_id: "dc78f41b-430e-4d49-a6b5-541894bb8b53",
          order_id: "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
          category_id: "169f9b85-a708-4a73-8000-56a64fd8f836",
          restaurant_id: "1b9870f9-9b4a-4db3-a3de-392e2204a9b4",
          menu_name: "Ultimate Cheese Maxx",
          menu_price: 899,
          recipe_time: 30,
          image:
            "https://imagesandfilesbucket.theecotek.com/Classic Cheese Maxx.jpeg",
          quantity: 1,
          variations: [],
          is_active: true,
          is_available: true,
          item_total: 899,
          item_sd: 44.95,
          item_vat: 44.95,
        },
        {
          _id: "13310133-708d-4b5d-81ab-afbcfe98469b",
          menu_item_id: "13310133-708d-4b5d-81ab-afbcfe98469b",
          order_id: "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
          category_id: "169f9b85-a708-4a73-8000-56a64fd8f836",
          restaurant_id: "1b9870f9-9b4a-4db3-a3de-392e2204a9b4",
          menu_name: "Deep Sea Fantasy Pizza",
          menu_price: 295,
          recipe_time: 35,
          image:
            "https://imagesandfilesbucket.theecotek.com/deep sea fantasi pizza.jpg",
          quantity: 1,
          variations: [
            {
              variation_name: "Medium",
              variation_price: 415,
              is_active: true,
              add_on_category: [
                {
                  _id: "e0f2a11b-ce95-4ca7-8859-45c9768adf89",
                  add_on_category_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
                  name: 'Add Ons for 9" Pizza',
                  is_active: true,
                  add_on_list: [
                    {
                      _id: "40b21843-29d4-419e-949a-ed937ae8d720",
                      addoncat_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
                      add_ons_name: "More Naga",
                      add_ons_price: 69,
                      variation_and_add_on_category_id:
                        "e0f2a11b-ce95-4ca7-8859-45c9768adf89",
                      is_active: true,
                      add_on_id: "40b21843-29d4-419e-949a-ed937ae8d720",
                      order_add_on_category_details_id:
                        "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
                    },
                  ],
                  order_variation_details_id:
                    "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
                },
                {
                  _id: "55267d67-2999-4ab1-8c7d-78c54ee8e709",
                  add_on_category_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  name: "Choice of Crust",
                  is_active: true,
                  add_on_list: [
                    {
                      _id: "42c04906-a9c0-4fd5-a2fd-a7ef2d4477b1",
                      addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                      add_ons_name: "Thin",
                      add_ons_price: 1,
                      variation_and_add_on_category_id:
                        "55267d67-2999-4ab1-8c7d-78c54ee8e709",
                      is_active: true,
                      add_on_id: "42c04906-a9c0-4fd5-a2fd-a7ef2d4477b1",
                      order_add_on_category_details_id:
                        "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
                    },
                  ],
                  order_variation_details_id:
                    "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
                },
              ],
              _id: "92e65c87-5e6c-4ff1-b872-e8b56ea43a8f",
              variation_id: "92e65c87-5e6c-4ff1-b872-e8b56ea43a8f",
              order_menu_item_details_id:
                "df22a969-b4f3-4b01-abbc-1af69b5e4d01",
            },
          ],
          is_active: true,
          is_available: true,
          item_total: 485,
          item_sd: 24.25,
          item_vat: 24.25,
        },
      ],
      id: "9bc683e0-498f-4c17-8f0a-6f9ecba95217",
      auto_applied_coupon: "",
      auto_applied_coupon_name: "BK120",
      delivery_time: 45,
      rest_lat: 22.351168685634793,
      rest_long: 91.79265747070315,
      discount_type: "",
      total: "1582.40",
      price: [
        {
          name: "subtotal",
          display: "Subtotal",
          value: "1384.00",
        },
        {
          name: "total_vat",
          display: "VAT (inc.)",
          value: "69.20",
        },
        {
          name: "total_sd",
          display: "SD (inc.)",
          value: "69.20",
        },
        {
          name: "total_discount",
          display: "Discount",
          value: "0.00",
        },
        {
          name: "delivery_charge",
          display: "Delivery Charge",
          value: "60.00",
        },
        {
          name: "total",
          display: "Total",
          value: "1582.40",
        },
      ],
    },
  }
  return dispatch => {
    dispatch({
      type: GET_CHECK_CART,
      payload: mockData.data,
      status: "Success",
    })
  }
  var url = process.env.REACT_APP_LOCALHOST + "/Order/RiderInvoice"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: GET_CHECK_CART,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_CHECK_CART,
          status: "Failed",
        })
      })
  }
}

export const getCheckCartFresh = () => {
  return dispatch =>
    dispatch({
      type: GET_CHECK_CART_FRESH,
      status: false,
      payload: null,
    })
}

export const trackRider = order_id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Order/GetOrderTrackByOrderId"
  const params = { order_id: order_id }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers, params: params })
      .then(response => {
        dispatch({
          type: TRACK_RIDER,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: TRACK_RIDER,
          status: "Failed",
        })
      })
  }
}

export const trackRiderFresh = () => {
  return dispatch =>
    dispatch({
      type: TRACK_RIDER_FRESH,
      status: false,
      payload: null,
    })
}
