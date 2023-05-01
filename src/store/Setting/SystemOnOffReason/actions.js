import { ADD_REASON, ADD_REASON_FRESH, GET_ALL_REASON, GET_ALL_REASON_FRESH, REASON_EDIT, REASON_EDIT_FRESH, REASON_DELETE, REASON_DELETE_FRESH, REASON_STATUS_EDIT, REASON_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { convertToFormData } from "helpers/functions"

// token
var token = JSON.parse(localStorage.getItem("jwt"));

export const addReasonAction = (addData) => {

    var url = process.env.REACT_APP_LOCALHOST + "/SystemOnOffReson/Post";
    const reason_id = uuidv4();

    // console.log(addData);

    let dataObject = {
        _id: reason_id,
        ...addData,
    };

    const formData = convertToFormData(dataObject)

    // console.log(formData);

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
                    type: ADD_REASON,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_REASON,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addReasonFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_REASON_FRESH,
            status: false,
        });
};

export const getAllReasonAction = () => {
    // console.log("hi");
    var url = process.env.REACT_APP_LOCALHOST + "/SystemOnOffReson/Get";
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
                    type: GET_ALL_REASON,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_REASON,
                    status: "Failed",
                });
            });
    };
};

export const getAllReasonFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_REASON_FRESH,
            payload: null,
            status: "Success",
        });
    };
};


export const reasonUpdateAction = (editData) => {
    //console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/SystemOnOffReson/Put";

    const dataObject = editData;

    const formData = convertToFormData(dataObject)
    return dispatch => {
        const headers = {
            "Content-Type": "multipart/form-data",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: REASON_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: REASON_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const reasonUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: REASON_EDIT_FRESH,
            status: false,
        });
};

export const reasonStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/SystemOnOffReson/Put";
    const dataObject = editData;

    const formData = convertToFormData(dataObject)
    return dispatch => {
        const headers = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: REASON_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: REASON_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const reasonStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: REASON_STATUS_EDIT_FRESH,
            status: false,
        });
};


export const reasonDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/SystemOnOffReson/Delete";
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
                    type: REASON_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: REASON_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const reasonDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: REASON_DELETE_FRESH,
            status: false,
        });
};