import {
  ADD_RESTAURANT,
  GET_ALL_RESTAURANT,
  RESTAURANT_NAME_UPDATE,
  RESTAURANT_STATUS_UPDATE,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_FRESH,
  GET_ALL_CUSINE,
  ADD_BRANCH,
  GET_ALL_BRANCH,
  EDIT_BRANCH_STATUS,
  EDIT_BRANCH_STATUS_FRESH,
  EDIT_BRANCH_POPULAR,
  EDIT_BRANCH_POPULAR_FRESH,
  DELETE_BRANCH,
  DELETE_BRANCH_FRESH,
  ADD_ZONE,
  GET_ALL_ZONE,
  EDIT_ZONE,
  ADD_ZONE_FRESH,
  DELETE_ZONE,
  DELETE_ZONE_FRESH,
  EDIT_ZONE_STATUS,
  EDIT_ZONE_STATUS_FRESH,
  EDIT_ZONE_FRESH,
  ADD_ONS_CATEGORY,
  ADD_CUISINE,
  GET_CUISINE,
  EDIT_CUISINE,
  EDIT_CUISINE_STATUS,
  DELETE_CUISINE,
  DELETE_CUISINE_FRESH,
  GET_ADD_ONS_CATEGORY,
  DELETE_ADD_ON_CATEGORY,
  DELETE_ADD_ON_CATEGORY_FRESH,
  ADD_ONS_CATEGORY_FRESH,
  ADD_RESTAURANT_MENU,
  GET_RESTAURANT_MENU,
  ADD_RESTAURANT_MENU_FRESH,
  EDIT_ADD_ONS_CATEGORY,
  EDIT_ADD_ONS_CATEGORY_FRESH,
  EDIT_ADD_ON_CATEGORY_STATUS,
  EDIT_ADD_ON_CATEGORY_STATUS_FRESH,
  ADD_MENU_TIME_SLOT,
  GET_ALL_MENU_TIME_SLOT,
  ADD_MENU_TIME_SLOT_FRESH,
  EDIT_MENU_TIME_SLOT,
  EDIT_MENU_TIME_SLOT_FRESH,
  EDIT_MENU_TIME_SLOT_STATUS,
  EDIT_MENU_TIME_SLOT_STATUS_FRESH,
  DELETE_MENU_TIME_SLOT,
  DELETE_MENU_TIME_SLOT_FRESH,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_BY_ID_FRESH,
  ADD_BRANCH_FRESH,
  EDIT_BRANCH_FRESH,
} from "./actionTypes"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { convertToFormData } from "helpers/functions"

// token
// var authUser = JSON.parse(localStorage.getItem("user"));
// console.log(authUser.token);

export const restaurantAddAction = (name, id) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Post"

  let formData = {
    _id: id,
    name: name,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_RESTAURANT",
          payload: response.data,
          status: "Success",
        })
        toast.success("Restaurant Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_RESTAURANT",
          payload: error,
          status: "Failed",
        })
        toast.error("Restaurant Add Failed")
      })
  }
}
export const getAllRestaurantAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_RESTAURANT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_RESTAURANT,
          status: "Failed",
        })
      })
  }
}

export const restaurantNameUpdateAction = (name, id, is_active) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Put"
  const formData = {
    _id: id,
    name: name,
    is_active: is_active,
  }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: RESTAURANT_NAME_UPDATE,
          status: "Success",
        })
        toast.success("Updated Successfully")
      })
      .catch(error => {
        dispatch({
          type: RESTAURANT_NAME_UPDATE,
          status: "Failed",
        })
        toast.error("Something went wrong!!")
      })
  }
}

export const restaurantStatusUpdateAction = (name, id, is_active) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Put"
  const formData = {
    _id: id,
    name: name,
    is_active: !is_active,
  }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: RESTAURANT_STATUS_UPDATE,
          status: "Success",
        })
        toast.success("Status Updated Successfully")
      })
      .catch(error => {
        dispatch({
          type: RESTAURANT_STATUS_UPDATE,
          status: "Failed",
        })
        toast.error("Something went wrong!!")
      })
  }
}

export const restaurantDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_RESTAURANT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_RESTAURANT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const restaurantDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_RESTAURANT_FRESH,
      status: false,
    })
}

export const getAllCusineAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_CUSINE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_CUSINE,
          status: "Failed",
        })
      })
  }
}

