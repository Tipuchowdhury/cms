import { ADD_BRANCH_ATTRIBUTE, ADD_BRANCH_ATTRIBUTE_FRESH, GET_ALL_BRANCH_ATTRIBUTE, GET_ALL_BRANCH_ATTRIBUTE_FRESH, BRANCH_ATTRIBUTE_EDIT, BRANCH_ATTRIBUTE_EDIT_FRESH, BRANCH_ATTRIBUTE_DELETE, BRANCH_ATTRIBUTE_DELETE_FRESH, BRANCH_ATTRIBUTE_STATUS_EDIT, BRANCH_ATTRIBUTE_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// token
var token = JSON.parse(localStorage.getItem("jwt"));


export const addBranchAttributeAction = (addData) => {
    var url = process.env.REACT_APP_LOCALHOST + "/BranchAttribute/Post";

    const val = uuidv4();
    const formData = {
        _id: val,
        name: addData.branchAttributeName,
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
                    type: ADD_BRANCH_ATTRIBUTE,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_BRANCH_ATTRIBUTE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const addBranchAttributeFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_BRANCH_ATTRIBUTE_FRESH,
            status: false,
        });
};

export const getAllBranchAttributeAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/BranchAttribute/Get";
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
                    type: GET_ALL_BRANCH_ATTRIBUTE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_BRANCH_ATTRIBUTE,
                    status: "Failed",
                });
            });
    };
};

export const getAllBranchAttributeFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_BRANCH_ATTRIBUTE_FRESH,
            payload: null,
            status: "Success",
        });
    };
};

export const branchAttributeUpdateAction = (editData) => {
    console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/BranchAttribute/Put";
    const formData = {
        _id: editData.branchAttributeId,
        name: editData.branchAttributeName,
        is_active: editData.isActive,
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
                    type: BRANCH_ATTRIBUTE_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: BRANCH_ATTRIBUTE_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const branchAttributeUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: BRANCH_ATTRIBUTE_EDIT_FRESH,
            status: false,
        });
};

export const branchAttributeStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/BranchAttribute/Put";
    const formData = {
        _id: editData.branchAttributeId,
        name: editData.branchAttributeName,
        is_active: !(editData.isActive),
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
                    type: BRANCH_ATTRIBUTE_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: BRANCH_ATTRIBUTE_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const branchAttributeStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: BRANCH_ATTRIBUTE_STATUS_EDIT_FRESH,
            status: false,
        });
};

export const branchAttributeDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/BranchAttribute/Delete";
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
                    type: BRANCH_ATTRIBUTE_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: BRANCH_ATTRIBUTE_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const branchAttributeDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: BRANCH_ATTRIBUTE_DELETE_FRESH,
            status: false,
        });
};