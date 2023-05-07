import { ADD_SYSTEM_OPTION, ADD_SYSTEM_OPTION_FRESH, GET_ALL_SYSTEM_OPTION, GET_ALL_SYSTEM_OPTION_FRESH, SYSTEM_OPTION_EDIT, SYSTEM_OPTION_EDIT_FRESH, SYSTEM_OPTION_DELETE, SYSTEM_OPTION_DELETE_FRESH, SYSTEM_OPTION_STATUS_EDIT, SYSTEM_OPTION_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { convertToFormData } from "helpers/functions"
import moment from "moment"

// token
var token = JSON.parse(localStorage.getItem("jwt"));

export const addSystemOptionAction = (addData) => {

    var url = process.env.REACT_APP_LOCALHOST + "/SystemOption/Post";
    const time_slot_id = uuidv4();

    // /console.log(addData);

    let formData = {
        _id: time_slot_id,
        day: addData.day,
        open_hour: moment(addData.start_time, "HH:mm").get("hours"),
        open_minute: moment(addData.start_time, "HH:mm").get("minutes"),
        close_hour: moment(addData.end_time, "HH:mm").get("hours"),
        close_minute: moment(addData.end_time, "HH:mm").get("minutes"),
        is_active: addData.is_active,

    };

    // console.log(dataObject);

    // const formData = convertToFormData(dataObject)

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
                    type: ADD_SYSTEM_OPTION,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_SYSTEM_OPTION,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addSystemOptionFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_SYSTEM_OPTION_FRESH,
            status: false,
        });
};

export const getAllSystemOptionAction = () => {
    // console.log("hi");
    var url = process.env.REACT_APP_LOCALHOST + "/SystemOption/Get";
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
                    type: GET_ALL_SYSTEM_OPTION,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_SYSTEM_OPTION,
                    status: "Failed",
                });
            });
    };
};

export const getAllSystemOptionFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_SYSTEM_OPTION_FRESH,
            payload: null,
            status: "Success",
        });
    };
};

export const systemOptionUpdateAction = (editData) => {
    console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/SystemOption/Put";

    let formData = editData;

    // const formData = convertToFormData(dataObject)
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: SYSTEM_OPTION_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SYSTEM_OPTION_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const systemOptionUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: SYSTEM_OPTION_EDIT_FRESH,
            status: false,
        });
};

export const systemOptionStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/SystemOption/Put";
    const dataObject = editData;

    const formData = convertToFormData(dataObject)
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: SYSTEM_OPTION_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SYSTEM_OPTION_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const systemOptionStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: SYSTEM_OPTION_STATUS_EDIT_FRESH,
            status: false,
        });
};


export const systemOptionDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/SystemOption/Delete";
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
                    type: SYSTEM_OPTION_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: SYSTEM_OPTION_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const systemOptionDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: SYSTEM_OPTION_DELETE_FRESH,
            status: false,
        });
};