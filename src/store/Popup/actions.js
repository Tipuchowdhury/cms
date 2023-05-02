import { ADD_POPUP, ADD_POPUP_FRESH, GET_ALL_POPUP, GET_ALL_POPUP_FRESH, POPUP_EDIT, POPUP_EDIT_FRESH, POPUP_DELETE, POPUP_DELETE_FRESH, POPUP_STATUS_EDIT, POPUP_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { convertToFormData } from "helpers/functions";
import { v4 as uuidv4 } from "uuid";

// token
var token = JSON.parse(localStorage.getItem("jwt"));

export const addPopUpAction = (addData) => {
    var url = process.env.REACT_APP_LOCALHOST + "/PopUpBanner/Post";
    const popup_id = uuidv4();


    // let formData = {
    //     _id: popup_id,
    //     ...addData,
    // };

    let dataObject = {
        _id: popup_id,
        ...addData,
    };

    const formData = convertToFormData(dataObject)

    return dispatch => {
        // console.log("-in the dispatch----")

        const headers = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: ADD_POPUP,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_POPUP,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addPopUpFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_POPUP_FRESH,
            status: false,
        });
};

export const getAllPopUpAction = () => {
    // console.log("hi");
    var url = process.env.REACT_APP_LOCALHOST + "/PopUpBanner/Get";
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
                    type: GET_ALL_POPUP,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_POPUP,
                    status: "Failed",
                });
            });
    };
};

export const getAllPopUpFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_POPUP_FRESH,
            payload: null,
            status: "Success",
        });
    };
};

export const popUpUpdateAction = (editData) => {
    //console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/PopUpBanner/Put";

    // const formData = editData;

    const dataObject = editData;

    const formData = convertToFormData(dataObject)
    return dispatch => {
        const headers = {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: POPUP_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: POPUP_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const popUpUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: POPUP_EDIT_FRESH,
            status: false,
        });
};

export const popUpStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/PopUpBanner/Put";
    const dataObject = editData;

    const formData = convertToFormData(dataObject)

    return dispatch => {
        const headers = {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: POPUP_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: POPUP_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const popUpStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: POPUP_STATUS_EDIT_FRESH,
            status: false,
        });
};


export const popUpDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/PopUpBanner/Delete";
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
                    type: POPUP_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: POPUP_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const popUpDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: POPUP_DELETE_FRESH,
            status: false,
        });
};