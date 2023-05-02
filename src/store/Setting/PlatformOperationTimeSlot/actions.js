import { ADD_OPERATION_TIME_SLOT, ADD_OPERATION_TIME_SLOT_FRESH, GET_ALL_OPERATION_TIME_SLOT, GET_ALL_OPERATION_TIME_SLOT_FRESH, OPERATION_TIME_SLOT_EDIT, OPERATION_TIME_SLOT_EDIT_FRESH, OPERATION_TIME_SLOT_DELETE, OPERATION_TIME_SLOT_DELETE_FRESH, OPERATION_TIME_SLOT_STATUS_EDIT, OPERATION_TIME_SLOT_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { convertToFormData } from "helpers/functions"
import moment from "moment"

// token
var token = JSON.parse(localStorage.getItem("jwt"));

export const addOperationTimeSlotAction = (addData) => {

    var url = process.env.REACT_APP_LOCALHOST + "/PlatfromOperationTimeSlot/Post";
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
                    type: ADD_OPERATION_TIME_SLOT,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_OPERATION_TIME_SLOT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const addOperationTimeSlotFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_OPERATION_TIME_SLOT_FRESH,
            status: false,
        });
};

export const getAllOperationTimeSlotAction = () => {
    // console.log("hi");
    var url = process.env.REACT_APP_LOCALHOST + "/PlatfromOperationTimeSlot/Get";
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
                    type: GET_ALL_OPERATION_TIME_SLOT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_OPERATION_TIME_SLOT,
                    status: "Failed",
                });
            });
    };
};

export const getAllOperationTimeSlotFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_OPERATION_TIME_SLOT_FRESH,
            payload: null,
            status: "Success",
        });
    };
};

export const operationTimeSlotUpdateAction = (editData) => {
    //console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/PlatfromOperationTimeSlot/Put";

    let formData = {
        _id: editData._id,
        day: editData.day,
        open_hour: moment(editData.start_time, "HH:mm").get("hours"),
        open_minute: moment(editData.start_time, "HH:mm").get("minutes"),
        close_hour: moment(editData.end_time, "HH:mm").get("hours"),
        close_minute: moment(editData.end_time, "HH:mm").get("minutes"),
        is_active: editData.is_active,

    };

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
                    type: OPERATION_TIME_SLOT_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: OPERATION_TIME_SLOT_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const operationTimeSlotUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: OPERATION_TIME_SLOT_EDIT_FRESH,
            status: false,
        });
};

export const operationTimeSlotStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/PlatfromOperationTimeSlot/Put";
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
                    type: OPERATION_TIME_SLOT_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: OPERATION_TIME_SLOT_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const operationTimeSlotStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: OPERATION_TIME_SLOT_STATUS_EDIT_FRESH,
            status: false,
        });
};


export const operationTimeSlotDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/PlatfromOperationTimeSlot/Delete";
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
                    type: OPERATION_TIME_SLOT_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: OPERATION_TIME_SLOT_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const operationTimeSlotDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: OPERATION_TIME_SLOT_DELETE_FRESH,
            status: false,
        });
};