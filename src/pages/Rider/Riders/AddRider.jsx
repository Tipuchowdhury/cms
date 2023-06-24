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
  getZoneByCityIdAction,
  getZoneByCityIdFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment"

function AddRider(props) {
  const navigate = useNavigate()
  const location = useLocation()

  document.title = "Add Rider | Foodi"

  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const [drivingLicenseImage, setDrivingLicenseImage] = useState({
    driving_license_image: location.state
      ? location.state.driving_license_image
      : "",
  })

  const [vehicleRegistrationImage, setVehicleRegistrationImage] = useState({
    vehicle_registration_image: location.state
      ? location.state.vehicle_registration_image
      : "",
  })

  const [RiderInfo, setRiderInfo] = useState({
    first_name: location.state ? location.state.first_name : "",
    last_name: location.state ? location.state.last_name : "",
    mobile_number: location.state ? location.state.mobile_number : "",
    email: location.state ? location.state.email : "",
    mac: location.state ? location.state.mac : "",
    imei: location.state ? location.state.imei : "",
    bkash_no: location.state ? location.state.bkash_no : "",
    nagad_no: location.state ? location.state.nagad_no : "",
    nid_no: location.state ? location.state.nid_no : "",
    driving_license_id: location.state ? location.state.driving_license_id : "",
    vehicle_registration_id: location.state
      ? location.state.vehicle_registration_id
      : "",
    birth_date: location.state ? location.state.birth_date : "",
    joining_date: location.state ? location.state.joining_date : "",
    active_contract_date: location.state
      ? location.state.active_contract_date
      : "",

    otp: location.state ? location.state.otp : 0,
    otp_expire_time: location.state
      ? location.state.otp_expire_time
      : "2023-05-15T07:19:23.9515226",

    password: "",
    confirm_password: "",

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
    device_id: location.state ? location.state.device_id : "",

    driving_license_image: location.state
      ? location.state.driving_license_image
      : "",
    vehicle_registration_image: location.state
      ? location.state.vehicle_registration_image
      : "",

    is_active: location.state ? location.state.is_active : true,
    is_new: location.state ? location.state.is_new : true,
    is_verified: location.state ? location.state.is_verified : true,
    is_approve: location.state ? location.state.is_approve : false,
  })

  let vehicleTypes = []
  if (props.get_all_vehicle_type_data?.length > 0) {
    vehicleTypes = props.get_all_vehicle_type_data
  }

  const common_vehicles = props?.get_all_vehicle_type_data?.filter(
    elem => elem._id === location.state?.vehicle_type_id
  )

  const vehicle_data_edit = common_vehicles
    ? common_vehicles?.map((item, key) => {
        return {
          label: item.type,
          value: item._id,
        }
      })
    : ""
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicle_data_edit ? vehicle_data_edit : ""
  )

  useEffect(() => {
    if (props.get_all_vehicle_type_loading === "Success")
      setSelectedVehicle(vehicle_data_edit)
  }, [props.get_all_vehicle_type_loading])

  const handleSelectVehicle = e => {
    setRiderInfo({ ...RiderInfo, vehicle_type_id: e.value })
    setSelectedVehicle(e)
  }

  let vehicleData = undefined
  if (props.get_all_vehicle_type_data?.length > 0) {
    vehicleData = props.get_all_vehicle_type_data?.map((item, key) => ({
      label: item.type,
      value: item._id,
    }))
  }

  const common_cities = props?.get_all_city_data?.filter(
    elem => elem._id === location.state?.city_id
  )

  const city_data_edit = common_cities
    ? common_cities?.map((item, key) => {
        return {
          label: item.name,
          value: item._id,
        }
      })
    : ""
  const [selectedCity, setSelectedCity] = useState(
    city_data_edit ? city_data_edit : ""
  )

  useEffect(() => {
    if (props.get_all_city_loading === "Success")
      setSelectedCity(city_data_edit)
  }, [props.get_all_city_loading])

  const handleSelectCity = e => {
    // console.log(e.value)
    setIsLoading(true)
    setRiderInfo({ ...RiderInfo, city_id: e.value })
    setSelectedCity(e)
    setSelectedZone([])
    props.getZoneByCityIdAction(e.value)
  }

  let cityData = undefined
  if (props.get_all_city_data?.length > 0) {
    cityData = props.get_all_city_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const common_zones = props?.get_zone_by_city_id_data?.filter(elem =>
    location?.state?.zones?.find(({ zone_id }) => elem._id === zone_id)
  )

  const zone_data_edit = common_zones
    ? common_zones?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""

  //select multiple zone
  const [selectedZone, setSelectedZone] = useState(
    zone_data_edit ? zone_data_edit : ""
  )

  // useEffect(() => {
  //   if (props.get_all_zone_loading === "Success")
  //     setSelectedZone(zone_data_edit)
  // }, [props.get_all_zone_loading])

  useEffect(() => {
    props.getZoneByCityIdFresh()
    props.getZoneByCityIdAction(RiderInfo.city_id)
  }, [RiderInfo.city_id])

  useEffect(() => {
    if (props.get_zone_by_city_id_loading === "Success") {
      setSelectedZone(zone_data_edit)
      setIsLoading(false)
    }
  }, [props.get_zone_by_city_id_loading])

  const handleSelectZone = e => {
    setSelectedZone(e)
  }

  // let zoneData = undefined
  // if (props.get_all_zone_data?.length > 0) {
  //   zoneData = props.get_all_zone_data?.map((item, key) => ({
  //     label: item.name,
  //     value: item._id,
  //   }))
  // }

  let zoneData = undefined
  if (props.get_zone_by_city_id_data?.length > 0) {
    zoneData = props.get_zone_by_city_id_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
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

  const handleDrivingLicenseImage = e => {
    name = e.target.name
    value = e.target.files[0]
    setRiderInfo({ ...RiderInfo, [name]: value })
    const reader9 = new FileReader()

    reader9.onload = () => {
      setDrivingLicenseImage({ ...drivingLicenseImage, [name]: reader9.result })
    }

    reader9.readAsDataURL(value)
  }

  const handleVehicleRegistrationImage = e => {
    name = e.target.name
    value = e.target.files[0]
    setRiderInfo({ ...RiderInfo, [name]: value })
    const reader10 = new FileReader()

    reader10.onload = () => {
      setVehicleRegistrationImage({
        ...vehicleRegistrationImage,
        [name]: reader10.result,
      })
    }

    reader10.readAsDataURL(value)
  }

  const handleCheckBox = e => {
    name = e.target.name
    checked = e.target.checked
    setRiderInfo({ ...RiderInfo, [name]: checked })
  }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const uniqueId = uuidv4()

  //   props.addRiderAction(uniqueId, RiderInfo, selectedZone)
  // }

  const handleSubmit = e => {
    setSubmitDisabled(true)
    e.preventDefault()
    let status = 0
    if (RiderInfo.password !== RiderInfo.confirm_password) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Password and Confirm password are not matched")
    }

    if (RiderInfo.mobile_number.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Mobile number should be 11 digit")
    }

    if (isNaN(RiderInfo.mobile_number)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Mobile number should be numeric digit")
    }

    if (RiderInfo.bkash_no && RiderInfo.bkash_no.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Bkash number should be 11 digit")
    }

    if (RiderInfo.bkash_no && isNaN(RiderInfo.bkash_no)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Bkash number should be numeric digit")
    }

    if (RiderInfo.nagad_no && RiderInfo.nagad_no.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Nagad number should be 11 digit")
    }

    if (RiderInfo.nagad_no && isNaN(RiderInfo.nagad_no)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Nagad number should be numeric digit")
    }
    if (status == 0) {
      const uniqueId = uuidv4()
      props.addRiderAction(uniqueId, RiderInfo, selectedZone)
    }
  }

  const handleSubmitForEdit = e => {
    setSubmitDisabled(true)
    e.preventDefault()
    let status = 0
    if (RiderInfo.password !== RiderInfo.confirm_password) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Password and Confirm password are not matched")
    }

    if (RiderInfo.mobile_number.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Mobile number should be 11 digit")
    }

    if (isNaN(RiderInfo.mobile_number)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Mobile number should be numeric digit")
    }

    if (RiderInfo.bkash_no && RiderInfo.bkash_no.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Bkash number should be 11 digit")
    }

    if (RiderInfo.bkash_no && isNaN(RiderInfo.bkash_no)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Bkash number should be numeric digit")
    }

    if (RiderInfo.nagad_no && RiderInfo.nagad_no.length != 11) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Nagad number should be 11 digit")
    }

    if (RiderInfo.nagad_no && isNaN(RiderInfo.nagad_no)) {
      status = 1
      setSubmitDisabled(false)
      toast.error("Nagad number should be numeric digit")
    }

    if (status == 0) {
      props.riderEditAction(location.state._id, RiderInfo, selectedZone)
    }
  }

  useEffect(() => {
    if (props.get_all_city_loading == false) {
      props.getAllCityAction()
    }
    if (props.get_all_zone_loading == false) {
      props.getAllZoneAction()
    }

    if (props.get_zone_by_city_id_loading == false) {
      props.getZoneByCityIdAction(RiderInfo.city_id)
    }
    if (props.get_all_vehicle_type_loading == false) {
      props.getAllVehicleTypeAction()
    }

    if (props.add_rider_loading === "Success") {
      // redirect
      props.addRiderFresh()
      setSubmitDisabled(false)
      navigate("/riders")
    }

    if (props.add_rider_loading == "Failed") {
      // redirect
      props.addRiderFresh()
      setSubmitDisabled(false)
    }

    if (props.rider_edit_loading === "Success") {
      toast.success("Rider edited Successfully")
      // redirect
      props.riderEditFresh()
      setSubmitDisabled(false)
      navigate("/riders")
    }
  }, [
    props.add_rider_loading,
    props.rider_edit_loading,
    props.get_all_city_loading,
    props.get_all_zone_loading,
    props.get_zone_by_city_id_loading,
    props.get_all_vehicle_type_loading,
  ])

  //console.log(selectedZone);

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Rider"
              breadcrumbItem={location.state ? "Edit Rider" : "Add Rider"}
            />

            <Row>
              <Col className="col-12">
                <Card style={{ border: "none" }}>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        marginTop: "20px",
                        backgroundColor: "#1E417D",
                        padding: "15px",
                      }}
                    >
                      <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                        {location.state ? "Edit Rider" : "Add Rider"}
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form
                  className="mt-4"
                  action="#"
                  onSubmit={location.state ? handleSubmitForEdit : handleSubmit}
                >
                  <Row className="mb-3">
                    <label
                      htmlFor="first_name"
                      className="col-md-2 col-form-label"
                    >
                      First Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="Enter first name"
                        name="first_name"
                        onChange={handleInputs}
                        value={RiderInfo.first_name ?? ""}
                        required
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="last_name"
                      className="col-md-2 col-form-label"
                    >
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Enter last name"
                        name="last_name"
                        onChange={handleInputs}
                        value={RiderInfo.last_name ?? ""}
                        required
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="mobile_number"
                      className="col-md-2 col-form-label"
                    >
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile_number"
                        placeholder="Enter mobile name"
                        name="mobile_number"
                        onChange={handleInputs}
                        value={RiderInfo.mobile_number ?? ""}
                        required
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label htmlFor="email" className="col-md-2 col-form-label">
                      {" "}
                      Email
                    </label>
                    <div className="col-md-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleInputs}
                        value={RiderInfo.email ?? ""}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="birth_date"
                      className="col-md-2 col-form-label"
                    >
                      Birth Date <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        required
                        type="date"
                        className="form-control"
                        id="birth_date"
                        placeholder="Enter Birth Date"
                        name="birth_date"
                        onChange={handleInputs}
                        value={moment(RiderInfo.birth_date ?? "").format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label htmlFor="image" className="col-md-2 col-form-label">
                      Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label htmlFor="nid_no" className="col-md-2 col-form-label">
                      {" "}
                      NID No <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="nid_no"
                        placeholder="Enter NID No"
                        name="nid_no"
                        onChange={handleInputs}
                        value={RiderInfo.nid_no ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="nid_front"
                      className="col-md-2 col-form-label"
                    >
                      NID Front <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        id="nid_front"
                        name="nid_front"
                        onChange={handleNidFront}
                        required={location.state?.nid_front ? false : true}
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
                    <label
                      htmlFor="nid_back"
                      className="col-md-2 col-form-label"
                    >
                      NID Back <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        id="nid_back"
                        name="nid_back"
                        onChange={handleNidBack}
                        required={location.state?.nid_back ? false : true}
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
                    <label htmlFor="mac" className="col-md-2 col-form-label">
                      {" "}
                      MAC Address
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="mac"
                        placeholder="Enter MAC address"
                        name="mac"
                        onChange={handleInputs}
                        value={RiderInfo.mac ?? ""}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label htmlFor="imei" className="col-md-2 col-form-label">
                      {" "}
                      IMEI No
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="imei"
                        placeholder="Enter IMEI no"
                        name="imei"
                        onChange={handleInputs}
                        value={RiderInfo.imei ?? ""}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="bkash_no"
                      className="col-md-2 col-form-label"
                    >
                      {" "}
                      Bkash No
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="bkash_no"
                        placeholder="Enter bkash no"
                        name="bkash_no"
                        onChange={handleInputs}
                        value={RiderInfo.bkash_no ?? ""}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="nagad_no"
                      className="col-md-2 col-form-label"
                    >
                      {" "}
                      Nagad No
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="nagad_no"
                        placeholder="Enter Nagad No"
                        name="nagad_no"
                        onChange={handleInputs}
                        value={RiderInfo.nagad_no ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="driving_license_id"
                      className="col-md-2 col-form-label"
                    >
                      Driving License ID
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="driving_license_id"
                        placeholder="Enter Driving License ID"
                        name="driving_license_id"
                        onChange={handleInputs}
                        value={RiderInfo.driving_license_id ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="driving_license_image"
                      className="col-md-2 col-form-label"
                    >
                      Driving License Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        id="driving_license_image"
                        name="driving_license_image"
                        onChange={handleDrivingLicenseImage}
                      />
                    </div>
                  </Row>
                  {drivingLicenseImage?.driving_license_image && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={drivingLicenseImage.driving_license_image}
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}
                  <Row className="mb-3">
                    <label
                      htmlFor="vehicle_registration_id"
                      className="col-md-2 col-form-label"
                    >
                      {" "}
                      Vehicle Registration ID
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="vehicle_registration_id"
                        placeholder="Enter Vehicle Registration ID"
                        name="vehicle_registration_id"
                        onChange={handleInputs}
                        value={RiderInfo.vehicle_registration_id ?? ""}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="vehicle_registration_image"
                      className="col-md-2 col-form-label"
                    >
                      Vehicle Registration Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        id="vehicle_registration_image"
                        name="vehicle_registration_image"
                        onChange={handleVehicleRegistrationImage}
                      />
                    </div>
                  </Row>
                  {vehicleRegistrationImage?.vehicle_registration_image && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={
                            vehicleRegistrationImage.vehicle_registration_image
                          }
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="joining_date"
                      className="col-md-2 col-form-label"
                    >
                      Joining Date
                    </label>
                    <div className="col-md-10">
                      <input
                        type="date"
                        className="form-control"
                        id="joining_date"
                        placeholder="Enter Joining Date"
                        name="joining_date"
                        onChange={handleInputs}
                        value={moment(RiderInfo.joining_date ?? "").format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="active_contract_date"
                      className="col-md-2 col-form-label"
                    >
                      Active Contract Date
                    </label>
                    <div className="col-md-10">
                      <input
                        type="date"
                        className="form-control"
                        id="active_contract_date"
                        placeholder="Enter Active Contract Date"
                        name="active_contract_date"
                        onChange={handleInputs}
                        value={moment(
                          RiderInfo.active_contract_date ?? ""
                        ).format("YYYY-MM-DD")}
                      />
                    </div>
                  </Row>
                  {/*  active_contract_date */}
                  <Row className="mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-2 col-form-label"
                    >
                      {" "}
                      Password{" "}
                      {location.state ? (
                        ""
                      ) : (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <div className="col-md-10">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleInputs}
                        value={RiderInfo.password ?? ""}
                        required={location.state ? false : true}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="confirm_password"
                      className="col-md-2 col-form-label"
                    >
                      Confirm Password{" "}
                      {location.state ? (
                        ""
                      ) : (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <div className="col-md-10">
                      <input
                        type="password"
                        className="form-control"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onChange={handleInputs}
                        value={RiderInfo.confirm_password ?? ""}
                        required={location.state ? false : true}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="present_address"
                      className="col-md-2 col-form-label"
                    >
                      Present Address <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="present_address"
                        placeholder="Enter Present Address"
                        name="present_address"
                        onChange={handleInputs}
                        value={RiderInfo.present_address ?? ""}
                        required
                      ></textarea>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="permanent_address"
                      className="col-md-2 col-form-label"
                    >
                      {" "}
                      Permanent Address
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="permanent_address"
                        placeholder="Enter Permanent Address"
                        name="permanent_address"
                        onChange={handleInputs}
                        value={RiderInfo.permanent_address ?? ""}
                      ></textarea>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="vehicle_type_id"
                      className="col-md-2 col-form-label"
                    >
                      Vehicle Type <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        required
                        value={selectedVehicle}
                        onChange={handleSelectVehicle}
                        options={vehicleData}
                        isMulti={false}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="city_id"
                      className="col-md-2 col-form-label"
                    >
                      City <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        required
                        value={selectedCity}
                        onChange={handleSelectCity}
                        options={cityData}
                        isMulti={false}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Zone <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        required
                        isLoading={isLoading}
                        value={selectedZone}
                        onChange={handleSelectZone}
                        options={zoneData}
                        isMulti={true}
                      />
                    </div>
                  </Row>

                  {location.state ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="referrer_url"
                        className="col-md-2 col-form-label"
                      >
                        Referrer URL
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          id="referrer_url"
                          placeholder="Referrer URL"
                          name="referrer_url"
                          disabled
                          // onChange={handleInputs}
                          value={location.state?.referrer_url}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="referer_nid_front"
                      className="col-md-2 col-form-label"
                    >
                      Referrer NID Front
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label
                      htmlFor="referer_nid_back"
                      className="col-md-2 col-form-label"
                    >
                      Referrer NID Back
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label
                      htmlFor="guardian_nid_front"
                      className="col-md-2 col-form-label"
                    >
                      Guardian NID Front
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label
                      htmlFor="guardian_nid_back"
                      className="col-md-2 col-form-label"
                    >
                      Guardian NID Back
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label
                      htmlFor="electricity_bill"
                      className="col-md-2 col-form-label"
                    >
                      Electricity Bill
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                    <label
                      htmlFor="house_nameplate"
                      className="col-md-2 col-form-label"
                    >
                      House Nameplate
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
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
                        disabled={submitDisabled}
                      >
                        {location.state ? "Edit Rider" : "Add Rider"}
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
  const { get_all_city_loading, get_all_city_data } = state.zoneCity

  const {
    get_all_zone_loading,
    get_all_zone_data,
    get_zone_by_city_id_data,
    get_zone_by_city_id_loading,
  } = state.Restaurant

  const { get_all_vehicle_type_loading, get_all_vehicle_type_data } =
    state.VehicleType
  const { add_rider_loading, rider_edit_loading } = state.Rider
  return {
    add_rider_loading,
    rider_edit_loading,
    get_all_city_loading,
    get_all_city_data,
    get_all_zone_loading,
    get_zone_by_city_id_data,
    get_zone_by_city_id_loading,
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
    getZoneByCityIdAction,
    getZoneByCityIdFresh,
  })(AddRider)
)
