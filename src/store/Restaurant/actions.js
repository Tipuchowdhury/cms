import {
    ADD_RESTAURANT,
    GET_ALL_RESTAURANT,
    RESTAURANT_NAME_UPDATE,
    RESTAURANT_STATUS_UPDATE,
    GET_ALL_CUSINE,
    ADD_BRANCH,
    GET_ALL_BRANCH,
    EDIT_BRANCH_STATUS,
    EDIT_BRANCH_STATUS_FRESH,
    EDIT_BRANCH_POPULAR,
    EDIT_BRANCH_POPULAR_FRESH,
    ADD_ZONE,
    GET_ALL_ZONE,
    EDIT_ZONE,
    ADD_ZONE_FRESH,
    EDIT_ZONE_STATUS,
    EDIT_ZONE_STATUS_FRESH,
    EDIT_ZONE_FRESH,
    ADD_ONS_CATEGORY,
    ADD_CUISINE,
    GET_CUISINE,
    EDIT_CUISINE

} from "./actionTypes"
import axios from "axios";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";


// token
// var authUser = JSON.parse(localStorage.getItem("user"));
// console.log(authUser.token);

export const restaurantAddAction = (name, id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Post";

    let formData = {
        _id: id,
        name: name

    };

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_RESTAURANT",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Restaurant Addedd Successfully");
            })
            .catch(error => {
                dispatch({
                    type: "ADD_RESTAURANT",
                    payload: error,
                    status: "Failed",
                });
                toast.error("Restaurant Add Failed");
            });

    };

};
export const getAllRestaurantAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Get";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_ALL_RESTAURANT,
                    payload: response.data,
                    status: "Success",
                });

            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_RESTAURANT,
                    status: "Failed",
                });

            });
    };
};


export const restaurantNameUpdateAction = (name, id, is_active) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Put";
    const formData = {
        _id: id,
        name: name,
        is_active: is_active
    };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: RESTAURANT_NAME_UPDATE,
                    status: "Success",
                });
                toast.success("Updated Successfully");
            })
            .catch(error => {
                dispatch({
                    type: RESTAURANT_NAME_UPDATE,
                    status: "Failed",
                });
                toast.error("Something went wrong!!");
            });
    };
};

export const restaurantStatusUpdateAction = (name, id, is_active) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Put";
    const formData = {
        _id: id,
        name: name,
        is_active: !(is_active)
    };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: RESTAURANT_STATUS_UPDATE,
                    status: "Success",
                });
                toast.success("Status Updated Successfully");
            })
            .catch(error => {
                dispatch({
                    type: RESTAURANT_STATUS_UPDATE,
                    status: "Failed",
                });
                toast.error("Something went wrong!!");
            });
    };
};

export const getAllCusineAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Get";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_ALL_CUSINE,
                    payload: response.data,
                    status: "Success",
                });

            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_CUSINE,
                    status: "Failed",
                });

            });
    };
};


export const branchAddAction = (id, zoneInfo, lat, lng, file, coverFile, currentPath, selectedCuisine, time) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Branch/Post";

    const data = selectedCuisine?.length > 0 ? selectedCuisine.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            cuisine_id: item.value,
            branch_id: id
        }
    }) : null

    console.log(data);
    const all_working_hours = time?.length > 0 ? time.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            day: Number(item.day),
            open_hour: moment(item.startTime, "HH:mm").get('hours'),
            open_min: moment(item.startTime, "HH:mm").get('minutes'),
            close_hour: moment(item.endTime, "HH:mm").get('hours'),
            close_minute: moment(item.endTime, "HH:mm").get('minutes'),
            branch_id: id,

        }
    }) : null
    let formData = {
        name: zoneInfo.name,
        _id: id,
        email: zoneInfo.email,
        location: {
            coordinates: [Number(lat), Number(lng)],
            type: "Point"
        },
        address: zoneInfo.address,
        popularity_sort_value: JSON.parse(zoneInfo.popularity_sort_value),
        price_range: zoneInfo.price_range,
        image: "https://unsplash.com/photos/kcA-c3f_3FE",
        cover_image: "https://unsplash.com/photos/kcA-c3f_3FE",
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
        cuisines: data
    };


    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_BRANCH",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Branch Addedd Successfully");
            })
            .catch(error => {
                dispatch({
                    type: "ADD_BRANCH",
                    payload: error,
                    status: "Failed",
                });
                toast.error("Branch Add Failed");
            });

    };

};


