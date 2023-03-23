import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label, Input, Container, Row, Col, Form } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import { useEffect } from 'react';
import { getAllRestaurantAction, getAllUsersRolesAction, getAllCusineAction, branchAddAction } from 'store/actions';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { boolean } from 'yup';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

const LoadingContainer = () => <div>Loading...</div>;

function BranchAdd(props) {
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

    const [state2, setState2] = useState({
        location: undefined,
        lat: undefined,
        lng: undefined,
    });
    const [selectedGroup, setselectedGroup] = useState(null);
    const timeTemplate = { day: "", startTime: "", endTime: "" }
    const [time, setTime] = useState([timeTemplate]);

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
        area: undefined,
        restaurant: undefined,
        phone_number: "",
        zonal_admin: "",
        address: "",
        cuisine: "",
        location: undefined,
        price_range: "",
        popularity_sort_value: "",
        is_take_pre_order: "",
        is_veg: "",
        is_popular: "",
        commission: undefined,
        minimum_order_value: undefined,
        delivery_time: undefined,
        email: ""

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
    //get all cusine data
    // let cusineData = undefined;
    // if (props.get_all_cusine_data?.length > 0) {
    //     cusineData = props.get_all_cusine_data?.map((item, key) => (
    //         <option key={item._id} value={item._id}>
    //             {item.name}
    //         </option>
    //     ));
    // }

    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const handleSelectCuisine = (e) => {
        console.log(e)
        setSelectedCuisine(e)
    }
    let cusineData = undefined;
    if (props.get_all_cusine_data?.length > 0) {
        cusineData = props.get_all_cusine_data?.map((item, key) => ({
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
    const handleSort = (e) => {
        alert("Hello")
    }
    useEffect(() => {
        if (props.get_all_restaurant_loading == false) {
            props.getAllRestaurantAction();
        }

        if (props.get_all_user_roles_loading === false) {
            props.getAllUsersRolesAction();
        }

        if (props.get_all_cusine_loading === false) {
            props.getAllCusineAction();
        }

    }, [props.get_all_restaurant_loading, props.get_all_user_roles_loading, props.get_all_cusine_loading]);

    console.log(props.get_all_restaurant_data);
    console.log(props.get_all_cusine_data);

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
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Add a New Branch </CardTitle>

                                    </div>
                                    {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-4" action="#" onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Branch Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="area" placeholder="Enter area name" name="area" onChange={handleInputs} value={zoneInfo.area ?? ""} />
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

                                {/* <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Zonal Admin
                                    </label>
                                    <div className="col-md-10">
                                        <Input
                                            id="exampleSelect"
                                            name="role"
                                            value={role}
                                            required={true}
                                            onChange={e => setRole(e.target.value)}
                                            type="select"
                                        >
                                            <option>Choose...</option>
                                            {userData}
                                        </Input>
                                    </div>
                                </Row> */}
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
                                                checked={zoneInfo.price_range == "high"}
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
                                                checked={zoneInfo.price_range == "medium"}
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
                                                checked={zoneInfo.price_range == "low"}
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
                                                checked={zoneInfo.popularity_sort_value === "1"}
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

                                                checked={zoneInfo.popularity_sort_value === "0"}
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
                                                id="is_take_pre_order"
                                                autoComplete="off"

                                                name="is_take_pre_order" onChange={handleInputs} value={true}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_take_pre_order"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_take_pre_order" onChange={handleInputs} value={false}
                                                id="is_take_pre_order1"
                                                autoComplete="off"
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_take_pre_order1"
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
                                                defaultChecked
                                                name="is_veg" onChange={handleInputs} value={true}
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
                                                name="is_veg" onChange={handleInputs} value={false}
                                                id="is_veg1"
                                                autoComplete="off"
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
                                                defaultChecked
                                                name="is_popular" onChange={handleInputs} value={true}
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
                                                name="is_popular" onChange={handleInputs} value={false}
                                                id="is_popular1"
                                                autoComplete="off"
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
                                        Commmission
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="city" placeholder="Enter commission amount" name="commission" value={zoneInfo.commission} onChange={handleInputs} />
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
                                        <input type="number" className="form-control" id="minimum_order_value" placeholder="Enter minimum order value" name="minimum_order_value" value={zoneInfo.minimum_order_value} onChange={handleInputs} />
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
                                        <input type="number" className="form-control" id="city" placeholder="Enter Delivery Time" name="delivery_time" value={zoneInfo.delivery_time} onChange={handleInputs} />
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
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} />
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
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Add Branch</button>
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

        get_all_cusine_data,
        get_all_cusine_loading,
    } = state.Restaurant;

    const {
        get_all_user_roles_data,
        get_all_user_roles_loading,

    } = state.registerNew;
    return {
        get_all_restaurant_data,
        get_all_restaurant_loading,

        get_all_cusine_data,
        get_all_cusine_loading,

        get_all_user_roles_data,
        get_all_user_roles_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getAllRestaurantAction,
        getAllUsersRolesAction,
        getAllCusineAction, branchAddAction
    })(
        GoogleApiWrapper({
            apiKey: "AIzaSyDJkREeL-PpO7Z45k-MsD5sJD_m1mzNGEk",
            LoadingContainer: LoadingContainer,
            v: "3",
        })(BranchAdd)
    )
);