export const branchAddAction = (
  id,
  zoneInfo,
  lat,
  lng,
  file,
  coverFile,
  currentPath,
  selectedCuisine,
  time
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Post"

  const data =
    selectedCuisine?.length > 0
      ? selectedCuisine.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          cuisine_id: item.value,
          branch_id: id,
        }
      })
      : null

  console.log(data)
  const all_working_hours =
    time?.length > 0
      ? time.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          day: Number(item.day),
          open_hour: moment(item.startTime, "HH:mm").get("hours"),
          open_min: moment(item.startTime, "HH:mm").get("minutes"),
          close_hour: moment(item.endTime, "HH:mm").get("hours"),
          close_minute: moment(item.endTime, "HH:mm").get("minutes"),
          branch_id: id,
        }
      })
      : null

  const dataObject = {
    name: zoneInfo.name,
    _id: id,
    email: zoneInfo.email,
    // location: {
    //   coordinates: [Number(lat), Number(lng)],
    //   type: "Point",
    // },
    address: zoneInfo.address,
    popularity_sort_value: JSON.parse(zoneInfo.popularity_sort_value),
    price_range: zoneInfo.price_range,
    image: file,
    cover_image: coverFile,
    slug: currentPath,
    zonal_admin: zoneInfo.zonal_admin,
    is_take_pre_order: JSON.parse(zoneInfo.is_take_pre_order),
    phone_number: zoneInfo.phone_number,
    is_veg: JSON.parse(zoneInfo.is_veg),
    is_popular: JSON.parse(zoneInfo.is_popular),
    commission: JSON.parse(zoneInfo.commission),
    min_order_value: 1,
    delivery_time: JSON.parse(zoneInfo.delivery_time),
    parent_restaurant_id: zoneInfo.restaurant,
    working_hours: all_working_hours,
    cuisines: data,
    share_link: zoneInfo.link,
    pickup_time: JSON.parse(zoneInfo.pickup_time),
    is_delivery: JSON.parse(zoneInfo.is_delivery),
    is_pickup: JSON.parse(zoneInfo.is_pickup),
    is_dine: JSON.parse(zoneInfo.is_dine),
    delivery_charge: 100,
  };

  console.log(dataObject)
  const formData = convertToFormData(dataObject)

  formData.append("location[coordinates][0]", Number(lng));
  formData.append("location[coordinates][1]", Number(lat));
  formData.append("location[type]", "Point");

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        // dispatch({
        //   type: "ADD_BRANCH",
        //   payload: response.data,
        //   status: "Success",
        // })
        toast.success("Branch Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_BRANCH",
          payload: error,
          status: "Failed",
        })
        toast.error("Branch Add Failed")
      })
  }
}

export const branchEditAction = (
  id,
  zoneInfo,
  lat,
  lng,
  file,
  coverFile,
  currentPath,
  selectedCuisine,
  time
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put"
  console.log(id)
  console.log(zoneInfo)
  console.log(location)
  console.log(file)
  console.log(coverFile)
  console.log(time)
  console.log(selectedCuisine)

  //const newLoc = location.replace(/['"]/g,)

  const data =
    selectedCuisine?.length > 0
      ? selectedCuisine.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          cuisine_id: item.value,
          branch_id: id,
        }
      })
      : null

  console.log(data)
  const all_working_hours =
    time?.length > 0
      ? time.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          day: Number(item.day),
          open_hour: moment(item.startTime, "HH:mm").get("hours"),
          open_min: moment(item.startTime, "HH:mm").get("minutes"),
          close_hour: moment(item.endTime, "HH:mm").get("hours"),
          close_minute: moment(item.endTime, "HH:mm").get("minutes"),
          branch_id: id,
        }
      })
      : null
  const dataObject = {
    name: zoneInfo.name,
    _id: id,
    email: zoneInfo.email,
    // location: {
    //   coordinates: [Number(lat), Number(lng)],
    //   type: "Point",
    // },
    address: zoneInfo.address,
    popularity_sort_value: JSON.parse(zoneInfo.popularity_sort_value),
    price_range: zoneInfo.price_range,
    image: file,
    cover_image: coverFile,
    slug: currentPath,
    zonal_admin: zoneInfo.zonal_admin,
    is_take_pre_order: JSON.parse(zoneInfo.is_take_pre_order),
    phone_number: zoneInfo.phone_number,
    is_veg: JSON.parse(zoneInfo.is_veg),
    is_popular: JSON.parse(zoneInfo.is_popular),
    commission: JSON.parse(zoneInfo.commission),
    min_order_value: 1,
    delivery_time: JSON.parse(zoneInfo.delivery_time),
    parent_restaurant_id: zoneInfo.restaurant,
    working_hours: all_working_hours,
    cuisines: data,
    delivery_charge: 100
  }

  const formData = convertToFormData(dataObject)


  formData.append("location[coordinates][0]", Number(lng));
  formData.append("location[coordinates][1]", Number(lat));
  formData.append("location[type]", "Point");
  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_BRANCH",
          payload: response.data,
          status: "Success",
        })
        toast.success("Branch Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: "EDIT_BRANCH",
          payload: error,
          status: "Failed",
        })
        toast.error("Branch Edit Failed")
      })
  }
}