export const branchEditAction = (id, zoneInfo, lat, lng, file, coverFile, currentPath, selectedCuisine, time) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put";
    console.log(id);
    console.log(zoneInfo);
    console.log(location);
    console.log(file);
    console.log(coverFile);
    console.log(time);
    console.log(selectedCuisine);

    //const newLoc = location.replace(/['"]/g,)


    const data = selectedCuisine?.length > 0 ? selectedCuisine.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            cuisine_id: item.value,
            branch_id: id
        }
    }) : null

    console.log(data);
    const all_working_hours = time?.length > 0 ? time.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            day: Number(item.day),
            open_hour: moment(item.startTime, "HH:mm").get('hours'),
            open_min: moment(item.startTime, "HH:mm").get('minutes'),
            close_hour: moment(item.endTime, "HH:mm").get('hours'),
            close_minute: moment(item.endTime, "HH:mm").get('minutes'),
            branch_id: id,

        }
    }) : null
    let formData = {
        name: zoneInfo.name,
        _id: id,
        email: zoneInfo.email,
        location: {
            coordinates: [Number(lat), Number(lng)],
            type: "Point"
        },
        address: zoneInfo.address,
        popularity_sort_value: JSON.parse(zoneInfo.popularity_sort_value),
        price_range: zoneInfo.price_range,
        image: "https://unsplash.com/photos/kcA-c3f_3FE",
        cover_image: "https://unsplash.com/photos/kcA-c3f_3FE",
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
        cuisines: data
    };


    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "EDIT_BRANCH",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Branch Edited Successfully");
            })
            .catch(error => {
                dispatch({
                    type: "EDIT_BRANCH",
                    payload: error,
                    status: "Failed",
                });
                toast.error("Branch Edit Failed");
            });

    };

};

export const branchStatusEditAction = data => {
    var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put";


    const formData = data;


    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_BRANCH_STATUS,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: EDIT_BRANCH_STATUS,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const branchPopularEditAction = data => {
    var url = process.env.REACT_APP_LOCALHOST + "/Branch/Put";

    const formData = data;

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_BRANCH_POPULAR,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: EDIT_BRANCH_POPULAR,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};





export const getAllBranchAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Branch/Get";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_ALL_BRANCH,
                    payload: response.data,
                    status: "Success",
                });

            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_BRANCH,
                    status: "Failed",
                });

            });
    };
};

export const zoneAddAction = (id, zoneInfo, path, deliveryCharge, selectedBranch) => {
    console.log(zoneInfo);
    console.log(path);
    console.log(deliveryCharge);
    console.log(selectedBranch);

    var url = process.env.REACT_APP_LOCALHOST + "/Zone/Post";

    const data = selectedBranch?.length > 0 ? selectedBranch.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            branch_id: item.value,
            zone_id: id,
        }
    }) : null

    const delivery_charges = deliveryCharge?.length > 0 ? deliveryCharge.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            distance_start_in_kilometer: Number(item.distanceStart),
            distance_end_in_kilometer: Number(item.distanceEnd),
            delivery_charge: Number(item.deliveryCharge),
            zone_id: id

        }
    }) : null


    const allData = path.map(item => [Number(item.lat), Number(item.lng)]);
    console.log(allData);
    let formData = {
        _id: id,
        name: zoneInfo.area,
        radius: Number(zoneInfo.radius),
        lat_long: {
            coordinates: [

                allData

            ],
            "type": "Polygon"
        },
        city_id: zoneInfo.city,
        branches: data,
        zone_delivery_charges: delivery_charges,
    };

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_ZONE",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Zone Addedd Successfully");

            })
            .catch(error => {
                dispatch({
                    type: "ADD_ZONE",
                    payload: error,
                    status: "Failed",
                });
                toast.error("Zone Add Failed");
            });

    };

};

export const zoneAddFresh = () => {
    return dispatch => {
        dispatch({
            type: "ADD_ZONE_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const getAllZoneAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Zone/Get";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_ALL_ZONE,
                    payload: response.data,
                    status: "Success",
                });

            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_ZONE,
                    status: "Failed",
                });

            });
    };
};

