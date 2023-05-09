import React, { useState, useRef } from "react"
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    Input,
} from "reactstrap"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
    getAllCityAction,
    getAllVehicleTypeAction,
    getAllZoneAction,
    addRiderAction,
    addRiderFresh,
    riderEditAction,
    riderEditFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AddRider(props) {
    const navigate = useNavigate()
    const location = useLocation()

    document.title = location.state ? 'Edit Rider | Foodi' : 'Add Rider | Foodi'

    const [images, setImages] = useState({
        image: location.state ? location.state.image : "",
    })
    const [nidFront, setNidFront] = useState({
        nid_front: location.state ? location.state.nid_front : "",
    })
    const [nidBack, setNidBack] = useState({
        nid_back: location.state ? location.state.nid_back : "",
    })
    const [referNidFront, setReferNidFront] = useState({
        referer_nid_front: location.state ? location.state.referer_nid_front : "",
    })
    const [referNidBack, setReferNidBack] = useState({
        referer_nid_back: location.state ? location.state.referer_nid_back : "",
    })
    const [guardianNidFront, setGuardianNidFront] = useState({
        guardian_nid_front: location.state ? location.state.guardian_nid_front : "",
    })
    const [guardianNidBack, setGuardianNidBack] = useState({
        guardian_nid_back: location.state ? location.state.guardian_nid_back : "",
    })
    const [electricityBill, setElectricityBill] = useState({
        electricity_bill: location.state ? location.state.electricity_bill : "",
    })
    const [houseNameplate, setHouseNameplate] = useState({
        house_nameplate: location.state ? location.state.house_nameplate : "",
    })


    const [RiderInfo, setRiderInfo] = useState({
        first_name: location.state ? location.state.first_name : "",
        last_name: location.state ? location.state.last_name : "",
        mobile_number: location.state ? location.state.mobile_number : "",
        mac: location.state ? location.state.mac : "",
        imei: location.state ? location.state.imei : "",
        bkash_no: location.state ? location.state.bkash_no : "",
        nagad_no: location.state ? location.state.nagad_no : "",

        password: location.state ? location.state.password : "",
        confirm_password: location.state ? location.state.confirm_password : "",

        present_address: location.state ? location.state.present_address : "",
        permanent_address: location.state ? location.state.permanent_address : "",

        vehicle_type_id: location.state ? location.state.vehicle_type_id : "",
        city_id: location.state ? location.state.city_id : "",
        // zone: location.state ? location.state.zone : "",

        image: location.state ? location.state.image : "",
        nid_front: location.state ? location.state.nid_front : "",
        nid_back: location.state ? location.state.nid_back : "",
        referer_nid_front: location.state ? location.state.referer_nid_front : "",
        referer_nid_back: location.state ? location.state.referer_nid_back : "",
        guardian_nid_front: location.state ? location.state.guardian_nid_front : "",
        guardian_nid_back: location.state ? location.state.guardian_nid_back : "",
        electricity_bill: location.state ? location.state.electricity_bill : "",
        house_nameplate: location.state ? location.state.house_nameplate : "",

        is_active: location.state ? location.state.is_active : true,
    })


    let cities = [];
    if (props.get_all_city_data?.length > 0) {
        cities = props.get_all_city_data;
    }

    let vehicleTypes = [];
    if (props.get_all_vehicle_type_data?.length > 0) {
        vehicleTypes = props.get_all_vehicle_type_data;
    }

    const common_zones = props?.get_all_zone_data?.filter((elem) => location?.state?.zones?.find(({ zone_id }) => elem._id === zone_id));

    const zone_data_edit = common_zones ? common_zones?.map((item, key) => {
        return { label: item.name, value: item._id };
    }) : "";

    //select multiple zone
    const [selectedZone, setSelectedZone] = useState(zone_data_edit ? zone_data_edit : "");
    const handleSelectZone = (e) => {

        setSelectedZone(e)
    }

    let zoneData = undefined;
    if (props.get_all_zone_data?.length > 0) {
        zoneData = props.get_all_zone_data?.map((item, key) => ({
            label: item.name, value: item._id,
        }));

    }


    let name, value, checked
    const handleInputs = e => {
        name = e.target.name
        value = e.target.value
        setRiderInfo({ ...RiderInfo, [name]: value })
    }

    const handleFiles = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader = new FileReader()

        reader.onload = () => {
            setImages({ ...images, [name]: reader.result })
        }

        reader.readAsDataURL(value)
    }

    const handleNidFront = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader1 = new FileReader()

        reader1.onload = () => {
            setNidFront({ ...nidFront, [name]: reader1.result })
        }

        reader1.readAsDataURL(value)
    }

    const handleNidBack = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader2 = new FileReader()

        reader2.onload = () => {
            setNidBack({ ...nidBack, [name]: reader2.result })
        }

        reader2.readAsDataURL(value)
    }

    const handleReferNidFront = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader3 = new FileReader()

        reader3.onload = () => {
            setReferNidFront({ ...referNidFront, [name]: reader3.result })
        }

        reader3.readAsDataURL(value)
    }

    const handleReferNidBack = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader4 = new FileReader()

        reader4.onload = () => {
            setReferNidBack({ ...referNidBack, [name]: reader4.result })
        }

        reader4.readAsDataURL(value)
    }

    const handleGuardianNidFront = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader5 = new FileReader()

        reader5.onload = () => {
            setGuardianNidFront({ ...guardianNidFront, [name]: reader5.result })
        }

        reader5.readAsDataURL(value)
    }

    const handleGuardianNidBack = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader6 = new FileReader()

        reader6.onload = () => {
            setGuardianNidBack({ ...guardianNidBack, [name]: reader6.result })
        }

        reader6.readAsDataURL(value)
    }

    const handleElectricityBill = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader7 = new FileReader()

        reader7.onload = () => {
            setElectricityBill({ ...electricityBill, [name]: reader7.result })
        }

        reader7.readAsDataURL(value)
    }

    const handleHouseNameplate = e => {
        name = e.target.name
        value = e.target.files[0]
        setRiderInfo({ ...RiderInfo, [name]: value })
        const reader8 = new FileReader()

        reader8.onload = () => {
            setHouseNameplate({ ...houseNameplate, [name]: reader8.result })
        }

        reader8.readAsDataURL(value)
    }



    const handleCheckBox = (e) => {

        name = e.target.name;
        checked = e.target.checked;
        setRiderInfo({ ...RiderInfo, [name]: checked })

    }

    const handleSubmit = e => {
        e.preventDefault()
        const uniqueId = uuidv4()

        props.addRiderAction(uniqueId, RiderInfo, selectedZone)
    }

    const handleSubmitForEdit = e => {
        e.preventDefault()

        props.riderEditAction(
            location.state._id,
            RiderInfo,
            selectedZone
        )
    }

    useEffect(() => {

        if (props.get_all_city_loading == false) {

            props.getAllCityAction();
        }
        if (props.get_all_zone_loading == false) {
            props.getAllZoneAction();
        }
        if (props.get_all_vehicle_type_loading == false) {
            props.getAllVehicleTypeAction();
        }


        if (props.add_rider_loading === "Success") {
            // redirect
            props.addRiderFresh()
            navigate("/riders")
        }

        if (props.rider_edit_loading === "Success") {
            toast.success("Rider edited Successfully")
            // redirect
            props.riderEditFresh()
            navigate("/riders")
        }
    }, [
        props.add_rider_loading,
        props.rider_edit_loading,
        props.get_all_city_loading,
        props.get_all_zone_loading,
        props.get_all_vehicle_type_loading,
    ])


    return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs
                            maintitle="Foodi"
                            title="Rider"
                            breadcrumbItem={
                                location.state ? "Edit Rider" : "Add Rider"
                            }
                        />

                        <Row>
                            <Col className="col-12">
                                <Card style={{ border: "none" }}>
                                    <CardBody>
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            marginBottom: "10px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px",
                                        }}
                                        >
                                            <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                                                {location.state
                                                    ? "Edit Rider"
                                                    : "Add Rider"}
                                            </CardTitle>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-10 mx-auto">
                                <form className="mt-4" action="#" onSubmit={location.state ? handleSubmitForEdit : handleSubmit} >
                                    <Row className="mb-3">
                                        <label htmlFor="first_name" className="col-md-2 col-form-label" > First Name
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="first_name" placeholder="Enter first name"
                                                name="first_name" onChange={handleInputs} value={RiderInfo.first_name ?? ""} required
                                            />
                                        </div>
                                    </Row>


                                    <Row className="mb-3">
                                        <label htmlFor="last_name" className="col-md-2 col-form-label" > Last Name
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="last_name" placeholder="Enter last name"
                                                name="last_name" onChange={handleInputs} value={RiderInfo.last_name ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="mobile_number" className="col-md-2 col-form-label" > Mobile Number
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="mobile_number" placeholder="Enter mobile name"
                                                name="mobile_number" onChange={handleInputs} value={RiderInfo.mobile_number ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="mac" className="col-md-2 col-form-label" > MAC Address
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="mac" placeholder="Enter MAC address"
                                                name="mac" onChange={handleInputs} value={RiderInfo.mac ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="imei" className="col-md-2 col-form-label" > IMEI No
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="imei" placeholder="Enter IMEI no"
                                                name="imei" onChange={handleInputs} value={RiderInfo.imei ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="bkash_no" className="col-md-2 col-form-label" > Bkash No
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="bkash_no" placeholder="Enter bkash no" name="bkash_no" onChange={handleInputs} value={RiderInfo.bkash_no ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="nagad_no" className="col-md-2 col-form-label" > Nagad No
                                        </label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" id="nagad_no" placeholder="Enter Nagad No"
                                                name="nagad_no" onChange={handleInputs} value={RiderInfo.nagad_no ?? ""} required
                                            />
                                        </div>
                                    </Row>


                                    <Row className="mb-3">
                                        <label htmlFor="password" className="col-md-2 col-form-label" > Password
                                        </label>
                                        <div className="col-md-10">
                                            <input type="password" className="form-control" id="password" placeholder="Enter Password"
                                                name="password" onChange={handleInputs} value={RiderInfo.password ?? ""} required
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="confirm_password" className="col-md-2 col-form-label" > Confirm Password
                                        </label>
                                        <div className="col-md-10">
                                            <input type="password" className="form-control" id="confirm_password" placeholder="Confirm Password"
                                                name="confirm_password" onChange={handleInputs} value={RiderInfo.confirm_password ?? ""} required
                                            />
                                        </div>
                                    </Row>


                                    <Row className="mb-3">
                                        <label htmlFor="present_address" className="col-md-2 col-form-label" > Present Address
                                        </label>
                                        <div className="col-md-10">
                                            <textarea className="form-control" id="present_address"
                                                placeholder="Enter Present Address" name="present_address" onChange={handleInputs} value={RiderInfo.present_address ?? ""} required></textarea>

                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="permanent_address" className="col-md-2 col-form-label" > Permanent Address
                                        </label>
                                        <div className="col-md-10">
                                            <textarea className="form-control" id="permanent_address"
                                                placeholder="Enter Permanent Address" name="permanent_address" onChange={handleInputs} value={RiderInfo.permanent_address ?? ""} required></textarea>

                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="vehicle_type_id" className="col-md-2 col-form-label" > Vehicle Type </label>
                                        <div className="col-md-10">


                                            <Input id="vehicle_type_id" name="vehicle_type_id" className="form-control" placeholder="select vehicle type" value={RiderInfo.vehicle_type_id} onChange={handleInputs} type="select" >
                                                <option>Choose...</option>
                                                {
                                                    vehicleTypes.map(vehicleType => <option key={vehicleType._id} value={vehicleType._id}>{vehicleType.type}</option>)
                                                }
                                            </Input>


                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="city_id" className="col-md-2 col-form-label" > City </label>
                                        <div className="col-md-10">


                                            <Input id="city_id" name="city_id" className="form-control" placeholder="select city" value={RiderInfo.city_id} onChange={handleInputs} type="select" >
                                                <option>Choose...</option>
                                                {
                                                    cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)
                                                }


                                            </Input>
                                        </div>
                                    </Row>



                                    <Row className="mb-3">
                                        <label htmlFor="example-text-input" className="col-md-2 col-form-label" > Zone </label>
                                        <div className="col-md-10">
                                            <Select value={selectedZone} onChange={handleSelectZone} options={zoneData} isMulti={true} />

                                        </div>
                                    </Row>

                                    <Row className="mb-3">
                                        <label htmlFor="image" className="col-md-2 col-form-label">Image</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                name="image"
                                                onChange={handleFiles}
                                            />
                                        </div>
                                    </Row>

                                    {images?.image && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={images.image}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="nid_front" className="col-md-2 col-form-label">NID Front</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="nid_front"
                                                name="nid_front"
                                                onChange={handleNidFront}
                                            />
                                        </div>
                                    </Row>

                                    {nidFront?.nid_front && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={nidFront.nid_front}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="nid_back" className="col-md-2 col-form-label">NID Back</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="nid_back"
                                                name="nid_back"
                                                onChange={handleNidBack}
                                            />
                                        </div>
                                    </Row>

                                    {nidBack?.nid_back && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={nidBack.nid_back}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="referer_nid_front" className="col-md-2 col-form-label">Refer NID Front</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="referer_nid_front"
                                                name="referer_nid_front"
                                                onChange={handleReferNidFront}
                                            />
                                        </div>
                                    </Row>

                                    {referNidFront?.referer_nid_front && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={referNidFront.referer_nid_front}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="referer_nid_back" className="col-md-2 col-form-label">Refer NID Back</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="referer_nid_back"
                                                name="referer_nid_back"
                                                onChange={handleReferNidBack}
                                            />
                                        </div>
                                    </Row>

                                    {referNidBack?.referer_nid_back && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={referNidBack.referer_nid_back}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}


                                    <Row className="mb-3">
                                        <label htmlFor="guardian_nid_front" className="col-md-2 col-form-label">Guardian NID Front</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="guardian_nid_front"
                                                name="guardian_nid_front"
                                                onChange={handleGuardianNidFront}
                                            />
                                        </div>
                                    </Row>

                                    {guardianNidFront?.guardian_nid_front && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={guardianNidFront.guardian_nid_front}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="guardian_nid_back" className="col-md-2 col-form-label">Guardian NID Back</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="guardian_nid_back"
                                                name="guardian_nid_back"
                                                onChange={handleGuardianNidBack}
                                            />
                                        </div>
                                    </Row>

                                    {guardianNidBack?.guardian_nid_back && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={guardianNidBack.guardian_nid_back}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="electricity_bill" className="col-md-2 col-form-label">Electricity Bill</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="electricity_bill"
                                                name="electricity_bill"
                                                onChange={handleElectricityBill}
                                            />
                                        </div>
                                    </Row>

                                    {electricityBill?.electricity_bill && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={electricityBill.electricity_bill}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}

                                    <Row className="mb-3">
                                        <label htmlFor="house_nameplate" className="col-md-2 col-form-label">House Nameplate</label>
                                        <div className="col-md-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="house_nameplate"
                                                name="house_nameplate"
                                                onChange={handleHouseNameplate}
                                            />
                                        </div>
                                    </Row>

                                    {houseNameplate?.house_nameplate && (
                                        <Row className="mb-3">
                                            <label className="col-md-2">
                                                <span></span>
                                            </label>
                                            <div className="col-md-10">
                                                <img
                                                    src={houseNameplate.house_nameplate}
                                                    alt="preview"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                        </Row>
                                    )}


                                    <div className="mb-3 row">
                                        <div className="col-12 text-end">
                                            <button
                                                className="btn btn-primary w-md waves-effect waves-light"
                                                type="submit"
                                            >
                                                {location.state
                                                    ? "Edit Rider"
                                                    : "Add Rider"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        </>
    )
}


const mapStateToProps = state => {


    const {

        get_all_city_loading,
        get_all_city_data,

    } = state.zoneCity;

    const {

        get_all_zone_loading,
        get_all_zone_data,

    } = state.Restaurant;

    const {
        get_all_vehicle_type_loading,
        get_all_vehicle_type_data,

    } = state.VehicleType;
    const { add_rider_loading, rider_edit_loading } =
        state.Rider
    return {

        add_rider_loading,
        rider_edit_loading,
        get_all_city_loading,
        get_all_city_data,
        get_all_zone_loading,
        get_all_zone_data,
        get_all_vehicle_type_loading,
        get_all_vehicle_type_data,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getAllCityAction,
        getAllVehicleTypeAction,
        getAllZoneAction,
        addRiderAction,
        addRiderFresh,
        riderEditAction,
        riderEditFresh,
    })(AddRider)
)