export const branchStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put"

  const dataObject = data;
  const formData = convertToFormData(dataObject);

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_BRANCH_STATUS,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: EDIT_BRANCH_STATUS,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const branchPopularEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put"

  const dataObject = data
  // console.log(dataObject);
  const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_BRANCH_POPULAR,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: EDIT_BRANCH_POPULAR,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const getAllBranchAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_BRANCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_BRANCH,
          status: "Failed",
        })
      })
  }
}

export const branchDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Branch/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_BRANCH,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_BRANCH,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const branchDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_BRANCH_FRESH,
      status: false,
    })
}

export const zoneAddAction = (
  id,
  zoneInfo,
  path,
  deliveryCharge,
  selectedBranch
) => {


  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Post"

  const data =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          branch_id: item.value,
          zone_id: id,
        }
      })
      : null

  const delivery_charges =
    deliveryCharge?.length > 0
      ? deliveryCharge.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          distance_start_in_kilometer: Number(item.distanceStart),
          distance_end_in_kilometer: Number(item.distanceEnd),
          delivery_charge: Number(item.deliveryCharge),
          zone_id: id,
        }
      })
      : null

  const allData = path.map(item => [Number(item.lng), Number(item.lat)])
  console.log(allData)
  let formData = {
    _id: id,
    name: zoneInfo.area,
    radius: Number(zoneInfo.radius),
    lat_long: {
      coordinates: [allData],
      type: "Polygon",
    },
    city_id: zoneInfo.city,
    branches: data,
    zone_delivery_charges: delivery_charges,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_ZONE",
          payload: response.data,
          status: "Success",
        })
        toast.success("Zone Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_ZONE",
          payload: error,
          status: "Failed",
        })
        toast.error("Zone Add Failed")
      })
  }
}

export const zoneAddFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_ZONE_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const getAllZoneAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_ZONE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_ZONE,
          status: "Failed",
        })
      })
  }
}

export const zoneEditAction = (
  id,
  zoneInfo,
  path,
  deliveryCharge,
  selectedBranch
) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put"

  console.log(zoneInfo)
  console.log(path)
  console.log(deliveryCharge)
  console.log(selectedBranch)

  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put"

  const data =
    selectedBranch?.length > 0
      ? selectedBranch.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          branch_id: item.value,
          zone_id: id,
        }
      })
      : null

  const delivery_charges =
    deliveryCharge?.length > 0
      ? deliveryCharge.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          distance_start_in_kilometer: Number(item.distanceStart),
          distance_end_in_kilometer: Number(item.distanceEnd),
          delivery_charge: Number(item.deliveryCharge),
          zone_id: id,
        }
      })
      : null

  const allData = path.map(item => [Number(item.lat), Number(item.lng)])
  console.log(allData)
  let formData = {
    _id: id,
    name: zoneInfo.area,
    radius: Number(zoneInfo.radius),
    is_active: zoneInfo.is_active,
    lat_long: {
      coordinates: [allData],
      type: "Polygon",
    },
    city_id: zoneInfo.city,
    branches: data,
    zone_delivery_charges: delivery_charges,
  }
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_ZONE,
          status: "Success",
        })
        toast.success("Updated Successfully")
      })
      .catch(error => {
        dispatch({
          type: EDIT_ZONE,
          status: "Failed",
        })
        toast.error("Something went wrong!!")
      })
  }
}

export const zoneEditFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_ZONE_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const zoneStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put"

  const formData = data
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_ZONE_STATUS,
          status: "Success",
        })
        // toast.success("Updated Successfully");
      })
      .catch(error => {
        dispatch({
          type: EDIT_ZONE_STATUS,
          status: "Failed",
        })
        // toast.error("Something went wrong!!");
      })
  }
}