export const zoneEditAction = (id, zoneInfo, path, deliveryCharge, selectedBranch) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put";

    console.log(zoneInfo);
    console.log(path);
    console.log(deliveryCharge);
    console.log(selectedBranch);

    var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put";

    const data = selectedBranch?.length > 0 ? selectedBranch.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            branch_id: item.value,
            zone_id: id,
        }
    }) : null

    const delivery_charges = deliveryCharge?.length > 0 ? deliveryCharge.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            distance_start_in_kilometer: Number(item.distanceStart),
            distance_end_in_kilometer: Number(item.distanceEnd),
            delivery_charge: Number(item.deliveryCharge),
            zone_id: id

        }
    }) : null


    const allData = path.map(item => [Number(item.lat), Number(item.lng)]);
    console.log(allData);
    let formData = {
        _id: id,
        name: zoneInfo.area,
        radius: Number(zoneInfo.radius),
        lat_long: {
            coordinates: [

                allData

            ],
            "type": "Polygon"
        },
        city_id: zoneInfo.city,
        branches: data,
        zone_delivery_charges: delivery_charges,
    };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_ZONE,
                    status: "Success",
                });
                toast.success("Updated Successfully");
            })
            .catch(error => {
                dispatch({
                    type: EDIT_ZONE,
                    status: "Failed",
                });
                toast.error("Something went wrong!!");
            });
    };
};

export const zoneEditFresh = () => {
    return dispatch => {
        dispatch({
            type: "EDIT_ZONE_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const zoneStatusEditAction = data => {

    var url = process.env.REACT_APP_LOCALHOST + "/Zone/Put";

    const formData = data;
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_ZONE_STATUS,
                    status: "Success",
                });
                // toast.success("Updated Successfully");
            })
            .catch(error => {
                dispatch({
                    type: EDIT_ZONE_STATUS,
                    status: "Failed",
                });
                // toast.error("Something went wrong!!");
            });
    };
};

export const zoneStatusEditActionFresh = () => {
    return dispatch => {
        dispatch({
            type: EDIT_ZONE_STATUS_FRESH,
            payload: null,
            status: false,
        });
    };
};

export const addBranchFresh = () => {
    return dispatch => {
        dispatch({
            type: "ADD_BRANCH_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const editBranchFresh = () => {
    return dispatch => {
        dispatch({
            type: "EDIT_BRANCH_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const editBranchStatusFresh = () => {
    return dispatch => {
        dispatch({
            type: "EDIT_BRANCH_STATUS_FRESH",
            payload: null,
            status: false,
        });
    };
};

export const editBranchPopularFresh = () => {
    return dispatch => {
        dispatch({
            type: EDIT_BRANCH_POPULAR_FRESH,
            payload: null,
            status: false,
        });
    };
};



export const addOnsCategoryAction = (val, category, isChecked) => {
    var url = process.env.REACT_APP_LOCALHOST + "/AddOnCategory/Post";
    const val_id = uuidv4();
    let formData = {
        _id: val,
        name: category.name,
        cat_is_multiple: isChecked,
        cat_max_choic: parseInt(category.num_of_choice),
        language_slug: "en",
        add_on_category_desc: category.add_on_category_desc,
        variation_id: val_id,
        //is_active: true

    };

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_ONS_CATEGORY",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Addon Category Addedd Successfully");
            })
            .catch(error => {
                dispatch({
                    type: "ADD_ONS_CATEGORY",
                    error: error,
                    status: "Failed",
                });
                toast.error("Addon Category Add Failed");
            });

    };

};

export const addCuisineAction = (id, name) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Post";


    let formData = {
        _id: id,
        name: name,
        imane: "https://unsplash.com/photos/kcA-c3f_3FE",

    };

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_CUISINE",
                    payload: response.data,
                    status: "Success",
                });
                toast.success("Cuisine Addedd Successfully");
            })
            .catch(error => {
                dispatch({
                    type: "ADD_CUISINE",
                    error: error,
                    status: "Failed",
                });
                toast.error("Cuisine Add Failed");
            });

    };

};

export const getAllCuisneAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Get";
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_CUISINE,
                    payload: response.data,
                    status: "Success",
                });

            })
            .catch(error => {
                dispatch({
                    type: GET_CUISINE,
                    status: "Failed",
                    error: error
                });

            });
    };
};

export const cuisineEditAction = (id, editName) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Cuisine/Put";
    const formData = {
        _id: id,
        name: editName,
        imane: "https://unsplash.com/photos/kcA-c3f_3FE",
    };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: EDIT_CUISINE,
                    status: "Success",
                });
                toast.success("Edit Cuisine Successfully");
            })
            .catch(error => {
                dispatch({
                    type: EDIT_CUISINE,
                    status: "Failed",
                });
                toast.error("Edit Cuisine Fialed !!");
            });
    };
};
