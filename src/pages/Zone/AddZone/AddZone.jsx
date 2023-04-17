import React, { useState, useRef, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label, Container, Row, Col, Input } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Polygon } from "@react-google-maps/api";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import Select from "react-select";
import Breadcrumbs from 'components/Common/Breadcrumb';
import { getAllBranchAction, getAllCityAction, zoneAddAction, zoneEditAction, zoneAddFresh, zoneEditFresh } from 'store/actions';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const LoadingContainer = () => <div>Loading...</div>;

function AddZone(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultProps, setDefaultProps] = useState({
        lat: 23.8103,
        lng: 90.4125,
    });
    console.log(location.state);

    const edit_map_data = location.state?.lat_long?.coordinates?.[0].map(x => ({
        // lat: x[0],
        // lng: x[1]
        lng: x[0],
        lat: x[1]
    }))
    console.log(edit_map_data);

    const [path, setPath] = useState(location.state ? edit_map_data : [
        { lng: 90.44133911132815, lat: 23.810299999999998, },
        { lng: 90.4334426879883, lat: 23.809985898058592, },
        { lng: 90.41764984130862, lat: 23.8209790138562, }
    ]);

    const polygonRef = useRef(null);
    const listenersRef = useRef([]);

    // Call setPath with new edited path
    const onEdit = useCallback(() => {
        console.log("I am in the edit section")
        if (polygonRef.current) {
            const nextPath = polygonRef.current
                .getPath()
                .getArray()
                .map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                });
            setPath(nextPath);
        }
    }, [setPath]);

    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(

        polygon => {
            console.log("I am on load");
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        },
        [onEdit]
    );

    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    console.log("The path state is", path);

    const common_branches = props?.get_all_branch_data?.filter((elem) => location?.state?.branches?.find(({ branch_id }) => elem._id === branch_id));

    const branch_data_edit = common_branches ? common_branches?.map((item, key) => {
        return { label: item.name, value: item._id };
    }) : "";
    console.log(branch_data_edit);
    //select multiple branch
    const [selectedBranch, setSelectedBranch] = useState(branch_data_edit ? branch_data_edit : "");
    const handleSelectBranch = (e) => {
        console.log(e)
        setSelectedBranch(e)
    }

    let branchDate = undefined;
    if (props.get_all_branch_data?.length > 0) {
        branchDate = props.get_all_branch_data?.map((item, key) => ({
            label: item.name, value: item._id,
        }));

    }

    // get all city
    let cityData = undefined;
    if (props.get_all_city_data?.length > 0) {
        cityData = props.get_all_city_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }

    const onMapClickHandler = e => {
        console.log(e);

    };


    const [zoneInfo, setZoneInfo] = useState({
        area: location.state ? location.state.name : "",
        city: location.state ? location.state.city_id : "",
        radius: location.state ? location.state.radius : "",

    })


    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setZoneInfo({ ...zoneInfo, [name]: value })

    }

    const allData = path.map((item) => Number(item.lng) + "," + Number(item.lat));

    console.log(allData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(zoneInfo);
        console.log(path);
        console.log(deliveryCharge);
        console.log(selectedBranch);
        const uniqueId = uuidv4();
        props.zoneAddAction(uniqueId, zoneInfo, path, deliveryCharge, selectedBranch);

    }

    const handleSubmitForEdit = (e) => {
        e.preventDefault();
        console.log("======================I am in the edit form==================");
        console.log(zoneInfo);
        console.log(path);
        console.log(deliveryCharge);
        console.log(selectedBranch);
        const uniqueId = uuidv4();

        props.zoneEditAction(location.state._id, zoneInfo, path, deliveryCharge, selectedBranch);

    }

    const edit_zone_delivery_charge = location.state?.zone_delivery_charges?.map((item) => ({

        distanceStart: item.distance_start_in_kilometer, distanceEnd: item.distance_end_in_kilometer, deliveryCharge: item.delivery_charge
    }))

    console.log(edit_zone_delivery_charge);
    // Delivery charge functionality
    const deliveryChargeTemplate = { distanceStart: "", distanceEnd: "", deliveryCharge: "" }
    const [deliveryCharge, setDeliveryCHarge] = useState(location.state ? edit_zone_delivery_charge : [deliveryChargeTemplate]);
    const handleTimeChange = (e, index) => {
        console.log(index);
        const updatedValue = deliveryCharge.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
        setDeliveryCHarge(updatedValue)

    }
    const handleRowDelete = (index) => {
        const filteredTime = [...deliveryCharge];
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1);
            setDeliveryCHarge(filteredTime)
        }

    }
    console.log("deliveryCharge array" + deliveryCharge);

    function handleAddRowNested() {
        setDeliveryCHarge([...deliveryCharge, deliveryChargeTemplate]);
    }
    console.log(props.add_zone_loading);
    console.log(deliveryCharge);
    useEffect(() => {
        if (props.get_all_branch_loading == false) {
            props.getAllBranchAction();
        }

        if (props.get_all_city_loading == false) {
            props.getAllCityAction();
        }

        if (props.add_zone_loading == "Success") {
            navigate("/zone");
            props.zoneAddFresh();
        }

        if (props.edit_zone_loading == "Success") {
            navigate("/zone");
            props.zoneEditFresh();
        }

    }, [props.get_all_branch_loading, props.get_all_city_loading, props.add_zone_loading, props.edit_zone_loading]);

    console.log(props.get_all_branch_data);
    console.log(props.get_all_city_data);

    return (
        <>
            <React.Fragment>

                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs maintitle="Foodi" title="Zone" breadcrumbItem={location.state ? "Edit Zone" : "Add Zone"} />

                        <Row>
                            <Col className="col-12">
                                <Card style={{ border: "none" }}>
                                    <CardBody>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                            <CardTitle className="h4" style={{ color: "#FFFFFF" }}>{location.state ? "Edit Zone" : "Add a New Zone"} </CardTitle>

                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-10 mx-auto">
                                <form className="mt-4" action="#" onSubmit={location.state ? handleSubmitForEdit : handleSubmit}>

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Area Name
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
                                            City
                                        </label>
                                        <div className="col-md-10">
                                            <Input
                                                id="exampleSelect"
                                                name="city"
                                                value={zoneInfo.city}
                                                //required={true}
                                                onChange={handleInputs}
                                                type="select"
                                            >
                                                <option>Choose...</option>
                                                {cityData}
                                            </Input>
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Radius (Km)
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="radius" placeholder="Enter area name" name="radius" onChange={handleInputs} value={zoneInfo.radius ?? ""} />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Branches
                                        </label>
                                        <div className="col-md-10">
                                            <Select
                                                value={selectedBranch}
                                                onChange={handleSelectBranch}
                                                options={branchDate}
                                                isMulti={true}
                                            />

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
                                            <textarea className="form-control" id="location" name="location" value={allData} readOnly />
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
                                                    <Polygon
                                                        // Make the Polygon editable / draggable
                                                        editable
                                                        draggable
                                                        path={path}

                                                        // Event used when manipulating and adding points
                                                        onMouseUp={onEdit}
                                                        // Event used when dragging the whole Polygon
                                                        onDragEnd={onEdit}
                                                        onLoad={onLoad}
                                                        onUnmount={onUnmount}
                                                    />
                                                </Map>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    {/* <div className="mb-3">
                                        <label className="form-label" htmlFor="location">Zone Delevery Charges</label>
                                        <input type="text" className="form-control" id="location" name="delivery_charge" value={state2.location} />
                                    </div> */}

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Delivery Charges
                                        </label>
                                        {/* <div className="col-md-10">
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} />
                                    </div> */}
                                    </Row>
                                    {/* ==================restaurant time================= */}

                                    {deliveryCharge.map((row, idx) => (
                                        <React.Fragment key={idx}>
                                            <div data-repeater-list="group-a" id={"addr" + idx}>
                                                <div data-repeater-item className="row">

                                                    <div className="mb-3 col-lg-3">
                                                        <label className="form-label" htmlFor="startTime">Distance Start(km)</label>
                                                        <input type="number" id="startTime" className="form-control" name="distanceStart" placeholder="Distance start" value={row.distanceStart} onChange={(e) => handleTimeChange(e, idx)} />
                                                    </div>

                                                    <div className="mb-3 col-lg-3">
                                                        <label className="form-label" htmlFor="subject">Distance End(km)</label>
                                                        <input type="number" id="subject" className="form-control" name="distanceEnd" placeholder="Distance end" value={row.distanceEnd} onChange={(e) => handleTimeChange(e, idx)} />
                                                    </div>

                                                    <div className="mb-3 col-lg-3">
                                                        <label className="form-label" htmlFor="startTime">Delivery Charge</label>
                                                        <input type="number" id="startTime" className="form-control" name="deliveryCharge" placeholder="Delivery charge" value={row.deliveryCharge} onChange={(e) => handleTimeChange(e, idx)} />
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
                                            <button className="btn btn-primary w-md waves-effect waves-light" type="submit">{location.state ? "Edit Zone" : "Add Zone"}</button>
                                        </div>
                                    </div>



                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>

        </>
    );
}


const mapStateToProps = state => {
    const {

        get_all_branch_loading,
        get_all_branch_data,
        add_zone_loading,
        edit_zone_loading

    } = state.Restaurant;

    const {
        get_all_city_data,
        get_all_city_error,
        get_all_city_loading,
    } = state.zoneCity;
    return {
        get_all_branch_loading,
        get_all_branch_data,
        edit_zone_loading,

        get_all_city_data,
        get_all_city_error,
        get_all_city_loading,
        add_zone_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getAllBranchAction,
        getAllCityAction,
        zoneAddAction,
        zoneEditAction,
        zoneAddFresh,
        zoneEditFresh
    })(
        GoogleApiWrapper({
            apiKey: "AIzaSyDJkREeL-PpO7Z45k-MsD5sJD_m1mzNGEk",
            LoadingContainer: LoadingContainer,
            v: "3",
        })(AddZone)
    )
);