export const zoneStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_ZONE_STATUS_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const zoneDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Zone/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_ZONE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_ZONE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const zoneDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_ZONE_FRESH,
      status: false,
    })
}

export const addBranchFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_BRANCH_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const editBranchFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_BRANCH_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const editBranchStatusFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_BRANCH_STATUS_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const editBranchPopularFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_BRANCH_POPULAR_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const addBranchFreshNew = () => {
  console.log("I am in add branch fresh===============")
  return dispatch => {
    dispatch({
      type: "ADD_BRANCH_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const addOnsCategoryAction = (val, category, isChecked, addOns) => {
  console.log(val, category, isChecked, addOns)
  console.log(parseInt(category.num_of_choice))

  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Post"

  const data =
    addOns?.length > 0
      ? addOns.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          add_on_name: item.add_on_name,
          add_on_price: item.add_on_price,
          add_on_category_name: category.name,
          add_on_category_id: val,
        }
      })
      : null
  const val_id = uuidv4()
  console.log(data)

  let formData = {
    _id: val,
    name: category.name,
    cat_is_multiple: isChecked,
    cat_max_choice: parseInt(category.num_of_choice),
    language_slug: "en",
    add_on_category_desc: category.add_on_category_desc,
    variation_id: val_id,
    is_active: true,
    preset_add_ons: data,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_ONS_CATEGORY",
          payload: response.data,
          status: "Success",
        })
        toast.success("Addon Category Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_ONS_CATEGORY",
          error: error,
          status: "Failed",
        })
        toast.error("Addon Category Add Failed")
      })
  }
}

export const editAddOnsCategoryAction = (val, category, isChecked, addOns) => {
  console.log(val, category, isChecked, addOns)
  console.log(parseInt(category.num_of_choice))

  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Put"

  const data =
    addOns?.length > 0
      ? addOns.map(item => {
        const val = uuidv4()
        return {
          _id: val,
          add_on_name: item.add_on_name,
          add_on_price: item.add_on_price,
          add_on_category_name: category.name,
          add_on_category_id: val,
        }
      })
      : null
  const val_id = uuidv4()
  console.log(data)

  let formData = {
    _id: val,
    name: category.name,
    cat_is_multiple: isChecked,
    cat_max_choice: parseInt(category.num_of_choice),
    language_slug: "en",
    add_on_category_desc: category.add_on_category_desc,
    variation_id: val_id,
    //is_active: true
    preset_add_ons: data,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_ADD_ONS_CATEGORY",
          payload: response.data,
          status: "Success",
        })
        toast.success("Addon Category Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: "EDIT_ADD_ONS_CATEGORY",
          error: error,
          status: "Failed",
        })
        toast.error("Addon Category Edit Failed")
      })
  }
}

export const addOnCategoryStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Put"

  const formData = data
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_ADD_ON_CATEGORY_STATUS,
          status: "Success",
        })
        // toast.success("Updated Successfully");
      })
      .catch(error => {
        dispatch({
          type: EDIT_ADD_ON_CATEGORY_STATUS,
          status: "Failed",
        })
        // toast.error("Something went wrong!!");
      })
  }
}

export const addOnCategoryStatusEditActionFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_ADD_ON_CATEGORY_STATUS_FRESH,
      payload: null,
      status: false,
    })
  }
}

export const addCuisineAction = (id, name, file, color) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Post"
  console.log(file);

  let dataObject = {
    _id: id,
    name: name,
    image: file,
    "color.fg": color.fg,
    "color.bg": color.bg,
  }

  const formData = convertToFormData(dataObject)

  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_CUISINE",
          payload: response.data,
          status: "Success",
        })
        toast.success("Cuisine Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_CUISINE",
          error: error,
          status: "Failed",
        })
        toast.error("Cuisine Add Failed")
      })
  }
}

export const getAllCuisneAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_CUISINE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_CUISINE,
          status: "Failed",
          error: error,
        })
      })
  }
}

