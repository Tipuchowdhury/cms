import {
    ADD_RESTAURANT,
    GET_ALL_RESTAURANT,
    RESTAURANT_NAME_UPDATE,
    GET_ALL_CUSINE,
    ADD_BRANCH,
    GET_ALL_BRANCH,

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


export const restaurantNameUpdateAction = (name, id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Restaurant/Put";
    const formData = {
        _id: id,
        name: name
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
        name: zoneInfo.area,
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