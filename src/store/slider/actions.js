import { ADD_SLIDER, ADD_SLIDER_FRESH, GET_ALL_SLIDER, GET_ALL_SLIDER_FRESH, SLIDER_EDIT, SLIDER_EDIT_FRESH, SLIDER_DELETE, SLIDER_DELETE_FRESH, SLIDER_STATUS_EDIT, SLIDER_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// token
var token = JSON.parse(localStorage.getItem("jwt"));


export const addSliderAction = (addData, selectedRestaurant) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Promotion/Post";
    const slider_id = uuidv4();
    //console.log(addData, restaurant);

    const data = selectedRestaurant?.length > 0 ? selectedRestaurant.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            res_id: item.value,
            promotion_id: slider_id,
        }
    }) : null

    // const selectedBranchData =
    //     selectedRestaurant?.length > 0
    //         ? selectedRestaurant.map(item => {
    //             const val = uuidv4()
    //             return {
    //                 _id: val,
    //                 res_id: item.value,
    //                 promotion_id: slider_id,
    //             }
    //         })
    //         : null

    // const selectedBranchData = [
    //     {
    //         _id: slider_id,
    //         res_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //         promotion_id: slider_id
    //     }
    // ];

    // console.log(data);


    // let formData = {
    //     _id: slider_id,
    //     name: addData.name,
    //     start_date: "2023-04-12T10:16:44.008Z",
    //     end_date: "2023-04-12T10:16:44.008Z",
    //     type: "string",
    //     is_delivery: true,
    //     is_pickup: true,
    //     is_dine: true,
    //     is_active: true,
    //     restaurants: data
    // };

    let formData = {
        _id: slider_id,
        name: addData.name,
        start_date: addData.start_date,
        end_date: addData.end_date,
        type: addData.type,
        is_delivery: addData.is_delivery,
        is_pickup: addData.is_pickup,
        is_dine: addData.is_dine,
        is_active: addData.is_active,
        restaurants: data
    };

    // console.log(formData);

    return dispatch => {
        // console.log("-in the dispatch----")

        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: ADD_SLIDER,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_SLIDER,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const addSliderFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_SLIDER_FRESH,
            status: false,
        });
};

export const getAllSliderAction = () => {
    // console.log("hi");
    var url = process.env.REACT_APP_LOCALHOST + "/Promotion/Get";
    const formData = {};
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",
        };
        axios
            .get(url, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_ALL_SLIDER,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_SLIDER,
                    status: "Failed",
                });
            });
    };
};


export const getAllSliderFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_SLIDER_FRESH,
            payload: null,
            status: "Success",
        });
    };
};


export const promotionUpdateAction = (editData, selectedRestaurant) => {
    // console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/Promotion/Put";

    // const data = selectedRestaurant?.length > 0 ? selectedRestaurant.map(item => {
    //     const val = uuidv4();
    //     return {
    //         _id: val,
    //         res_id: item.value,
    //         promotion_id: slider_id,
    //     }
    // }) : null
    const formData = {
        _id: editData._id,
        name: editData.name,
        start_date: editData.start_date,
        end_date: editData.end_date,
        type: editData.type,
        is_delivery: editData.is_delivery,
        is_pickup: editData.is_pickup,
        is_dine: editData.is_dine,
        is_active: editData.is_active,
        restaurants: []
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
                    type: SLIDER_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SLIDER_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const promotionUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: SLIDER_EDIT_FRESH,
            status: false,
        });
};

export const promotionStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/Promotion/Put";
    const formData = editData;

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: SLIDER_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SLIDER_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const promotionStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: SLIDER_STATUS_EDIT_FRESH,
            status: false,
        });
};



export const promotionDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Promotion/Delete";
    // console.log(id);

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .delete(url, { params: { id: id } }, { headers: headers })
            .then(response => {
                dispatch({
                    type: SLIDER_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SLIDER_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const promotionDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: SLIDER_DELETE_FRESH,
            status: false,
        });
};