import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label, Input, Container, Row, Col, Form } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import { useEffect } from 'react';
import { getAllRestaurantAction, getAllUsersRolesAction, branchAddAction, addBranchFresh, branchEditAction, editBranchFresh, getAllCuisneAction } from 'store/actions';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { boolean } from 'yup';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';

const LoadingContainer = () => <div>Loading...</div>;

function BranchAdd(props) {
    const location = useLocation();
    const naviagte = useNavigate();
    console.log(location.state);
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState();
    const [coverFile, setCoverFile] = useState();
    const [popularVal, setPopularVal] = useState();
    const [preOrder, setPreOrder] = useState();
    const [priceRange, setPriceRange] = useState();
    console.log(popularVal)
    console.log(preOrder)
    console.log(priceRange)
    const [defaultProps, setDefaultProps] = useState({
        lat: 23.8103,
        lng: 90.4125,
    });
    const map_value_for_edit = location.state?.location?.coordinates?.map((item) => (
        item
    ))
    console.log(map_value_for_edit);
    const [state2, setState2] = useState({
        location: location.state ? map_value_for_edit : undefined,
        lat: location.state ? map_value_for_edit[0] : undefined,
        lng: location.state ? map_value_for_edit[1] : undefined,
    });
    const [selectedGroup, setselectedGroup] = useState(null);
    const restaurant_time_for_edit = location.state?.working_hours?.map((item) => ({

        day: item.day, startTime: moment({ hour: item.open_hour, minute: item.open_minute }).format('HH:mm'), endTime: moment({ hour: item.close_hour, minute: item.close_minute }).format('HH:mm')
    }))
    console.log(restaurant_time_for_edit);
    const timeTemplate = { day: "", startTime: "", endTime: "" }
    const [time, setTime] = useState(location.state ? restaurant_time_for_edit : [timeTemplate]);

    function handleAddRowNested() {
        setTime([...time, timeTemplate]);
    }
    console.log(time);
    const toggle = () => setModal(!modal);
    const onMarkerClick = e => {
        console.log(e.google.maps.LatLng());
    };

    const onMapClickHandler = e => {
        console.log(e);
    };

    const moveMarker = (props, marker, e) => {
        console.log(e.latLng.lat())
        console.log(e.latLng.lng())
        setDefaultProps({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setState2({
            ...state2,
            location: [(e.latLng.lat()), (e.latLng.lng())],
            lat: (e.latLng.lat()),
            lng: (e.latLng.lng())
        });
    };
    const [zoneInfo, setZoneInfo] = useState({
        name: location.state ? location.state.name : undefined,
        restaurant: location.state ? location.state.parent_restaurant_id : undefined,
        phone_number: location.state ? location.state.phone_number : "",
        zonal_admin: location.state ? location.state.zonal_admin : "",
        address: location.state ? location.state.address : "",
        cuisine: "",
        location: undefined,
        price_range: location.state ? location.state.price_range : "",
        popularity_sort_value: location.state ? location.state.popularity_sort_value : "",
        is_take_pre_order: location.state ? location.state.is_take_pre_order.toString() : "",
        is_veg: location.state ? location.state.is_veg.toString() : "",
        is_popular: location.state ? location.state.is_popular.toString() : "",
        is_delivery: location.state ? location.state.is_delivery.toString() : "",
        is_pickup: location.state ? location.state.is_pickup.toString() : "",
        is_dine: location.state ? location.state.is_dine.toString() : "",
        commission: location.state ? location.state.commission : undefined,
        minimum_order_value: location.state ? location.state.min_order_value : undefined,
        delivery_time: location.state ? location.state.delivery_time : undefined,
        pickup_time: location.state ? location.state.pickup_time : undefined,
        email: location.state ? location.state.email : "",
        link: location.state ? location.state.share_link : "",

    })
    // get all restaurant
    let restaurantData = undefined;
    if (props.get_all_restaurant_data?.length > 0) {
        restaurantData = props.get_all_restaurant_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }
    // get all users
    let userData = undefined;
    if (props.get_all_user_roles_data?.length > 0) {
        userData = props.get_all_user_roles_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }

    //-- cuisine value for edit
    const common_cuisines = props?.get_all_cuisine_data?.filter((elem) => location?.state?.cuisines?.find(({ cuisine_id }) => elem._id === cuisine_id));
    console.log(common_cuisines);
    const cuisine_data_edit = common_cuisines ? common_cuisines?.map((item, key) => {
        return { label: item.name, value: item._id };
    }) : "";
    console.log(cuisine_data_edit);

    const [selectedCuisine, setSelectedCuisine] = useState(cuisine_data_edit ? cuisine_data_edit : "");
    const handleSelectCuisine = (e) => {
        console.log(e)
        setSelectedCuisine(e)
    }
    let cusineData = undefined;
    if (props.get_all_cuisine_data?.length > 0) {
        cusineData = props.get_all_cuisine_data?.map((item, key) => ({
            label: item.name, value: item._id,
        }));

    }
    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }
    function handleChange(event) {
        console.log(event.target.files[0])
        console.log("nooooooooooooooo")
        setFile(event.target.files[0])

    }
    function handleChangeCover(event) {
        console.log(event.target.files[0])
        console.log("nooooooooooooooo")
        setCoverFile(event.target.files[0])

    }
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setZoneInfo({ ...zoneInfo, [name]: value })

    }
    const [timeCheckerState, setChecker] = useState()
    const handleTimeChange = (e, index) => {
        console.log(index);
        const updatedValue = time.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
        setTime(updatedValue)

    }

    // const handleTimeChange = (e, index) => {
    //     console.log(index);
    //     if (time.length > 1) {
    //         console.log("===========yo==============");
    //         const updatedValue = time.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
    //         //setTime(updatedValue)
    //         isTimeInRange(updatedValue);
    //     } else {
    //         const updatedValue = time.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
    //         setTime(updatedValue)

    //     }


    //}
    // function isTimeInRange(time) {
    //     for (var i = 0; i < time.length; i++) {
    //         var range = time[i];
    //         console.log(range)
    //         console.log(time)
    //         if (range.day == time[i].day) {
    //             console.log("=========yes===========");
    //             if ((time.startTime > range.startTime && time.startTime < range.endTime)
    //                 || (range.startTime > range.endTime && (time.startTime > range.startTime || time.startTime < range.endTime))) {
    //                 //return true
    //                 setChecker(true)
    //             } else {
    //                 setTime(time)
    //                 setChecker(false)
    //             }
    //         } else {
    //             console.log("=========No===========");
    //             setTime(time)
    //             setChecker(false)
    //         }

    //     }
    // }

    //==============
    function isTimeInRange(newTime) {
        for (var i = 0; i < time.length; i++) {
            var range = time[i]
            if ((newTime.startTime > range.startTime && newTime.startTime < range.endTime)
                || (range.startTime > range.endTime && (newTime.startTime > range.startTime || newTime.startTime < range.endTime))) {
                console.log("=======inside true============");
                setTime(time)
                setChecker(true)
            } else {
                console.log("=======inside false============");
                setTime(time)
                setChecker(false)
            }
        }
        return false
        // const data = time.filter((item) => (newTime.day == item.day) && ((newTime.startTime > item.startTime && newTime.startTime < item.endTime)
        //     || (item.startTime > item.endTime && (newTime.startTime > item.startTime || newTime.startTime < item.endTime))) ? setTime(time) && setChecker(true) : setTime(time) && setChecker(false))

    }
    console.log(timeCheckerState);
    console.log(time);
    const handleRowDelete = (index) => {
        const filteredTime = [...time];
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1);
            setTime(filteredTime)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const val = uuidv4();
        const currentPath = window.location.pathname;
        props.branchAddAction(val, zoneInfo, state2.lat, state2.lng, file, coverFile, currentPath, selectedCuisine, time)

    }

    const handleEditBranch = (e) => {
        e.preventDefault();
        const currentPath = window.location.pathname;
        props.branchEditAction(location.state?._id, zoneInfo, state2.lat, state2.lng, file, coverFile, currentPath, selectedCuisine, time)

    }
    // const handleSort = (e) => {
    //     alert("Hello")
    // }
    console.log(props.get_all_cusine_data);
    useEffect(() => {
        if (props.get_all_restaurant_loading == false) {
            props.getAllRestaurantAction();
        }

        if (props.get_all_user_roles_loading === false) {
            props.getAllUsersRolesAction();
        }

        if (props.get_all_cuisine_loading === false) {
            props.getAllCuisneAction();

        }

        if (props.add_branch_loading === "Success") {
            naviagte("/manage-branch")
            props.addBranchFresh();
        }

        if (props.edit_branch_loading === "Success") {
            naviagte("/manage-branch")
            props.editBranchFresh();
        }
    }, [props.get_all_restaurant_loading, props.get_all_user_roles_loading, props.get_all_cusine_loading, props.add_branch_loading, props.edit_branch_loading]);

    console.log(props.get_all_restaurant_data);
    console.log(props.get_all_cusine_data);
    console.log(zoneInfo.is_take_pre_order);

    return (

        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Branch" breadcrumbItem="Manage Branch" />

                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>{location.state ? "Edit Branch" : "Add a New Branch"} </CardTitle>

                                    </div>
                                    {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-4" action="#" onSubmit={location.state ? handleEditBranch : handleSubmit}>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Branch Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter branch name" name="name" onChange={handleInputs} value={zoneInfo.name ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Restaurant Name
                                    </label>
                                    <div className="col-md-10">
                                        <Input
                                            id="exampleSelect"
                                            name="restaurant"
                                            value={zoneInfo.restaurant}
                                            //required={true}
                                            onChange={handleInputs}
                                            type="select"
                                        >
                                            <option>Choose...</option>
                                            {restaurantData}
                                        </Input>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Email
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="city" placeholder="Enter address" name="email" value={zoneInfo.email} onChange={handleInputs} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Phone Number
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="city" placeholder="Enter phone number" name="phone_number" value={zoneInfo.phone_number} onChange={handleInputs} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Zonal Admin
                                    </label>
                                    <div className="col-md-10">
                                        <Input
                                            id="exampleSelect"
                                            name="zonal_admin"
                                            value={zoneInfo.zonal_admin}
                                            //required={true}
                                            onChange={handleInputs}
                                            type="select"
                                        >
                                            <option>Choose...</option>
                                            {userData}
                                        </Input>
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Image
                                    </label>
                                    <div className="col-md-10">
                                        <input type="file" className="form-control" id="resume" onChange={handleChange} />
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Cover Image
                                    </label>
                                    <div className="col-md-10">
                                        <input type="file" className="form-control" id="resume" onChange={handleChangeCover} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Link
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="city" placeholder="Enter address" name="link" value={zoneInfo.link} onChange={handleInputs} />
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Cuisine
                                    </label>
                                    <div className="col-md-10">
                                        <Select
                                            // id="exampleSelect"
                                            // name="cuisine"
                                            // value={zoneInfo.cuisine}
                                            // required={true}
                                            // // onChange={e => setCusine(e.target.value)}
                                            // onChange={handleInputs}
                                            // type="select"
                                            // isMulti={true}
                                            value={selectedCuisine}
                                            onChange={handleSelectCuisine}
                                            options={cusineData}
                                            isMulti={true}
                                        />

                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Address
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="delivery_charge_1" placeholder="Enter Address" name="address" onChange={handleInputs} value={zoneInfo.address} />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Price Range
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="btnradio4"
                                                autoComplete="off"
                                                name="price_range" onChange={handleInputs} value="high"
                                                //checked={zoneInfo.price_range == "high"}
                                                checked={zoneInfo.price_range == "high" ? "high" : ""}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="btnradio4"
                                            >
                                                High
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="price_range" onChange={handleInputs} value="medium"
                                                id="btnradio5"
                                                autoComplete="off"
                                                //checked={zoneInfo.price_range == "medium"}
                                                checked={zoneInfo.price_range == "medium" ? "medium" : ""}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="btnradio5"
                                            >
                                                Medium
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="price_range" onChange={handleInputs} value="low"
                                                id="btnradio6"
                                                autoComplete="off"
                                                //checked={zoneInfo.price_range == "low"}
                                                checked={zoneInfo.price_range == "low" ? "low" : ""}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="btnradio6"
                                            >
                                                Low
                                            </label>
                                        </div>
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Popular Sort Value
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="popularity_sort_value"
                                                name="popularity_sort_value" value="1" onChange={handleInputs}
                                                //checked={zoneInfo.popularity_sort_value === "1"}
                                                checked={zoneInfo.popularity_sort_value == "1" ? "1" : ""}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="popularity_sort_value"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="popularity_sort_value" value="0" onChange={handleInputs}
                                                id="popularity_sort_value1"

                                                //checked={zoneInfo.popularity_sort_value === "0"}
                                                checked={zoneInfo.popularity_sort_value == "0" ? "0" : ""}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="popularity_sort_value1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Pre Order

                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="popularity_sort"
                                                name="is_take_pre_order" value="true" onChange={handleInputs}
                                                //checked={zoneInfo.popularity_sort_value === "1"}
                                                checked={zoneInfo.is_take_pre_order == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="popularity_sort"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_take_pre_order" value="false" onChange={handleInputs}
                                                id="popularity_value1"

                                                //checked={zoneInfo.popularity_sort_value === "0"}
                                                checked={zoneInfo.is_take_pre_order == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="popularity_value1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Vegetarian
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_veg"
                                                autoComplete="off"
                                                name="is_veg" onChange={handleInputs} value="true"
                                                checked={zoneInfo.is_veg == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_veg"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_veg" onChange={handleInputs} value="false"
                                                id="is_veg1"
                                                autoComplete="off"
                                                checked={zoneInfo.is_veg == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_veg1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Popular
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_popular"
                                                autoComplete="off"
                                                name="is_popular" onChange={handleInputs} value="true"
                                                checked={zoneInfo.is_popular == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_popular"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_popular" onChange={handleInputs} value="false"
                                                id="is_popular1"
                                                autoComplete="off"
                                                checked={zoneInfo.is_popular == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_popular1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Delivery
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_delivery"
                                                autoComplete="off"
                                                name="is_delivery" onChange={handleInputs} value="true"
                                                checked={zoneInfo.is_delivery == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_delivery"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_delivery" onChange={handleInputs} value="false"
                                                id="is_delivery1"
                                                autoComplete="off"
                                                checked={zoneInfo.is_delivery == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_delivery1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Pickup
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_pickup"
                                                autoComplete="off"
                                                name="is_pickup" onChange={handleInputs} value="true"
                                                checked={zoneInfo.is_pickup == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_pickup"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_pickup" onChange={handleInputs} value="false"
                                                id="is_pickup1"
                                                autoComplete="off"
                                                checked={zoneInfo.is_pickup == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_pickup1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Dine
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_dine"
                                                autoComplete="off"
                                                name="is_dine" onChange={handleInputs} value="true"
                                                checked={zoneInfo.is_dine == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_dine"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_dine" onChange={handleInputs} value="false"
                                                id="is_dine1"
                                                autoComplete="off"
                                                checked={zoneInfo.is_dine == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_dine1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Commmission
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="city" placeholder="Enter commission amount" name="commission" value={zoneInfo.commission ?? ""} onChange={handleInputs} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Minimum Order Value
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="minimum_order_value" placeholder="Enter minimum order value" name="minimum_order_value" value={zoneInfo.minimum_order_value ?? ""} onChange={handleInputs} />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Delivery Time
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="city" placeholder="Enter Delivery Time" name="delivery_time" value={zoneInfo.delivery_time ?? ""} onChange={handleInputs} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Pickup Time
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="city" placeholder="Enter Delivery Time" name="pickup_time" value={zoneInfo.pickup_time ?? ""} onChange={handleInputs} />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Location
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} readOnly={true} />
                                    </div>
                                </Row>


                                <Card>
                                    <CardBody>
                                        <div
                                            id="gmaps-markers"
                                            className="gmaps"
                                            style={{ position: "relative" }}
                                        >

                                            <Map
                                                style={{ width: "100%", height: "100%" }}
                                                google={props.google}
                                                initialCenter={defaultProps}
                                                zoom={12}
                                                onClick={e => onMapClickHandler(e)}
                                            >
                                                <Marker
                                                    position={defaultProps}
                                                    draggable={true}
                                                    onDragend={moveMarker}
                                                    onClick={e => {
                                                        onMarkerClick(e);
                                                    }}
                                                />
                                            </Map>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Restaurant Timings
                                    </label>
                                    {/* <div className="col-md-10">
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} />
                                    </div> */}
                                </Row>
                                {/* ==================restaurant time================= */}

                                {time.map((row, idx) => (
                                    <React.Fragment key={idx}>
                                        <div data-repeater-list="group-a" id={"addr" + idx}>
                                            <div data-repeater-item className="row">
                                                <div className="mb-3 col-lg-2">
                                                    <label className="form-label" htmlFor="name">Day</label>
                                                    <Input
                                                        id="name" name="day" className="form-control" placeholder="select day" value={row.day} onChange={(e) => handleTimeChange(e, idx)}
                                                        type="select"
                                                    >
                                                        <option>Choose...</option>

                                                        <option value="1">Saturday</option>
                                                        <option value="2">Sunday</option>
                                                        <option value="3">Monday</option>
                                                        <option value="4">Tuesday</option>
                                                        <option value="5">Wednesday</option>
                                                        <option value="6">Thursday</option>
                                                        <option value="7">Friday</option>
                                                    </Input>
                                                </div>



                                                <div className="mb-3 col-lg-2">
                                                    <label className="form-label" htmlFor="startTime">Start Time</label>
                                                    <input type="time" id="startTime" className="form-control" name="startTime" placeholder="Start Time" value={row.startTime} onChange={(e) => handleTimeChange(e, idx)} />
                                                </div>

                                                <div className="mb-3 col-lg-2">
                                                    <label className="form-label" htmlFor="subject">End Time</label>
                                                    <input type="time" id="subject" className="form-control" name="endTime" placeholder="End Time" value={row.endTime} onChange={(e) => handleTimeChange(e, idx)} />
                                                </div>

                                                <Col lg={2} className="align-self-center d-grid mt-3">
                                                    <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                                </Col>
                                            </div>

                                        </div>
                                    </React.Fragment>
                                ))}
                                <Button
                                    onClick={() => {
                                        handleAddRowNested();
                                    }}
                                    color="success"
                                    className="btn btn-success mt-3 mt-lg-0"
                                >
                                    Add
                                </Button>

                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">{location.state ? "Edit Branch" : "Add Branch"}</button>
                                    </div>
                                </div>



                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

//export default AddBranch;

const mapStateToProps = state => {
    const {
        get_all_restaurant_data,
        get_all_restaurant_loading,

        add_branch_loading,
        edit_branch_loading,

        get_all_cuisine_data,
        get_all_cuisine_loading
    } = state.Restaurant;

    const {
        get_all_user_roles_data,
        get_all_user_roles_loading,

    } = state.registerNew;
    return {
        get_all_restaurant_data,
        get_all_restaurant_loading,

        get_all_user_roles_data,
        get_all_user_roles_loading,
        add_branch_loading,
        edit_branch_loading,

        get_all_cuisine_data,
        get_all_cuisine_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getAllRestaurantAction,
        getAllUsersRolesAction,
        branchAddAction,
        addBranchFresh,
        branchEditAction,
        editBranchFresh,
        getAllCuisneAction
    })(
        GoogleApiWrapper({
            apiKey: "AIzaSyDJkREeL-PpO7Z45k-MsD5sJD_m1mzNGEk",
            LoadingContainer: LoadingContainer,
            v: "3",
        })(BranchAdd)
    )
);