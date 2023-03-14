import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import Select from "react-select";

const LoadingContainer = () => <div>Loading...</div>;

function AddZoneModal(props) {
    const [modal, setModal] = useState(false);
    const [defaultProps, setDefaultProps] = useState({
        lat: 23.8103,
        lng: 90.4125,
    });

    const [state2, setState2] = useState({
        location: undefined,
    });
    const [selectedGroup, setselectedGroup] = useState(null);

    const toggle = () => setModal(!modal);
    console.log("I am here")
    const value0 = "<=3km";
    const value1 = "<=5km";
    const value2 = "<=8km";
    const selectedPlace = {};
    const onMarkerClick = e => {
        console.log(e.google.maps.LatLng());
    };

    const onMapClickHandler = e => {
        console.log(e);
        // let latitude = e.latLng.lat()
        // let longtitude = e.latLng.lat()
        // console.log(latitude, longtitude)
    };

    const moveMarker = (props, marker, e) => {
        console.log(e.latLng.lat())
        console.log(e.latLng.lng())
        setDefaultProps({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setState2({
            ...state2,
            location: e.latLng.lat() + "," + e.latLng.lng(),
        });
    };
    const [zoneInfo, setZoneInfo] = useState({
        area: undefined,
        restaurant: undefined,
        city: "Dhaka",
        radius: undefined,
        delivery_charge_1: undefined,
        delivery_charge_2: undefined,
        delivery_charge_3: undefined,
        location: undefined

    })
    console.log(state2.location)
    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }
    const optionGroup = [
        {

            options: [
                { label: "Dhaka", value: "Dhaka" },
                { label: "Chittagong", value: "Chittagong" }
            ]
        }
    ];
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setZoneInfo({ ...zoneInfo, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(zoneInfo);
        console.log(state2.location)
    }

    return (
        <div>
            <Button
                color="primary"
                className="btn btn-primary btn-md waves-effect waves-light"
                onClick={toggle}
            >
                <i className="fas fa-folder-plus"></i>{" "}
                Add Zone
            </Button>{" "}
            <Modal isOpen={modal} toggle={toggle} centered backdrop={true} size="lg">
                <ModalHeader toggle={toggle}>Add Zone</ModalHeader>
                <ModalBody>
                    <form className="mt-4" action="#" onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="area">Area Name</label>
                            <input type="text" className="form-control" id="area" placeholder="Enter area name" name="area" required onChange={handleInputs} value={zoneInfo.area} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="restaurant">Restaurant</label>
                            <input type="text" className="form-control" id="restaurant" placeholder="Enter restaurant name" name="restaurant" required onChange={handleInputs} value={zoneInfo.restaurant} />
                        </div>

                        {/* <div className="mb-3">
                            <Label>City</Label>
                            <Select
                                value={selectedGroup}
                                onChange={() => {
                                    handleSelectGroup();
                                }}
                                options={optionGroup}
                                classNamePrefix="select2-selection"
                            />
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" placeholder="Enter city" name="city" required value={zoneInfo.city} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="radius">Radius (Km)</label>
                            <input type="number" className="form-control" id="radius" placeholder="Enter radius" name="radius" required onChange={handleInputs} value={zoneInfo.radius} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="delivery_charge_1">Delivery Charge({value0})</label>
                            <input type="number" className="form-control" id="delivery_charge_1" placeholder="Enter Delivery Charge" name="delivery_charge_1" required onChange={handleInputs} value={zoneInfo.delivery_charge_1} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="delivery_charge_2">Delivery Charge({value1})</label>
                            <input type="number" className="form-control" id="delivery_charge_2" placeholder="Enter Delivery Charge" name="delivery_charge_2" required onChange={handleInputs} value={zoneInfo.delivery_charge_2} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="delivery_charge_3">Delivery Charge({value2})</label>
                            <input type="number" className="form-control" id="delivery_charge_3" placeholder="Enter Delivery Charge" name="delivery_charge_3" required onChange={handleInputs} value={zoneInfo.delivery_charge_3} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="location">Location</label>
                            <input type="text" className="form-control" id="location" name="location" value={state2.location} />
                        </div>

                        <Card>
                            <CardBody>
                                {/* <CardTitle className="h4">Markers</CardTitle>
                                <CardSubtitle className="mb-3">
                                    Example of google maps.
                                </CardSubtitle> */}
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

                        <div className="mb-3 row">
                            <div className="col-12 text-end">
                                <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Add Zone</button>
                            </div>
                        </div>



                    </form>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter> */}
            </Modal>
        </div>
    );
}

//export default AddZoneModal;

const mapStateToProps = () => {
    // const {

    // } = gstate.property;
    // return {

    // };
};

export default withRouter(
    connect(mapStateToProps, {

    })(
        GoogleApiWrapper({
            apiKey: "AIzaSyDJkREeL-PpO7Z45k-MsD5sJD_m1mzNGEk",
            LoadingContainer: LoadingContainer,
            v: "3",
        })(AddZoneModal)
    )
);
