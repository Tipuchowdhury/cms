import { ADD_ROLE, ADD_ROLE_FRESH, GET_ALL_ROLE, GET_ALL_ROLE_FRESH, ROLE_EDIT, ROLE_EDIT_FRESH, ROLE_DELETE, ROLE_DELETE_FRESH, ROLE_STATUS_EDIT, ROLE_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// token
var token = JSON.parse(localStorage.getItem("jwt"));


export const addRoleAction = (addData, permissions) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Role/Post";

    const role_id = uuidv4();

    const set_permissions = permissions?.length > 0 ? permissions.map(item => {
        const new_val = uuidv4();
        return {
            _id: new_val,
            permission_id: item.value,
            role_id: role_id,
        }
    }) : null

    const formData = {
        _id: role_id,
        ...addData,
        permissions: set_permissions
    };

    //console.log(formData);

    console.log(formData);
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
                    type: ADD_ROLE,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_ROLE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const addRoleFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_ROLE_FRESH,
            status: false,
        });
};

export const getAllRoleAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Role/Get";
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
                    type: GET_ALL_ROLE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_ROLE,
                    status: "Failed",
                });
            });
    };
};


export const getAllRoleFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_ROLE_FRESH,
            payload: null,
            status: "Success",
        });
    };
};


export const roleUpdateAction = (editData, permissions) => {
    // console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/Role/Put";

    const set_permissions = permissions?.length > 0 ? permissions.map(item => {
        const val = uuidv4();
        return {
            _id: val,
            permission_id: item.value,
            role_id: editData._id,
        }
    }) : null

    const role_id = uuidv4();


    const formData = {
        ...editData,
        permissions: set_permissions
    };

    // console.log(formData)
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: ROLE_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: ROLE_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const roleUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: ROLE_EDIT_FRESH,
            status: false,
        });
};

export const roleStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/Role/Put";
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
                    type: ROLE_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: ROLE_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const roleStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: ROLE_STATUS_EDIT_FRESH,
            status: false,
        });
};



export const roleDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Role/Delete";
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
                    type: ROLE_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: ROLE_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const roleDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: ROLE_DELETE_FRESH,
            status: false,
        });
};