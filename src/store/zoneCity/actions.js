import {
    ADD_CITY,
    ADD_CITY_FRESH,
    GET_ALL_CITY,
    GET_ALL_CITY_FRESH,
    CITY_NAME_EDIT,
    CITY_NAME_EDIT_FRESH,
    CITY_STATUS_EDIT,
    CITY_STATUS_EDIT_FRESH,
    CITY_DELETE,
    CITY_DELETE_FRESH

} from "./actionTypes"
import axios from "axios";


// token
var token = JSON.parse(localStorage.getItem("jwt"));
//console.log(token.jwt);

export const addCityAction = (name, id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/City/Post";

    const formData = {
        _id: id,
        name: name,
    };
    return dispatch => {
        console.log("-in the dispatch----")

        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(url, formData, { headers: headers })
            .then(response => {
                dispatch({
                    type: "ADD_CITY",
                    payload: response.data,
                    status: "Success",
                });
            })

            .catch(error => {
                dispatch({
                    type: "ADD_CITY",
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const addCityFresh = () => {
    return dispatch =>
        dispatch({
            type: ADD_CITY_FRESH,
            status: false,
        });
};



export const getAllCityAction = () => {
    var url = process.env.REACT_APP_LOCALHOST + "/City/Get";
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
                    type: GET_ALL_CITY,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_ALL_CITY,
                    status: "Failed",
                });
            });
    };
};


export const getAllCityFresh = () => {
    return dispatch => {
        dispatch({
            type: "GET_ALL_CITY_FRESH",
            payload: null,
            status: "Success",
        });
    };
};

export const cityNameEditAction = (name, id, is_active) => {

    var url = process.env.REACT_APP_LOCALHOST + "/City/Put";
    const formData = {
        _id: id,
        name: name,
        is_active: is_active,
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
                    type: CITY_NAME_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: CITY_NAME_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const cityNameEditFresh = () => {
    return dispatch => {
        dispatch({
            type: CITY_NAME_EDIT_FRESH,
            payload: null,
            status: false,
        });
    }
};

export const cityStatusEditAction = (name, id, is_active) => {

    var url = process.env.REACT_APP_LOCALHOST + "/City/Put";
    const formData = {
        _id: id,
        name: name,
        is_active: !(is_active),
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
                    type: CITY_STATUS_EDIT,
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: CITY_STATUS_EDIT,
                    payload: error,
                    status: "Failed",
                });
            });
    };
};

export const cityStatusEditFresh = () => {
    return dispatch => {
        dispatch({
            type: CITY_STATUS_EDIT_FRESH,
            payload: null,
            status: false,
        });
    }
};

export const cityDeleteAction = (id) => {
    var url = process.env.REACT_APP_LOCALHOST + "/City/Delete";
    console.log(id);

    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .delete(url, { params: { id: id } }, { headers: headers })
            .then(response => {
                dispatch({
                    type: "CITY_DELETE",
                    payload: response.data,
                    status: "Success",
                });
            })
            .catch(error => {
                dispatch({
                    type: "CITY_DELETE",
                    payload: error,
                    status: "Failed",
                });
            });

    };

};

export const cityDeleteFresh = () => {
    return dispatch =>
        dispatch({
            type: CITY_DELETE_FRESH,
            status: false,
        });
};