export const cuisineEditAction = (id, editName, status, file, color) => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Put"
  // const formData = {
  //   _id: id,
  //   name: editName,
  //   is_active: status,
  //   imane: "https://unsplash.com/photos/kcA-c3f_3FE",
  // }


  let dataObject = {
    _id: id,
    name: editName,
    is_active: status,
    image: file,
    "color.fg": color.fg,
    "color.bg": color.bg,
  };

  console.log(dataObject)

  const formData = convertToFormData(dataObject)
  // console.log(formData);
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
          type: EDIT_CUISINE,
          status: "Success",
        })
        toast.success("Edit Cuisine Successfully")
      })
      .catch(error => {
        dispatch({
          type: EDIT_CUISINE,
          status: "Failed",
        })
        toast.error("Edit Cuisine Fialed !!")
      })
  }
}

export const cuisineStatusEditAction = data => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Put"
  // console.log(data);
  let dataObject = {
    _id: data._id,
    name: data.name,
    is_active: data.is_active,
    image: data.image,
    "color.fg": data.color.fg,
    "color.bg": data.color.bg,
  };
  // console.log(dataObject);
  const formData = convertToFormData(dataObject)
  //console.log(formData);
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
          type: EDIT_CUISINE_STATUS,
          status: "Success",
        })
        toast.success("Cuisine Status Updated Successfully")
      })
      .catch(error => {
        dispatch({
          type: EDIT_CUISINE_STATUS,
          status: "Failed",
        })
        toast.error("Cuisine Status Updated Failed")
      })
  }
}

export const cuisineDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_CUISINE,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_CUISINE,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const cuisineDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_CUISINE_FRESH,
      status: false,
    })
}

export const addOnCategoryDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_ADD_ON_CATEGORY,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_ADD_ON_CATEGORY,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const addOnCategoryDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_ADD_ON_CATEGORY_FRESH,
      status: false,
    })
}

export const getAllAddOnsCategoryAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ADD_ONS_CATEGORY,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ADD_ONS_CATEGORY,
          status: "Failed",
        })
      })
  }
}

export const addOnCategoryAddFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_ONS_CATEGORY_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const addRestaurantMenuAction = (val, info, isChecked) => {
  console.log(val, info, isChecked)

  var url = process.env.REACT_APP_LOCALHOST + "/MenuItem/Post"

  // const data = selectedCuisine?.length > 0 ? selectedCuisine.map(item => {
  //     const val = uuidv4();
  //     return {
  //         _id: val,
  //         cuisine_id: item.value,
  //         branch_id: id
  //     }
  // }) : null

  // console.log(data);
  // const all_working_hours = time?.length > 0 ? time.map(item => {
  //     const val = uuidv4();
  //     return {
  //         _id: val,
  //         day: Number(item.day),
  //         open_hour: moment(item.startTime, "HH:mm").get('hours'),
  //         open_min: moment(item.startTime, "HH:mm").get('minutes'),
  //         close_hour: moment(item.endTime, "HH:mm").get('hours'),
  //         close_minute: moment(item.endTime, "HH:mm").get('minutes'),
  //         branch_id: id,

  //     }
  // }) : null
  let formData = {
    _id: val,
    menu_name: info.name,
    menu_price: Number(info.menu_price),
    pickup_menu_price: Number(info.pickup_menu_price),
    menu_group_id: info.restaurant,
    variation_group_name: info.Variation_group_name,
    variation_group_desc: info.Variation_grp_desc,
    check_add_ons: isChecked === true ? 1 : 0,
    is_popular: JSON.parse(info.is_popular),
    description: info.menu_description,
    vat: Number(info.vat),
    sd: Number(info.sd),
    restaurant_id: info.restaurant,
    restaurant_name: "test",
    category_id: info.category,
    category_name: info.category,
    is_delivery: JSON.parse(info.is_delivery),
    is_pickup: JSON.parse(info.is_pickup),
    is_dine: JSON.parse(info.is_dine),
    variations: [],
    menu_available_times: [],
    image: "https://unsplash.com/photos/eYnK2UmLlZ0",
    slug: "test",
    is_active: true,
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_RESTAURANT_MENU",
          payload: response.data,
          status: "Success",
        })
        toast.success("Menu Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_RESTAURANT_MENU",
          payload: error,
          status: "Failed",
        })
        toast.error("Menu Add Failed")
      })
  }
}

export const getAllRestaurantMenuItemAction = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItem/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_RESTAURANT_MENU,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_RESTAURANT_MENU,
          status: "Failed",
        })
      })
  }
}

export const addRestaurantMenuAddFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_RESTAURANT_MENU_FRESH",
      payload: null,
      status: false,
    })
  }
}

