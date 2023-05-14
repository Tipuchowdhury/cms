import { ADD_PERMISSION, ADD_PERMISSION_FRESH, GET_ALL_PERMISSION, GET_ALL_PERMISSION_FRESH, PERMISSION_EDIT, PERMISSION_EDIT_FRESH, PERMISSION_DELETE, PERMISSION_DELETE_FRESH, PERMISSION_STATUS_EDIT, PERMISSION_STATUS_EDIT_FRESH } from "./actionTypes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// token
var token = JSON.parse(localStorage.getItem("jwt"));


export const addPermissionAction = (addData, routes) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Permission/Post";

    // console.log(routes);

    const val = uuidv4();

    const data =
        routes?.length > 0
            ? routes.map(item => {
                const route_id = uuidv4()
                return {
                    _id: route_id,
                    route: item.route,
                    permission_id: val,
                    is_active: true
                }
            })
            : null

    // console.log(data);

    const formData = {
        _id: val,
        ...addData,
        routes: data
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
                    type: ADD_PERMISSION,
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: ADD_PERMISSION,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const addPermissionFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_PERMISSION_FRESH,
            status: false,
        });
};

export const getAllPermissionAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/Permission/Get";
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
                    type: GET_ALL_PERMISSION,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_PERMISSION,
                    status: "Failed",
                });
            });
    };
};


export const getAllPermissionFresh = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_PERMISSION_FRESH,
            payload: null,
            status: "Success",
        });
    };
};


export const permissionUpdateAction = (editData, routes) => {
    // console.log(editData);

    var url = process.env.REACT_APP_LOCALHOST + "/Permission/Put";

    const data =
        routes?.length > 0
            ? routes.map(item => {
                const route_id = uuidv4()
                return {
                    _id: route_id,
                    route: item.route,
                    permission_id: editData._id,
                    is_active: true
                }
            })
            : null
    const formData = { ...editData, routes: data };
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",

        };
        axios
            .put(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: PERMISSION_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: PERMISSION_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const permissionUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: PERMISSION_EDIT_FRESH,
            status: false,
        });
};

export const permissionStatusUpdateAction = (editData) => {


    var url = process.env.REACT_APP_LOCALHOST + "/Permission/Put";
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
                    type: PERMISSION_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: PERMISSION_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const permissionStatusUpdateFresh = () => {
    // console.log("===== I am in the fresh ========")
    return dispatch =>
        dispatch({
            type: PERMISSION_STATUS_EDIT_FRESH,
            status: false,
        });
};



export const permissionDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/Permission/Delete";
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
                    type: PERMISSION_DELETE,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: PERMISSION_DELETE,
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const permissionDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: PERMISSION_DELETE_FRESH,
            status: false,
        });
};