export const editAddOnCategoryFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_ADD_ONS_CATEGORY_FRESH",
      //payload: null,
      status: false,
    })
  }
}

export const addMenuTimeSlotAction = (val, timeSlot) => {
  console.log(val, timeSlot)
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItemTimeSlot/Post"

  let formData = {
    _id: val,
    name: timeSlot.name,
    branch_id: timeSlot.branch,
    start_time: {
      hour: moment(timeSlot.start_time, "HH:mm").get("hours"),
      minute: moment(timeSlot.start_time, "HH:mm").get("minutes"),
    },

    end_time: {
      hour: moment(timeSlot.end_time, "HH:mm").get("hours"),
      minute: moment(timeSlot.end_time, "HH:mm").get("minutes"),
    },
  }

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "ADD_MENU_TIME_SLOT",
          payload: response.data,
          status: "Success",
        })
        toast.success("Timeslot Addedd Successfully")
      })
      .catch(error => {
        dispatch({
          type: "ADD_MENU_TIME_SLOT",
          payload: error,
          status: "Failed",
        })
        toast.error("Timeslot Add Failed")
      })
  }
}

export const getAllMenuTimeSlot = () => {
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItemTimeSlot/Get"
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_ALL_MENU_TIME_SLOT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_MENU_TIME_SLOT,
          status: "Failed",
        })
      })
  }
}

export const addMenuTimeSlotFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_MENU_TIME_SLOT_FRESH",
      //payload: null,
      status: false,
    })
  }
}

export const editMenuTimeSlotAction = (val, timeSlot) => {
  // console.log(val, timeSlot)
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItemTimeSlot/Put"

  let formData = {
    _id: val,
    name: timeSlot.name,
    branch_id: timeSlot.branch,
    start_time: {
      hour: moment(timeSlot.start_time, "HH:mm").get("hours"),
      minute: moment(timeSlot.start_time, "HH:mm").get("minutes"),
    },

    end_time: {
      hour: moment(timeSlot.end_time, "HH:mm").get("hours"),
      minute: moment(timeSlot.end_time, "HH:mm").get("minutes"),
    },
  }

  // console.log(formData)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_MENU_TIME_SLOT",
          payload: response.data,
          status: "Success",
        })
        toast.success("Timeslot Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: "EDIT_MENU_TIME_SLOT",
          payload: error,
          status: "Failed",
        })
        toast.error("Timeslot Edit Failed")
      })
  }
}

export const editMenuTimeSlotFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_MENU_TIME_SLOT_FRESH",
      //payload: null,
      status: false,
    })
  }
}

export const editMenuTimeSlotStatusAction = (timeSlot) => {
  // console.log(val, timeSlot)
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItemTimeSlot/Put"

  let formData = timeSlot

  // console.log(formData)

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_MENU_TIME_SLOT_STATUS,
          payload: response.data,
          status: "Success",
        })
        // toast.success("Timeslot Edited Successfully")
      })
      .catch(error => {
        dispatch({
          type: "EDIT_MENU_TIME_SLOT",
          payload: error,
          status: "Failed",
        })
        // toast.error("Timeslot Edit Failed")
      })
  }
}

export const editMenuTimeSlotStatusFresh = () => {
  return dispatch => {
    dispatch({
      type: EDIT_MENU_TIME_SLOT_STATUS_FRESH,
      //payload: null,
      status: false,
    })
  }
}

export const menuTimeSlotDeleteAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/MenuItemTimeSlot/Delete"
  // console.log(id);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

    axios
      .delete(url, { params: { id: id } }, { headers: headers })
      .then(response => {
        dispatch({
          type: DELETE_MENU_TIME_SLOT,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_MENU_TIME_SLOT,
          payload: error,
          status: "Failed",
        })
      })
  }
}

export const menuTimeSlotDeleteFresh = () => {
  return dispatch =>
    dispatch({
      type: DELETE_MENU_TIME_SLOT_FRESH,
      status: false,
    })
}

export const getCategoryByIdAction = id => {
  var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/GetById?id=" + id
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_CATEGORY_BY_ID,
          payload: response.data,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_CATEGORY_BY_ID,
          status: "Failed",
        })
      })
  }
}

export const getCategoryByIdFresh = () => {
  console.log("=======In the fresh ---------")
  return dispatch => {
    dispatch({
      type: "GET_CATEGORY_BY_ID_FRESH",
      status: false,
      payload: null,
    })
  }
}
